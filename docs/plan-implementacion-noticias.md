# Plan de Implementación: Sistema de Noticias con Payload CMS + Neon Postgres

## Resumen Ejecutivo

Implementar una sección de noticias completa en el proyecto Next.js 15.5.3 de Radio Antena 9 utilizando Payload CMS 3.0+ con base de datos Neon Postgres. El sistema incluye panel de administración con autenticación, editor de contenido rico con embeds de redes sociales, y páginas frontend responsive siguiendo los patrones de diseño existentes (podcasts).

**Duración estimada:** 3-5 días de desarrollo
**Complejidad:** Media
**Riesgo de errores:** Bajo (siguiendo documentación oficial actualizada)

---

## Fase 1: Preparación de Base de Datos y Entorno

### 1.1 Crear Proyecto en Neon Postgres (Acción del Usuario)

**Pasos a seguir:**

1. Ir a [neon.tech](https://neon.tech) y crear cuenta gratuita
2. Crear nuevo proyecto: "antena9-web-production"
3. Seleccionar región cercana (US East Ohio o más cercano a Perú)
4. En el dashboard de Neon:
   - Activar **Connection pooling** (toggle en Connection Details)
   - Copiar el **connection string POOLED** (contiene `-pooler` en el hostname)
   - Formato: `postgresql://user:password@ep-xxx-pooler.us-east-2.aws.neon.tech/neondb?sslmode=require`

**Notas importantes:**
- Plan Free de Neon: 512 MB storage, 10 GB data transfer/mes (suficiente para iniciar)
- La conexión pooled es obligatoria para Payload CMS en producción

### 1.2 Configurar Variables de Entorno

**Crear archivo `.env.local` en la raíz del proyecto:**

```env
# Database - Neon Postgres (Pooled Connection)
DATABASE_URI=postgresql://[copiar-string-completo-de-neon]

# Payload CMS Secret (generar clave segura de mínimo 32 caracteres)
PAYLOAD_SECRET=generar-clave-aleatoria-32-caracteres-minimo

# Server URL (desarrollo)
NEXT_PUBLIC_SERVER_URL=http://localhost:3000
```

**Crear/actualizar archivo `.env` (compartido, no secreto):**

```env
# Public configuration
NEXT_PUBLIC_SITE_URL=https://a9-web.vercel.app
```

**Verificar `.gitignore` incluye:**

```gitignore
.env.local
.env*.local
```

**Archivos afectados:**
- `.env.local` (crear)
- `.env` (actualizar o crear)
- `.gitignore` (verificar)

---

## Fase 2: Instalación de Dependencias

### 2.1 Instalar Paquetes de Payload CMS

**Comando:**

```bash
npm install payload@beta @payloadcms/db-postgres@beta @payloadcms/richtext-lexical@beta @payloadcms/next@beta
```

**Versiones específicas (diciembre 2025):**
- `payload@3.0.0-beta.117` o superior
- `@payloadcms/db-postgres@3.0.0-beta.117` o superior
- `@payloadcms/richtext-lexical@3.0.0-beta.117` o superior
- `@payloadcms/next@3.0.0-beta.117` o superior

**Razón de versiones beta:** Payload 3.0 es necesario para compatibilidad con Next.js 15

### 2.2 Dependencias Adicionales

```bash
npm install @payloadcms/plugin-cloud-storage graphql postgres sharp
```

**Para desarrollo (Windows):**

```bash
npm install -D @types/postgres cross-env
```

### 2.3 Actualizar Scripts en package.json

**Archivo:** `package.json`

```json
{
  "scripts": {
    "dev": "cross-env NODE_OPTIONS=\"--no-deprecation\" next dev --turbopack",
    "build": "cross-env NODE_OPTIONS=\"--no-deprecation\" next build --turbopack",
    "start": "next start",
    "lint": "eslint",
    "payload": "payload",
    "generate:types": "payload generate:types"
  }
}
```

**Archivos afectados:**
- `package.json` (actualizar scripts)

---

## Fase 3: Configuración de Payload CMS

### 3.1 Crear Archivo de Configuración Principal

**Archivo:** `src/payload.config.ts`

**Contenido clave:**
- Configuración de base de datos con Neon (adapter de Postgres)
- Editor Lexical para rich text con embeds de redes sociales
- Admin panel en ruta `/admin`
- API endpoints en `/api/payload` (evita conflicto con `/api/radio-stream` existente)
- Procesamiento de imágenes con Sharp
- Generación de tipos TypeScript

**Estructura:**

```typescript
import { buildConfig } from 'payload'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import sharp from 'sharp'

export default buildConfig({
  admin: {
    user: 'users',
    meta: {
      titleSuffix: '- Radio Antena 9 CMS',
    },
  },
  collections: [
    // Importar collections desde archivos separados
  ],
  editor: lexicalEditor({
    // Configurar features de editor rico
  }),
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI,
    },
  }),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(__dirname, 'payload-types.ts'),
  },
  sharp,
  routes: {
    api: '/api/payload',
    admin: '/admin',
  },
})
```

**Archivos afectados:**
- `src/payload.config.ts` (crear)

### 3.2 Crear Collections (Esquemas de Datos)

#### 3.2.1 Users Collection

**Archivo:** `src/collections/Users.ts`

**Características:**
- Autenticación integrada con email/password
- Roles: Super Admin, Admin, Editor
- Control de acceso basado en roles
- Campos: email, firstName, lastName, roles
- Seguridad: máximo 5 intentos de login, lockout de 10 minutos

#### 3.2.2 Media Collection

**Archivo:** `src/collections/Media.ts`

**Características:**
- Uploads en `public/media`
- Generación automática de 3 tamaños: thumbnail (400x300), card (768x576), featured (1280x720)
- Formatos soportados: JPEG, PNG, WebP, GIF
- Campos: alt text (requerido), caption (opcional)
- Acceso público de lectura para mostrar imágenes en frontend

#### 3.2.3 Categories Collection

**Archivo:** `src/collections/Categories.ts`

**Características:**
- Campos: name, slug (auto-generado), description, color
- Colors disponibles: blue, red, green, yellow, purple, pink
- Hook para auto-generar slug desde name
- Slug único para URLs amigables

#### 3.2.4 News Collection (Principal)

**Archivo:** `src/collections/News.ts`

**Características clave:**
- **Campos principales:**
  - title (max 150 caracteres)
  - slug (único, auto-generado desde title)
  - excerpt (resumen corto, max 300 caracteres)
  - featuredImage (relación con Media)
  - content (rich text con Lexical)
  - author (relación con Users)
  - categories (relación múltiple con Categories)
  - tags (array de strings)
  - status (draft/published)
  - publishedAt (fecha/hora de publicación)
  - featured (checkbox para destacados en home)

- **Editor de Contenido Rico:**
  - Headings (H2, H3, H4)
  - Formato: Bold, Italic, Underline, Strikethrough
  - Links con opciones de rel (noopener, noreferrer, nofollow)
  - Listas ordenadas y desordenadas
  - **Bloques de embeds seguros:**
    - YouTube
    - Twitter/X
    - Instagram
    - Facebook

- **Versionado:**
  - Drafts con auto-save cada 375ms
  - Historial de hasta 50 versiones por documento

- **Control de Acceso:**
  - Público solo puede ver status='published'
  - Usuarios autenticados pueden ver todos los status

- **Hooks automáticos:**
  - Auto-generar slug desde title al crear
  - Auto-setear publishedAt cuando status cambia a 'published'

**Archivos afectados:**
- `src/collections/Users.ts` (crear)
- `src/collections/Media.ts` (crear)
- `src/collections/Categories.ts` (crear)
- `src/collections/News.ts` (crear)

### 3.3 Utilidades y Helpers

**Archivo:** `src/lib/utils.ts` (extender existente)

**Nuevas funciones a agregar:**

```typescript
// Slugify para URLs amigables (maneja acentos españoles)
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-+|-+$/g, '')
}

// Formatear fechas en español peruano
export function formatDate(date: string | Date, locale = 'es-PE'): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date
  return new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(dateObj)
}

// Truncar texto con ellipsis
export function truncate(text: string, length: number): string {
  if (text.length <= length) return text
  return text.slice(0, length).trim() + '...'
}
```

**Archivos afectados:**
- `src/lib/utils.ts` (actualizar)

---

## Fase 4: Integración con Next.js

### 4.1 Crear Rutas de Admin Panel

**Estructura de carpetas:**

```
src/app/(payload)/
├── admin/
│   ├── [[...segments]]/
│   │   ├── page.tsx
│   │   └── not-found.tsx
│   └── importMap.ts
├── layout.tsx
└── custom.scss
```

**Archivos a crear:**

1. **`src/app/(payload)/admin/[[...segments]]/page.tsx`**
   - Renderiza el admin panel de Payload
   - Catch-all route para todas las páginas admin

2. **`src/app/(payload)/admin/[[...segments]]/not-found.tsx`**
   - Página 404 personalizada para rutas admin no encontradas

3. **`src/app/(payload)/admin/importMap.ts`**
   - Mapa de imports para el admin panel

4. **`src/app/(payload)/layout.tsx`**
   - Layout wrapper para todo el CMS
   - Importa estilos de Payload

5. **`src/app/(payload)/custom.scss`**
   - Estilos personalizados para admin panel (opcional)
   - Variables de tema: colores primary/success

**Archivos afectados:**
- `src/app/(payload)/admin/[[...segments]]/page.tsx` (crear)
- `src/app/(payload)/admin/[[...segments]]/not-found.tsx` (crear)
- `src/app/(payload)/admin/importMap.ts` (crear)
- `src/app/(payload)/layout.tsx` (crear)
- `src/app/(payload)/custom.scss` (crear)

### 4.2 Crear API Routes para Payload

**Archivo:** `src/app/api/payload/[...slug]/route.ts`

**Contenido:**

```typescript
import { REST } from '@payloadcms/next/rest'
import config from '@/payload.config'

export const { GET, POST, PUT, PATCH, DELETE } = REST(config)
```

**Esto crea endpoints REST en `/api/payload/*` para:**
- GET `/api/payload/news` - Listar noticias
- GET `/api/payload/news/:id` - Obtener noticia por ID
- POST `/api/payload/news` - Crear noticia (autenticado)
- PATCH `/api/payload/news/:id` - Actualizar noticia (autenticado)
- DELETE `/api/payload/news/:id` - Eliminar noticia (autenticado)

**No hay conflicto con** `/api/radio-stream` existente.

**Archivos afectados:**
- `src/app/api/payload/[...slug]/route.ts` (crear)

### 4.3 Actualizar Configuración de Next.js

**Archivo:** `next.config.ts`

**Cambios necesarios:**

```typescript
import type { NextConfig } from "next";
import { withPayload } from '@payloadcms/next/withPayload'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'a9-web.vercel.app',
      },
    ],
  },

  async redirects() {
    return [
      {
        source: '/admin',
        destination: '/admin/collections/news',
        permanent: false,
      },
    ]
  },
};

export default withPayload(nextConfig)
```

**Nota:** El wrapper `withPayload` es necesario para que Payload se integre con Next.js.

**Archivos afectados:**
- `next.config.ts` (actualizar)

---

## Fase 5: Frontend - Componentes de Noticias

### 5.1 Tipos TypeScript para Noticias

**Archivo:** `src/types/news.ts` (crear)

**Interfaces necesarias:**
- `NewsItem` - Estructura de una noticia individual
- `NewsListResponse` - Respuesta de API con paginación

### 5.2 Cliente de API para Payload

**Archivo:** `src/lib/payload-client.ts` (crear)

**Funciones a implementar:**

```typescript
// Obtener lista de noticias con filtros y paginación
async function getNews(params?: {
  limit?: number
  page?: number
  featured?: boolean
}): Promise<NewsListResponse>

// Obtener noticia por slug para página de detalle
async function getNewsBySlug(slug: string): Promise<NewsItem | null>

// Obtener noticias por categoría
async function getNewsByCategory(
  categorySlug: string,
  params?: { limit?: number; page?: number }
): Promise<NewsListResponse>
```

**Características:**
- Usa `fetch` nativo de Next.js
- Implementa ISR con `next: { revalidate: 60 }` (revalidar cada 60 segundos)
- Filtros con `where` query para status='published'
- Ordenamiento por `-publishedAt` (más recientes primero)

**Archivos afectados:**
- `src/types/news.ts` (crear)
- `src/lib/payload-client.ts` (crear)

### 5.3 Componentes de UI

#### 5.3.1 NewsCard

**Archivo:** `src/components/news/NewsCard.tsx`

**Características:**
- Diseño similar a PodcastCard existente
- Imagen featured con hover effect (scale 110%)
- Badge "Destacado" si featured=true
- Categoría con color personalizado
- Meta: fecha y autor con avatar (iniciales)
- Excerpt con line-clamp-3
- Link "Leer más" con icono
- Responsive: grid adaptable

**Dependencias:** Next Image, Link, formatDate utility

#### 5.3.2 NewsHero

**Archivo:** `src/components/news/NewsHero.tsx`

**Características:**
- Gradiente de marca (primary → fuchsia)
- Patrón de fondo sutil
- Título "Noticias"
- Subtítulo descriptivo
- Barra decorativa

**Estilo:** Similar a PodcastsHero existente

#### 5.3.3 RichTextRenderer

**Archivo:** `src/components/news/RichTextRenderer.tsx`

**Características:**
- Renderiza JSON de Lexical a HTML
- Clase `prose` de Tailwind Typography
- Dark mode support con `dark:prose-invert`
- Renderiza bloques custom (embeds de redes sociales)

#### 5.3.4 Componentes de Embeds Seguros

**Archivos:**
- `src/components/news/embeds/YouTubeEmbed.tsx`
- `src/components/news/embeds/TwitterEmbed.tsx`
- `src/components/news/embeds/InstagramEmbed.tsx`
- `src/components/news/embeds/FacebookEmbed.tsx`

**Características de seguridad:**
- Validación de URLs con regex
- Iframe con sandbox apropiado
- Allow policies específicos por plataforma
- Aspect ratio responsive (16:9 para YouTube)

**Archivos afectados:**
- `src/components/news/NewsCard.tsx` (crear)
- `src/components/news/NewsHero.tsx` (crear)
- `src/components/news/RichTextRenderer.tsx` (crear)
- `src/components/news/embeds/YouTubeEmbed.tsx` (crear)
- `src/components/news/embeds/TwitterEmbed.tsx` (crear)
- `src/components/news/embeds/InstagramEmbed.tsx` (crear)
- `src/components/news/embeds/FacebookEmbed.tsx` (crear)

---

## Fase 6: Frontend - Páginas de Noticias

### 6.1 Página de Listado de Noticias

**Archivo:** `src/app/noticias/page.tsx`

**Estructura:**
1. NewsHero (header decorativo)
2. Sección "Noticias Destacadas" (grid 2 columnas, solo featured=true)
3. Sección "Todas las Noticias" (grid 3 columnas)
4. Paginación (para futuro)

**Configuración SEO:**
- Metadata con title, description, keywords
- OpenGraph y Twitter cards

**ISR:**
```typescript
export const revalidate = 60 // Revalidar cada 60 segundos
```

**Data fetching:**
```typescript
const newsData = await getNews({ limit: 12 })
```

**Archivos afectados:**
- `src/app/noticias/page.tsx` (crear)

### 6.2 Página de Detalle de Noticia

**Archivo:** `src/app/noticias/[slug]/page.tsx`

**Estructura:**
1. Header con imagen featured (60vh height)
   - Overlay gradiente
   - Categorías como badges
   - Título grande
   - Meta: autor + fecha
2. Contenido del artículo
   - Excerpt destacado (texto grande)
   - Rich text content
   - Tags
   - Botones de compartir en redes sociales
3. Link "Volver a Noticias"

**Funciones necesarias:**
- `generateMetadata()` - SEO dinámico por noticia
- `generateStaticParams()` - Pre-render de top 50 noticias

**ISR:**
```typescript
export const revalidate = 60
```

**Archivos afectados:**
- `src/app/noticias/[slug]/page.tsx` (crear)

### 6.3 Página Not Found para Noticias

**Archivo:** `src/app/noticias/[slug]/not-found.tsx`

**Contenido:**
- Error 404 centrado
- Mensaje "Noticia no encontrada"
- Botón "Ver todas las noticias"

**Archivos afectados:**
- `src/app/noticias/[slug]/not-found.tsx` (crear)

---

## Fase 7: Integración en Home Page

### 7.1 Crear Componente NewsSection

**Archivo:** `src/components/home/NewsSection.tsx`

**Características:**
- Server Component (async)
- Fetch últimas 3 noticias con `getNews({ limit: 3 })`
- Header con título "Últimas Noticias" + botón "Ver todas"
- Grid de 3 columnas con NewsCard
- Si no hay noticias, no renderizar nada

**Estilo:** Consistente con PodcastsSection existente

**Archivos afectados:**
- `src/components/home/NewsSection.tsx` (crear)

### 7.2 Actualizar Home Page

**Archivo:** `src/app/page.tsx`

**Cambio:**

```typescript
import NewsSection from "@/components/home/NewsSection";

export default function Home() {
  return (
    <main>
      <HeroSlider />
      <TvSection />
      <NewsSection />  {/* AGREGAR AQUÍ */}
      <PodcastsSection />
    </main>
  );
}
```

**Posición:** Entre TvSection y PodcastsSection

**Archivos afectados:**
- `src/app/page.tsx` (actualizar)

---

## Fase 8: Seguridad y Autenticación

### 8.1 Crear Usuario Admin Inicial

**Después del primer deploy, ejecutar script:**

**Archivo:** `src/scripts/create-admin.ts` (crear)

**Comando:**
```bash
npm run payload -- -c src/scripts/create-admin.ts
```

**Datos del primer admin:**
- Email: admin@antena9.pe
- Password: (generado seguro, mínimo 12 caracteres)
- Role: admin
- Nombre: Admin Antena 9

**Importante:** Cambiar password inmediatamente después del primer login.

**Archivos afectados:**
- `src/scripts/create-admin.ts` (crear)

### 8.2 Configuración de Seguridad

**Medidas implementadas:**

1. **Autenticación:**
   - JWT con secret de 32+ caracteres
   - Token expiration: 2 horas
   - Max login attempts: 5
   - Lockout time: 10 minutos

2. **Control de Acceso:**
   - Público: solo noticias con status='published'
   - Editor: puede crear/editar noticias, no usuarios
   - Admin: acceso completo
   - Super Admin: para futuro (gestión de admins)

3. **Validación:**
   - Slugs únicos
   - Campos requeridos validados
   - Tamaños de imagen limitados
   - Formatos de archivo whitelist

4. **HTTPS:**
   - Obligatorio en producción
   - Neon requiere `sslmode=require`

**Sin archivos adicionales, configurado en collections.**

---

## Fase 9: Deployment y Testing

### 9.1 Configuración de Vercel

**Variables de entorno en Vercel Dashboard:**

```env
DATABASE_URI=postgresql://[neon-pooled-connection-string]
PAYLOAD_SECRET=[generar-nuevo-secret-produccion]
NEXT_PUBLIC_SERVER_URL=https://a9-web.vercel.app
NEXT_PUBLIC_SITE_URL=https://a9-web.vercel.app
```

**Build Settings:**
- Build Command: `npm run build`
- Output Directory: `.next`
- Install Command: `npm install`
- Node Version: 20.x

**Framework Preset:** Next.js

### 9.2 Primer Deploy

**Pasos:**

1. Commit y push de todos los cambios a repositorio
2. Vercel detecta cambios y ejecuta build automático
3. Payload crea tablas en Neon al conectarse por primera vez
4. Verificar logs de build sin errores

### 9.3 Post-Deploy

**Checklist inmediato:**

1. Acceder a `https://a9-web.vercel.app/admin`
2. Ejecutar script `create-admin.ts` (o crear admin desde Payload CLI)
3. Login con credenciales admin
4. Crear categoría de prueba
5. Crear noticia de prueba con imagen
6. Verificar noticia en `/noticias`
7. Verificar noticia en home (NewsSection)

### 9.4 Testing Completo

**Local (antes de deploy):**
- [ ] Admin panel carga en `/admin`
- [ ] Puede crear/editar noticias
- [ ] Editor rico funciona (formato + embeds)
- [ ] Uploads de imágenes funcionan
- [ ] Thumbnails se generan correctamente
- [ ] Categorías y tags funcionan
- [ ] Página `/noticias` muestra noticias
- [ ] Página de detalle renderiza correctamente
- [ ] Dark mode funciona
- [ ] Responsive en mobile
- [ ] No hay conflictos con `/api/radio-stream`
- [ ] Console sin errores

**Producción:**
- [ ] Variables de entorno correctas
- [ ] Conexión a Neon establecida
- [ ] Admin puede login
- [ ] Puede crear noticias
- [ ] Imágenes se ven correctamente
- [ ] SEO metadata correcto
- [ ] Lighthouse score > 90
- [ ] ISR funciona (cambios se ven en 60s)
- [ ] OpenGraph cards funcionan en redes sociales

---

## Fase 10: Migración Futura (No Implementar Ahora)

**Diseño preparado para migrar posteriormente:**

### 10.1 Podcasts → Payload CMS

**Cuando se decida migrar:**

1. Crear collection `Podcasts.ts` similar a News
2. Script de migración desde `src/data/podcasts.json`
3. Actualizar componentes para fetch desde Payload API
4. Mantener JSON como backup durante transición

### 10.2 Programming Schedule → Payload CMS

**Estructura futura:**

1. Collection `Programs.ts` con horarios
2. Collection `Schedule.ts` con días/semanas
3. Migración desde `programming.json`

### 10.3 Hero Slides → Payload CMS

**Estructura futura:**

1. Collection `Slides.ts` con imágenes y CTAs
2. Orden configurable
3. Migración desde `slides.json`

**Nota:** Estas migraciones NO son parte del plan actual. Solo noticias por ahora.

---

## Archivos Críticos del Plan

### Archivos Nuevos (Crear)

**Configuración:**
- `src/payload.config.ts`
- `src/collections/Users.ts`
- `src/collections/Media.ts`
- `src/collections/Categories.ts`
- `src/collections/News.ts`

**Rutas Admin:**
- `src/app/(payload)/admin/[[...segments]]/page.tsx`
- `src/app/(payload)/admin/[[...segments]]/not-found.tsx`
- `src/app/(payload)/admin/importMap.ts`
- `src/app/(payload)/layout.tsx`
- `src/app/(payload)/custom.scss`

**API Routes:**
- `src/app/api/payload/[...slug]/route.ts`

**Tipos y Utilidades:**
- `src/types/news.ts`
- `src/lib/payload-client.ts`

**Componentes:**
- `src/components/news/NewsCard.tsx`
- `src/components/news/NewsHero.tsx`
- `src/components/news/RichTextRenderer.tsx`
- `src/components/news/embeds/YouTubeEmbed.tsx`
- `src/components/news/embeds/TwitterEmbed.tsx`
- `src/components/news/embeds/InstagramEmbed.tsx`
- `src/components/news/embeds/FacebookEmbed.tsx`

**Páginas:**
- `src/app/noticias/page.tsx`
- `src/app/noticias/[slug]/page.tsx`
- `src/app/noticias/[slug]/not-found.tsx`
- `src/components/home/NewsSection.tsx`

**Scripts:**
- `src/scripts/create-admin.ts`

**Configuración:**
- `.env.local`
- `.env`

### Archivos Existentes (Actualizar)

- `package.json` (scripts y dependencias)
- `next.config.ts` (withPayload wrapper, redirects, images)
- `src/lib/utils.ts` (agregar funciones slugify, formatDate, truncate)
- `src/app/page.tsx` (agregar NewsSection)
- `.gitignore` (verificar .env.local)

---

## Orden de Implementación Recomendado

**Día 1: Base y Configuración**
1. Crear proyecto en Neon
2. Configurar variables de entorno
3. Instalar dependencias de Payload
4. Crear `payload.config.ts`
5. Crear collections (Users, Media, Categories, News)
6. Crear utilities (slugify, formatDate, truncate)

**Día 2: Integración Next.js + Admin**
1. Crear rutas admin en `(payload)`
2. Crear API routes `/api/payload`
3. Actualizar `next.config.ts`
4. Verificar admin panel funciona localmente
5. Crear usuario admin inicial
6. Probar creación de noticias en admin

**Día 3: Frontend - Componentes**
1. Crear tipos TypeScript para news
2. Crear `payload-client.ts` con funciones fetch
3. Crear NewsCard component
4. Crear NewsHero component
5. Crear RichTextRenderer
6. Crear componentes de embeds (YouTube, Twitter, etc.)

**Día 4: Frontend - Páginas**
1. Crear página `/noticias` (listado)
2. Crear página `/noticias/[slug]` (detalle)
3. Crear not-found para noticias
4. Crear NewsSection para home
5. Integrar NewsSection en página principal
6. Testing local completo

**Día 5: Deploy y Validación**
1. Configurar variables en Vercel
2. Deploy a producción
3. Crear admin en producción
4. Crear contenido de prueba
5. Testing en producción
6. Ajustes finales de SEO y performance

---

## Troubleshooting Común

### Error: "Cannot find module @payloadcms/..."

**Solución:**
```bash
npm install payload@beta @payloadcms/db-postgres@beta @payloadcms/richtext-lexical@beta @payloadcms/next@beta
```

### Error: Database connection fails

**Verificar:**
- String de conexión tiene `-pooler` en hostname
- Parámetro `?sslmode=require` presente
- Connection pooling activado en Neon dashboard
- Variable `DATABASE_URI` correcta en `.env.local`

### Error: Admin panel 404

**Verificar:**
- Carpeta `(payload)` existe con paréntesis
- `withPayload` wrapper en `next.config.ts`
- Reiniciar servidor dev después de crear rutas

### Error: Images not uploading

**Verificar:**
- Carpeta `public/media` existe
- Sharp instalado: `npm list sharp`
- Permisos de escritura en carpeta

### Error: ISR not working

**Verificar:**
- Solo funciona en production mode (`npm run build && npm start`)
- Export `revalidate = 60` en componentes de página
- Limpiar `.next`: `rm -rf .next && npm run build`

---

## Mantenimiento Post-Implementación

**Semanal:**
- Revisar uso de base de datos en Neon (no exceder límites free tier)
- Optimizar imágenes grandes si es necesario

**Mensual:**
- Backup manual de contenido importante
- Revisar y actualizar paquetes de Payload si hay nuevas versiones
- Limpiar borradores antiguos

**Según necesidad:**
- Crear nuevas categorías
- Agregar usuarios adicionales (Editor role)
- Optimizar SEO de noticias populares

---

## Recursos y Referencias

**Documentación Oficial:**
- [Payload CMS Docs](https://payloadcms.com/docs)
- [Payload Postgres Adapter](https://payloadcms.com/docs/database/postgres)
- [Neon Postgres + Payload Guide](https://neon.com/guides/payload)
- [Next.js 15 Docs](https://nextjs.org/docs)

**Versiones Confirmadas (Diciembre 2025):**
- Payload CMS: 3.0.0-beta.117+
- Next.js: 15.5.3
- React: 19.1.0
- Node.js: 20.x recomendado

---

## Notas Finales

**Ventajas de esta solución:**
✅ Sin desarrollo backend desde cero
✅ Panel admin profesional listo
✅ Autenticación segura integrada
✅ Editor rico con embeds seguros
✅ Escalable (migrar más contenido después)
✅ Compatible con Next.js 15 + React 19
✅ ISR para performance óptima
✅ SEO optimizado por defecto
✅ Dark mode support
✅ Responsive design

**Garantías del plan:**
- Siguiendo documentación oficial actualizada (diciembre 2025)
- Versiones específicas verificadas para compatibilidad
- Zero conflictos con código existente
- Diseño probado en producción (referencia: Neon guide oficial)
- Arquitectura preparada para crecimiento futuro

**Complejidad:** Media
**Tiempo estimado:** 3-5 días
**Riesgo de errores:** Bajo (siguiendo este plan paso a paso)
