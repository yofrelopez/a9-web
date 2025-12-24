import type { CollectionConfig } from 'payload'
import {
  BlocksFeature,
  FixedToolbarFeature,
  HeadingFeature,
  BoldFeature,
  ItalicFeature,
  UnderlineFeature,
  StrikethroughFeature,
  LinkFeature,
  UnorderedListFeature,
  OrderedListFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

// Slugify function for URL-friendly strings
const slugify = (text: string): string => {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export const News: CollectionConfig = {
  slug: 'news',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'status', 'publishedAt', 'author'],
    preview: (doc) => {
      return `${process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'}/noticias/${doc.slug}`
    },
  },
  access: {
    read: ({ req: { user } }) => {
      // Public can only read published news
      if (!user) {
        return {
          status: {
            equals: 'published',
          },
        }
      }
      // Authenticated users can read all
      return true
    },
  },
  versions: {
    drafts: {
      autosave: {
        interval: 375, // Auto-save every 375ms
      },
    },
    maxPerDoc: 50,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      maxLength: 150,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        position: 'sidebar',
      },
      hooks: {
        beforeValidate: [
          ({ data, operation }) => {
            if (operation === 'create' && data?.title && !data?.slug) {
              return slugify(data.title)
            }
            return data?.slug
          },
        ],
      },
    },
    {
      name: 'excerpt',
      type: 'textarea',
      required: true,
      maxLength: 300,
      admin: {
        description: 'Resumen corto para tarjetas y SEO (max 300 caracteres)',
      },
    },
    {
      name: 'featuredImage',
      type: 'upload',
      relationTo: 'media',
      required: false,
      admin: {
        description: 'Imagen principal (recomendado: 1280x720px)',
      },
    },
    {
      name: 'content',
      type: 'richText',
      required: true,
      editor: lexicalEditor({
        features: ({ defaultFeatures }) => [
          ...defaultFeatures,
          FixedToolbarFeature(),
          HeadingFeature({ enabledHeadingSizes: ['h2', 'h3', 'h4'] }),
          BoldFeature(),
          ItalicFeature(),
          UnderlineFeature(),
          StrikethroughFeature(),
          LinkFeature({
            fields: [
              {
                name: 'rel',
                label: 'Rel Attribute',
                type: 'select',
                hasMany: true,
                options: ['noopener', 'noreferrer', 'nofollow'],
              },
            ],
          }),
          UnorderedListFeature(),
          OrderedListFeature(),
          // Social media embeds using BlocksFeature
          BlocksFeature({
            blocks: [
              {
                slug: 'youtube',
                fields: [
                  {
                    name: 'url',
                    type: 'text',
                    required: true,
                    admin: {
                      description: 'URL completa de YouTube (ej: https://www.youtube.com/watch?v=...)',
                    },
                  },
                ],
              },
              {
                slug: 'twitter',
                fields: [
                  {
                    name: 'url',
                    type: 'text',
                    required: true,
                    admin: {
                      description: 'URL del tweet (ej: https://twitter.com/user/status/...)',
                    },
                  },
                ],
              },
              {
                slug: 'instagram',
                fields: [
                  {
                    name: 'url',
                    type: 'text',
                    required: true,
                    admin: {
                      description: 'URL del post de Instagram (ej: https://www.instagram.com/p/...)',
                    },
                  },
                ],
              },
              {
                slug: 'facebook',
                fields: [
                  {
                    name: 'url',
                    type: 'text',
                    required: true,
                    admin: {
                      description: 'URL del post de Facebook',
                    },
                  },
                ],
              },
            ],
          }),
        ],
      }),
    },
    {
      name: 'author',
      type: 'relationship',
      relationTo: 'users',
      required: true,
      admin: {
        position: 'sidebar',
      },
      defaultValue: ({ user }) => user?.id,
    },
    {
      name: 'categories',
      type: 'relationship',
      relationTo: 'categories',
      hasMany: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'tags',
      type: 'array',
      admin: {
        position: 'sidebar',
      },
      fields: [
        {
          name: 'tag',
          type: 'text',
        },
      ],
    },
    {
      name: 'status',
      type: 'select',
      options: [
        {
          label: 'Borrador',
          value: 'draft',
        },
        {
          label: 'Publicado',
          value: 'published',
        },
      ],
      defaultValue: 'draft',
      required: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'publishedAt',
      type: 'date',
      admin: {
        position: 'sidebar',
        date: {
          pickerAppearance: 'dayAndTime',
        },
      },
      hooks: {
        beforeChange: [
          ({ data, operation }) => {
            if (operation === 'create' && data?.status === 'published' && !data?.publishedAt) {
              return new Date()
            }
            return data?.publishedAt
          },
        ],
      },
    },
    {
      name: 'featured',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        position: 'sidebar',
        description: 'Mostrar en destacados de la página principal',
      },
    },
  ],
  hooks: {
    beforeChange: [
      ({ data }) => {
        // Auto-set publishedAt when status changes to published
        if (data?.status === 'published' && !data?.publishedAt) {
          data.publishedAt = new Date()
        }
        return data
      },
    ],
  },
}
