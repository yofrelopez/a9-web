import { getPayload } from 'payload'
import config from '@payload-config'

async function seed() {
  const payload = await getPayload({ config })

  console.log('🌱 Iniciando seed de noticias...')

  // Usuario dummy para autor (si no existe, lo crea)
  const users = await payload.find({ collection: 'users', limit: 1 })
  let authorId = users.docs[0]?.id

  if (!authorId) {
    console.log('⚠️ No se encontró usuario. Creando usuario "Admin Seed"...')
    const user = await payload.create({
      collection: 'users',
      data: {
        email: 'admin@seed.com',
        password: 'admin',
        roles: ['admin'],
        firstName: 'Admin',
        lastName: 'Seed',
      },
    })
    authorId = user.id
  }

  // Datos de prueba (Noticias ficticias pero realistas para Perú)
  const dummyNews = [
    {
      title: "Moyobamba celebra su semana turística con récord de visitantes",
      excerpt: "La ciudad de las orquídeas recibió más de 10,000 turistas nacionales durante las festividades de junio, marcando un hito en la reactivación económica.",
      category: "Locales",
      slug: "moyobamba-semana-turistica-record",
    },
    {
      title: "Nuevo hospital de Soritor presenta avance del 80% en su construcción",
      excerpt: "Autoridades regionales inspeccionaron la obra que beneficiará a más de 25 mil habitantes del distrito y zonas aledañas.",
      category: "Regionales",
      slug: "avance-hospital-soritor-80-porciento",
    },
    {
      title: "Alto Mayo: Agricultores exportan primer lote de café orgánico a Europa",
      excerpt: "Cooperativa local logra acuerdo comercial con Alemania. Se espera que el volumen de exportación se duplique para el próximo año.",
      category: "Economía",
      slug: "exportacion-cafe-organico-alto-mayo",
    },
    {
      title: "Antena 9 renueva su programación matutina con nuevos talentos",
      excerpt: "La emisora líder del nororiente peruano anuncia cambios en su parrilla para ofrecer más información y entretenimiento desde este lunes.",
      category: "Espectáculos",
      slug: "antena-9-renueva-programacion-matutina",
    },
    {
      title: "Lluvias intensas afectan carretera Fernando Belaunde Terry",
      excerpt: "Transportistas reportan restricciones en el tramo norte. Provías Nacional ya desplazó maquinaria a la zona para liberar la vía.",
      category: "Nacionales",
      slug: "lluvias-afectan-carretera-belaunde-terry",
    },
    {
      title: "Feria Gastronómica 'Sabores del Mayo' será este fin de semana",
      excerpt: "Lo mejor de la cocina regional se dará cita en la plaza de armas. Se presentarán platos típicos como el juane, tacacho con cecina y más.",
      category: "Cultura",
      slug: "feria-gastronomica-sabores-del-mayo"
    },
    {
      title: "Escolares de Rioja ganan concurso nacional de robótica",
      excerpt: "Estudiantes de colegio secundario diseñaron un robot capaz de recolectar residuos plásticos de los ríos. Representarán a Perú en torneo internacional.",
      category: "Tecnología",
      slug: "escolares-rioja-ganan-concurso-robotica"
    },
    {
      title: "Campaña de vacunación antirrábica inicia este sábado",
      excerpt: "La Dirección Regional de Salud busca inmunizar a más de 5,000 mascotas en la provincia. Puntos de atención estarán en parques principales.",
      category: "Salud",
      slug: "campana-vacunacion-antirrabica-inicio"
    },
    {
      title: "Deportivo Soritor clasifica a la etapa departamental de la Copa Perú",
      excerpt: "Con un gol agónico en el último minuto, el equipo local aseguró su pase a la siguiente fase del fútbol macho.",
      category: "Deportes",
      slug: "deportivo-soritor-clasifica-copa-peru"
    },
    {
      title: "Inauguran moderno laboratorio de computación en colegio rural",
      excerpt: "Más de 200 alumnos tendrán acceso a internet de alta velocidad y equipos de última generación gracias a convenio con empresa privada.",
      category: "Educación",
      slug: "inauguran-laboratorio-computacion-colegio-rural"
    },
    {
      title: "Sismo de 4.5 grados se sintió en Tarapoto sin reportar daños",
      excerpt: "El Instituto Geofísico del Perú informó que el epicentro se ubicó a 20 km al este de la ciudad. Defensa Civil monitorea la situación.",
      category: "Nacionales",
      slug: "sismo-tarapoto-sin-danos"
    },
    {
      title: "Productores de arroz piden mejores precios ante alza de fertilizantes",
      excerpt: "Gremios agrarios advierten posible paro si no se llega a un acuerdo con el gobierno central sobre subsidios.",
      category: "Economía",
      slug: "productores-arroz-piden-mejores-precios"
    },
    {
      title: "Descubren nueva especie de orquídea en bosques de protección",
      excerpt: "Investigadores botánicos hallaron la flor en una zona inexplorada del Alto Mayo. Será bautizada con nombre alusivo a la región.",
      category: "Medio Ambiente",
      slug: "descubren-nueva-orquidea-alto-mayo"
    },
    {
      title: "Policía Nacional recupera motocicletas robadas en operativo",
      excerpt: "Efectivos de la comisaría sectorial desarticularon banda dedicada al hurto de vehículos menores. Se devolvieron 5 unidades a sus dueños.",
      category: "Policiales",
      slug: "policia-recupera-motos-robadas"
    },
    {
      title: "Municipio lanza programa de reciclaje 'Soritor Verde'",
      excerpt: "Iniciativa busca reducir la contaminación ambiental mediante la segregación de residuos sólidos desde los hogares.",
      category: "Medio Ambiente",
      slug: "municipio-lanza-programa-reciclaje"
    }
  ]

  // Contenido Rich Text Dummy (Simplificado para seeding)
  const dummyContent = {
    root: {
      children: [
        {
          children: [
            {
              detail: 0,
              format: 0,
              mode: 'normal',
              style: '',
              text: 'Esta es una noticia generada automáticamente para pruebas de desarrollo. El contenido completo de la noticia iría aquí, detallando los eventos mencionados en el título y el resumen. Se espera que los redactores completen esta información con datos reales, entrevistas y material multimedia.',
              type: 'text',
              version: 1,
            },
          ], // Children del párrafo
          direction: 'ltr',
          format: '',
          indent: 0,
          type: 'paragraph',
          version: 1,
        },
      ], // Children del root
      direction: 'ltr' as 'ltr' | 'rtl' | null,
      format: '' as '' | 'left' | 'start' | 'center' | 'right' | 'end' | 'justify',
      indent: 0,
      type: 'root',
      version: 1,
    },
  }

  for (const news of dummyNews) {
    // Verificar si ya existe para no duplicar (por slug)
    const existing = await payload.find({
      collection: 'news',
      where: {
        slug: { equals: news.slug },
      },
    })

    if (existing.totalDocs > 0) {
      console.log(`⏩ Saltando "${news.title}" (ya existe)`)
      continue
    }

    // Crear la noticia
    await payload.create({
      collection: 'news',
      data: {
        title: news.title,
        slug: news.slug,
        excerpt: news.excerpt,
        content: dummyContent,
        author: authorId,
        status: 'published',
        publishedAt: new Date().toISOString(),
        featured: Math.random() < 0.3, // 30% de probabilidad de ser destacado
        // NO enviamos featuredImage, usamos el fallback en frontend
      },
    })
    console.log(`✅ Creada: "${news.title}"`)
  }

  console.log('✨ Seed completado correctamente.')
  process.exit(0)
}

seed()
