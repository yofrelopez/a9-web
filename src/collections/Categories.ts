import type { CollectionConfig } from 'payload'

// Slugify function for URL-friendly strings
const slugify = (text: string): string => {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .normalize('NFD') // Normalize accented characters
    .replace(/[\u0300-\u036f]/g, '') // Remove accents
    .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with -
    .replace(/-+/g, '-') // Replace multiple - with single -
    .replace(/^-+|-+$/g, '') // Remove leading/trailing -
}

export const Categories: CollectionConfig = {
  slug: 'categories',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'slug', 'updatedAt'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      unique: true,
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
            if (operation === 'create' || operation === 'update') {
              if (data?.name && !data?.slug) {
                return slugify(data.name)
              }
            }
            return data?.slug
          },
        ],
      },
    },
    {
      name: 'description',
      type: 'textarea',
    },
    {
      name: 'color',
      type: 'select',
      options: [
        { label: 'Azul', value: 'blue' },
        { label: 'Rojo', value: 'red' },
        { label: 'Verde', value: 'green' },
        { label: 'Amarillo', value: 'yellow' },
        { label: 'Morado', value: 'purple' },
        { label: 'Rosa', value: 'pink' },
      ],
      defaultValue: 'blue',
    },
  ],
}
