// Import the framework and instantiate it
import Fastify from 'fastify'
const app = Fastify({
  logger: true
})

app.register(import('@fastify/multipart'))

app.post('/convert', async function(request, reply) {
  reply.header('Content-Type', 'multipart/form-data')
  console.info(request.file)
  // const { default: sharp } = await import('sharp')
  
})

app.get('/', async function  (request, reply) {
  reply.header('Content-Type', 'text/html')
  return /* html */`
  <div>
    <form name="sendForm" style="display: flex">
      <input name="targetFileInput" type="file">
      <button type="submit"> convert </button>
      <img id="preview" style="width: 400px" />
    </form>
    <script>

      document.forms.sendForm.targetFileInput.addEventListener('input', function(event) {
        const [file] = event.target.files
        if (preview.src) {
          URL.revokeObjectURL(preview.src)
        }
        preview.src = URL.createObjectURL(file)
      })

      document.forms.sendForm.addEventListener('submit', function(event) {
        event.preventDefault()
        const [file] = event.target.targetFileInput.files
        const fd = new FormData(event.target)
        fd.append('targetFile', file)
        fetch('/convert', {
          method: 'POST',
          body: fd,
        })
        console.info(file)
      })
    </script>
  </div>`
})

try {
  await app.listen({ port: 3000 })
} catch (err) {
  app.log.error(err)
  process.exit(1)
}