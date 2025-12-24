import { buildConfig } from 'payload'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { cloudStoragePlugin } from '@payloadcms/plugin-cloud-storage'
import path from 'path'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

// Import custom components
// Import custom components
// Import custom components
// Custom components referenced by string path in config

// Import collections
import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Categories } from './collections/Categories'
import { News } from './collections/News'

// Import Cloudinary adapter
import { cloudinaryAdapter } from './lib/cloudinary-adapter'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  // Admin panel configuration
  admin: {
    user: 'users',
    meta: {
      titleSuffix: '- Radio Antena 9 CMS',
      icons: [
        {
          rel: 'icon',
          type: 'image/png',
          url: '/logos/favico.png',
        },
        {
          rel: 'apple-touch-icon',
          type: 'image/png',
          url: '/logos/favico.png',
        },
      ],
    },
    components: {
      graphics: {
        Logo: {
          path: 'src/components/payload/CustomLogo.tsx#CustomLogo',
          exportName: 'CustomLogo',
        },
        Icon: {
          path: 'src/components/payload/CustomIcon.tsx#CustomIcon',
          exportName: 'CustomIcon',
        },
      },
    },
  },

  // Collections
  collections: [
    Users,
    Media,
    Categories,
    News,
  ],

  // Plugins
  plugins: [
    cloudStoragePlugin({
      collections: {
        media: {
          adapter: cloudinaryAdapter({ folder: 'antena9-media' }),
          disableLocalStorage: true,
          generateFileURL: ({ filename }) => {
            return `https://res.cloudinary.com/${process.env.CLOUDINARY_NAME}/image/upload/f_auto,q_auto/antena9-media/${filename}`
          },
        },
      },
    }),
  ],

  // Editor configuration - Lexical with features
  editor: lexicalEditor({}),

  // Database - Postgres adapter with Neon
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL,
    },
  }),

  // Secret for JWT
  secret: process.env.PAYLOAD_SECRET || '',

  // TypeScript generation
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },

  // Sharp for image processing
  sharp,

  // Custom routes to avoid conflicts with existing API
  routes: {
    api: '/api',
    admin: '/admin',
  },
})
