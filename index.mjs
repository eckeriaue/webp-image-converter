import Fastify from 'fastify'
import { env } from 'node:process'
import { fileURLToPath } from 'node:url'
import { readFile } from 'node:fs/promises'

const port = parseInt(env.PORT || '3001')
const host = env.HOST || '0.0.0.0'

const app = Fastify({
  logger: (env.LOGGER || 'true') === 'true',
})

app
.register(import('@fastify/multipart'))
.register(import('@fastify/static'), {
  root: fileURLToPath(new URL('./public', import.meta.url)),
})
.register(import('./plugin.mjs'))
.get('/', function(req, res) {
  res.header('content-type', 'text/html')
  return readFile('./public/client.html', 'utf-8')
})
.listen({ port, host })
.then(() => {
  console.info(
    `
      image converted was started
      host: ${host}
      port: ${port}
    `
  )
})
.catch(err => {
  app.log.error(err)
  process.exit(1)
})