import sharp from 'sharp'

/**
 * @param {import('fastify').FastifyRequest} request
*/
async function extractFilesFromRequest(request) {
  const files = []
  for await (const { file, filename, mimetype } of request.files()) {
    const content = await new Promise((resolve, reject) => {
      const chunks = []
      file.on('data', (chunk) => chunks.push(Buffer.from(chunk)))
      file.once('end', () => resolve(Buffer.concat(chunks)))
      file.once('error', reject)
    })

    files.push({
      filename,
      content,
      mimetype,
    })
  }
  return files
}

/**
 * @param {import('fastify').FastifyInstance} app
*/
export default function any2webpConverterPlugin(app, { endpoint = '/convert' } = {}, done) {
  app.post(endpoint, async function(request, reply) {
    reply.header('Content-Type', 'multipart/form-data')
    const files = await extractFilesFromRequest(request)
    return sharp(files.at(0).content).webp().toBuffer()
  })

  .get('/', function (request, reply) {
    reply.sendFile('client.html')
  })
  done()
}