import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    // URL del stream de radio original
    const radioStreamUrl = 'https://panel.foxradios.com:8100/radioantena9';


    console.log('🎵 Proxy: Solicitando stream desde servidor...');

    // Hacer la petición al servidor de radio desde el backend (sin CORS)
    const response = await fetch(radioStreamUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        'Accept': '*/*',
      },
    });

    if (!response.ok) {
      console.error('🎵 Proxy: Error del servidor de radio:', response.status);
      return NextResponse.json(
        { error: 'Radio server error' },
        { status: response.status }
      );
    }

    console.log('🎵 Proxy: Stream obtenido exitosamente');

    // Obtener el stream como ReadableStream
    const stream = response.body;

    if (!stream) {
      return NextResponse.json(
        { error: 'No stream available' },
        { status: 500 }
      );
    }

    // Crear respuesta con headers CORS apropiados
    const proxyResponse = new NextResponse(stream, {
      status: 200,
      headers: {
        // Headers CORS permisivos
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Range',

        // Headers de audio streaming
        'Content-Type': response.headers.get('Content-Type') || 'audio/mpeg',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',

        // Permitir ranges para streaming
        'Accept-Ranges': 'bytes',
      },
    });

    console.log('🎵 Proxy: Enviando stream al cliente');
    return proxyResponse;

  } catch (error) {
    console.error('🎵 Proxy: Error interno:', error);
    return NextResponse.json(
      { error: 'Internal proxy error', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

// Manejar preflight CORS
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Range',
    },
  });
}