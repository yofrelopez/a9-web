# Resumen Ejecutivo: Implementación Sistema de Noticias
## Radio Antena 9 - Payload CMS + Neon Postgres

---

## 📋 Vista Rápida de Fases

### **FASE 1: Base de Datos y Entorno** ⚙️
**Duración:** 30 minutos
**Responsable:** Usuario + Desarrollador

- [ ] Crear cuenta en Neon.tech (gratuita)
- [ ] Crear proyecto "antena9-web-production"
- [ ] Activar Connection Pooling
- [ ] Copiar connection string POOLED
- [ ] Crear `.env.local` con DATABASE_URI y PAYLOAD_SECRET
- [ ] Verificar `.gitignore` incluye `.env.local`

**Entregable:** Variables de entorno configuradas

---

### **FASE 2: Instalación de Paquetes** 📦
**Duración:** 15 minutos
**Acción:** Instalar dependencias

```bash
npm install payload@beta @payloadcms/db-postgres@beta @payloadcms/richtext-lexical@beta @payloadcms/next@beta
npm install @payloadcms/plugin-cloud-storage graphql postgres sharp
npm install -D @types/postgres cross-env
```

- [ ] Actualizar scripts en `package.json`
- [ ] Verificar instalación sin errores

**Entregable:** Dependencias instaladas

---

### **FASE 3: Configuración Payload CMS** 🔧
**Duración:** 2-3 horas
**Archivos a crear:** 6

**3.1 Configuración Principal**
- [ ] `src/payload.config.ts` - Config principal

**3.2 Collections (Esquemas)**
- [ ] `src/collections/Users.ts` - Autenticación y roles
- [ ] `src/collections/Media.ts` - Gestión de imágenes
- [ ] `src/collections/Categories.ts` - Categorías de noticias
- [ ] `src/collections/News.ts` - Noticias (principal)

**3.3 Utilidades**
- [ ] `src/lib/utils.ts` - Agregar: slugify, formatDate, truncate

**Entregable:** Payload CMS configurado con collections

---

### **FASE 4: Integración Next.js** 🔗
**Duración:** 1-2 horas
**Archivos a crear:** 6

**4.1 Rutas Admin Panel**
- [ ] `src/app/(payload)/admin/[[...segments]]/page.tsx`
- [ ] `src/app/(payload)/admin/[[...segments]]/not-found.tsx`
- [ ] `src/app/(payload)/admin/importMap.ts`
- [ ] `src/app/(payload)/layout.tsx`
- [ ] `src/app/(payload)/custom.scss`

**4.2 API Routes**
- [ ] `src/app/api/payload/[...slug]/route.ts`

**4.3 Configuración Next.js**
- [ ] Actualizar `next.config.ts` (withPayload wrapper)

**Prueba:** Acceder a `http://localhost:3000/admin`

**Entregable:** Admin panel funcionando localmente

---

### **FASE 5: Componentes Frontend** 🎨
**Duración:** 3-4 horas
**Archivos a crear:** 9

**5.1 Tipos y Cliente API**
- [ ] `src/types/news.ts` - Interfaces TypeScript
- [ ] `src/lib/payload-client.ts` - Funciones fetch (getNews, getNewsBySlug)

**5.2 Componentes UI**
- [ ] `src/components/news/NewsCard.tsx` - Tarjeta de noticia
- [ ] `src/components/news/NewsHero.tsx` - Header decorativo
- [ ] `src/components/news/RichTextRenderer.tsx` - Renderizar contenido

**5.3 Embeds Seguros**
- [ ] `src/components/news/embeds/YouTubeEmbed.tsx`
- [ ] `src/components/news/embeds/TwitterEmbed.tsx`
- [ ] `src/components/news/embeds/InstagramEmbed.tsx`
- [ ] `src/components/news/embeds/FacebookEmbed.tsx`

**Entregable:** Componentes de noticias reutilizables

---

### **FASE 6: Páginas de Noticias** 📄
**Duración:** 2-3 horas
**Archivos a crear:** 3

- [ ] `src/app/noticias/page.tsx` - Listado de noticias (grid)
- [ ] `src/app/noticias/[slug]/page.tsx` - Detalle de noticia
- [ ] `src/app/noticias/[slug]/not-found.tsx` - 404 personalizado

**Configuración en cada página:**
- Metadata para SEO
- ISR: `export const revalidate = 60`
- generateStaticParams (para detalle)

**Prueba:** Navegar a `/noticias` (vacío por ahora)

**Entregable:** Páginas de noticias con estructura completa

---

### **FASE 7: Integración Home** 🏠
**Duración:** 30 minutos
**Archivos:** 2

- [ ] `src/components/home/NewsSection.tsx` - Módulo "Últimas Noticias"
- [ ] `src/app/page.tsx` - Agregar NewsSection entre TV y Podcasts

**Diseño:** Grid 3 columnas, últimas 3 noticias

**Entregable:** Home page con sección de noticias

---

### **FASE 8: Seguridad** 🔐
**Duración:** 30 minutos
**Archivos:** 1

- [ ] `src/scripts/create-admin.ts` - Script para crear admin inicial

**Ejecución:**
```bash
npm run payload -- -c src/scripts/create-admin.ts
```

**Credenciales iniciales:**
- Email: admin@antena9.pe
- Password: (seguro, cambiar después)
- Role: admin

**Entregable:** Usuario administrador creado

---

### **FASE 9: Deploy Producción** 🚀
**Duración:** 1 hora
**Plataforma:** Vercel

**9.1 Configurar Variables en Vercel**
- DATABASE_URI (Neon pooled)
- PAYLOAD_SECRET (nuevo para producción)
- NEXT_PUBLIC_SERVER_URL=https://a9-web.vercel.app

**9.2 Deploy**
- [ ] Push código a repositorio
- [ ] Vercel ejecuta build automático
- [ ] Verificar build exitoso

**9.3 Post-Deploy**
- [ ] Acceder a `/admin` en producción
- [ ] Crear admin en producción
- [ ] Login y probar panel

**Entregable:** Sistema en producción funcionando

---

### **FASE 10: Testing y Contenido** ✅
**Duración:** 1-2 horas

**10.1 Testing Funcional**
- [ ] Crear categoría de prueba
- [ ] Subir imagen de prueba
- [ ] Crear noticia completa con:
  - Título, slug, excerpt
  - Imagen destacada
  - Contenido rico (bold, links, listas)
  - Embed de YouTube
  - Categoría y tags
  - Status: publicado
  - Featured: true

**10.2 Verificar Frontend**
- [ ] Noticia aparece en `/noticias`
- [ ] Noticia aparece en home (NewsSection)
- [ ] Detalle de noticia se ve correctamente
- [ ] Imagen se muestra en todos los tamaños
- [ ] Embed de YouTube funciona
- [ ] Dark mode funciona
- [ ] Responsive mobile

**10.3 SEO y Performance**
- [ ] Lighthouse score > 90
- [ ] OpenGraph metadata correcto
- [ ] Twitter cards funcionan
- [ ] ISR funciona (cambios en 60s)

**Entregable:** Sistema probado y con contenido demo

---

## 🎯 Checklist Final

### Antes de Empezar
- [ ] Proyecto en Neon creado
- [ ] Variables de entorno configuradas
- [ ] Git branch creado para desarrollo

### Durante Implementación
- [ ] 6 collections creadas (Users, Media, Categories, News, etc.)
- [ ] Admin panel accesible en `/admin`
- [ ] API routes en `/api/payload/*`
- [ ] 9 componentes de noticias creados
- [ ] 3 páginas de noticias creadas
- [ ] NewsSection integrado en home

### Deploy y Testing
- [ ] Variables en Vercel configuradas
- [ ] Deploy exitoso
- [ ] Admin creado en producción
- [ ] Contenido de prueba publicado
- [ ] Frontend funcional en producción
- [ ] SEO verificado
- [ ] Performance > 90

---

## 📊 Resumen por Números

| Métrica | Cantidad |
|---------|----------|
| **Fases totales** | 10 |
| **Archivos nuevos** | ~30 |
| **Archivos a modificar** | 5 |
| **Collections (esquemas)** | 4 |
| **Componentes React** | 9 |
| **Páginas Next.js** | 3 |
| **Duración estimada** | 3-5 días |
| **Líneas de código aprox.** | 2000-2500 |

---

## ⚠️ Puntos Críticos de Atención

1. **Neon Connection String**: Debe tener `-pooler` en hostname
2. **PAYLOAD_SECRET**: Mínimo 32 caracteres aleatorios
3. **Versiones**: Usar `@beta` para Payload CMS 3.0
4. **Admin Panel**: Route group con paréntesis `(payload)`
5. **ISR**: Solo funciona en production build
6. **Sharp**: Necesario para procesamiento de imágenes
7. **`.env.local`**: Nunca commitear al repositorio

---

## 🔄 Flujo de Trabajo Diario Recomendado

### Día 1 (Setup)
AM: Fases 1-2 (Base de datos + Paquetes)
PM: Fase 3 (Configuración Payload)

### Día 2 (Backend)
AM: Fase 4 (Integración Next.js)
PM: Fase 8 (Crear admin) + Testing local admin

### Día 3 (Frontend)
AM: Fase 5 (Componentes)
PM: Fase 6 (Páginas)

### Día 4 (Integración)
AM: Fase 7 (Home integration)
PM: Testing local completo

### Día 5 (Deploy)
AM: Fase 9 (Deploy producción)
PM: Fase 10 (Testing producción + contenido)

---

## 📞 Recursos de Ayuda

**Documentación:**
- Payload CMS: https://payloadcms.com/docs
- Neon Guide: https://neon.com/guides/payload
- Next.js 15: https://nextjs.org/docs

**Plan Completo:**
- `docs/plan-implementacion-noticias.md`

**Troubleshooting:**
- Ver sección "Troubleshooting Común" en plan completo
- Logs en Vercel Dashboard
- Neon Dashboard para conexión DB

---

## ✨ Resultado Final Esperado

**Para el Cliente:**
- Panel admin en `/admin` para publicar noticias
- Editor rico con formato y embeds de redes sociales
- Subida de imágenes con thumbnails automáticos
- Categorización y tags
- Borradores y publicación

**Para Visitantes:**
- Página `/noticias` con todas las noticias
- Noticias destacadas en home
- Detalle de noticia con contenido rico
- Diseño responsive y dark mode
- SEO optimizado
- Carga rápida (ISR)

---

**Último update:** Diciembre 2025
**Versión del plan:** 1.0
**Estado:** Listo para implementación