import Fastify from 'fastify'
import { join, resolve } from 'node:path'
import { env } from 'node:process'
import { fileURLToPath } from 'node:url'

const port = parseInt(env.PORT || '3000')
const host = env.HOST || '127.0.0.1'

const app = Fastify({
  logger: true,
})

app
.register(import('@fastify/multipart'))
.register(import('@fastify/static'), {
  root: fileURLToPath(new URL('./public', import.meta.url)),
})
.register(import('./converterPlugin.mjs'))
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