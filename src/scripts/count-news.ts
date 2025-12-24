import { getPayload } from 'payload'
import config from '@payload-config'

async function count() {
    const payload = await getPayload({ config })
    const result = await payload.find({ collection: 'news' })
    console.log(`📊 TOTAL NOTICIAS EN DB: ${result.totalDocs}`)
    process.exit(0)
}

count()
