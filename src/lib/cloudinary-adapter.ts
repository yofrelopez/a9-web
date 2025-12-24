import type { Adapter } from '@payloadcms/plugin-cloud-storage/types'
import { v2 as cloudinary } from 'cloudinary'

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_APY_KEY,
  api_secret: process.env.CLOUDINARY_APY_SECRET,
})

interface CloudinaryAdapterArgs {
  folder?: string
}

export const cloudinaryAdapter = ({
  folder = 'antena9-media',
}: CloudinaryAdapterArgs = {}): Adapter => {
  return ({ collection, prefix = '' }) => {
    const folderPath = prefix ? `${folder}/${prefix}` : folder

    return {
      name: 'cloudinary',

      // Handle file upload to Cloudinary
      handleUpload: async ({ data, file }) => {
        return new Promise((resolve, reject) => {
          const uploadStream = cloudinary.uploader.upload_stream(
            {
              folder: folderPath,
              public_id: file.filename.replace(/\.[^/.]+$/, ''), // Remove extension
              resource_type: file.mimeType.startsWith('video') ? 'video' : 'image',
              overwrite: false,
            },
            (error, result) => {
              if (error) {
                reject(error)
                return
              }

              if (!result) {
                reject(new Error('Upload failed - no result'))
                return
              }

              // Update data with Cloudinary URL
              data.url = result.secure_url
              data.filename = result.public_id.split('/').pop() || file.filename

              resolve()
            }
          )

          uploadStream.end(file.buffer)
        })
      },

      // Handle file deletion from Cloudinary
      handleDelete: async ({ filename }) => {
        const publicId = `${folderPath}/${filename.replace(/\.[^/.]+$/, '')}`

        try {
          await cloudinary.uploader.destroy(publicId, {
            invalidate: true,
          })
        } catch (error) {
          console.error('Error deleting from Cloudinary:', error)
          throw error
        }
      },

      // Generate public URL for uploaded files
      generateURL: ({ filename }) => {
        const publicId = `${folderPath}/${filename.replace(/\.[^/.]+$/, '')}`
        return cloudinary.url(publicId, {
          secure: true,
          transformation: [{ fetch_format: 'auto', quality: 'auto' }],
        })
      },

      // Static handler for serving files (required by interface)
      staticHandler: async (req, { params }) => {
        // For cloud storage, we don't need a static handler
        // Files are served directly from Cloudinary
        return new Response('Not implemented - files served from Cloudinary', {
          status: 501,
        })
      },
    }
  }
}
