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

export default function any2webpConverterPlugin(app, { endpoint = '/convert' } = {}, done) {
  app.post(endpoint, async function(request, reply) {
    reply.header('Content-Type', 'multipart/form-data')
    const files = await extractFilesFromRequest(request)
    return sharp(files.at(0).content).webp().toBuffer()
  })
  
  app.get('/', async function  (request, reply) {
    reply.header('Content-Type', 'text/html')
    return /* html */`
    <div>
      <form name="sendForm" style="display: flex">
        <input name="targetFileInput" type="file">
        <button type="submit"> convert </button>
        <img id="previewInput" style="width: 400px" />
        <img id="previewOutput" style="width: 400px" />
      </form>
      <script>
  
        document.forms.sendForm.targetFileInput.addEventListener('input', function(event) {
          const [file] = event.target.files
          if (previewInput.src) {
            URL.revokeObjectURL(previewInput.src)
          }
          previewInput.src = URL.createObjectURL(file)
        })
  
        document.forms.sendForm.addEventListener('submit', async function(event) {
          event.preventDefault()
          const [file] = event.target.targetFileInput.files
          const fd = new FormData(event.target)
          fd.append('targetFile', file)
          const requestBlob = await fetch('/convert', {
            method: 'POST',
            body: fd,
          })
          .then(file => file.blob())
          .catch(e => {
            console.error('Файл не был загружен')
          })
  
          previewOutput.src = URL.createObjectURL(
            new File(
              [requestBlob],
              'output.webp',
              { type: 'image/webp' }
            )
          )
        })
      </script>
    </div>`
  })
  done()
}