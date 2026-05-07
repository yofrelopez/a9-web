# ADR 0001: Estrategia de Caché y Revalidación (Cero Costos Neon)

## Contexto
En la arquitectura de Antena 9 Web, estamos utilizando una base de datos Serverless (Neon Postgres) combinada con el CMS Payload y el App Router de Next.js.
Neon Serverless tiene la ventaja de apagarse (auto-suspend) tras 5 minutos de inactividad, lo que reduce drásticamente los costos operativos.

Durante un proceso de monitoreo, detectamos picos regulares y continuos de encendido de la base de datos de Neon a todas horas, especialmente en la madrugada.
Este comportamiento encarecía el servicio, ya que la base de datos no lograba suspenderse por mucho tiempo.

## Análisis del Problema
Se descubrió que la causa de estos despertares eran las directivas de revalidación basada en tiempo (Time-based ISR) definidas en las páginas:
- `src/app/(site)/noticias/page.tsx` (`export const revalidate = 60`)
- `src/app/(site)/noticias/[slug]/page.tsx` (`export const revalidate = 60`)

Con esta configuración, Next.js expira la caché interna cada 60 segundos. Si un bot de rastreo (como Googlebot, Bing, u otro *crawler* de SEO) o un usuario accede a cualquier ruta de noticias pasada esa ventana de tiempo, Next.js se ve obligado a renderizar la página en el servidor para refrescarla, lo que activa a Payload y consecuentemente despierta la base de datos de Neon. 

## Decisión Técnica
Para garantizar **cero costo inactivo en Neon**, se ha decidido **prohibir estrictamente el uso de Time-based ISR (`export const revalidate = X`)** en componentes de servidor y rutas de página a lo largo de este proyecto, y en su lugar, estandarizar el uso de **On-Demand Revalidation**.

### Cambios Aplicados:
1. Se eliminó `export const revalidate = 60` de todas las rutas de la plataforma.
2. La función de acceso a datos (`getNews` y `getNewsBySlug`) ya utiliza la API de Next.js `unstable_cache` con un tiempo de vida infinito (`revalidate: false`) y tags identificativas (`tags: ['news']`).
3. La invalidación del caché se delega al CMS: En las colecciones de Payload (`src/collections/News.ts`), al momento de publicar, editar o eliminar contenido, un webhook interno invoca `revalidateTag('news')`. 

## Consecuencias
- **Ahorro de Costos:** Al depender de On-Demand ISR, el rastreo pasivo de bots nunca tocará la base de datos. Servirán desde el CDN o el caché estático, garantizando un consumo mínimo en Neon.
- **Rendimiento Mejorado:** Se reducen los TTFB (Time to First Byte) en el 99% de los casos, dado que los accesos devolverán respuestas oxigenadas puramente desde memoria.
- **Inconsistencias temporales mitigadas:** Dado que la revalidación pasa a ser guiada por eventos, los cambios de contenido hechos en el Payload Admin serán reflejados globalmente de forma casi inmediata, no atados a las restricciones impuestas por un contador en segundos.
