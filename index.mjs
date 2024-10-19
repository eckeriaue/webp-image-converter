import Fastify from 'fastify'
import { env } from 'node:process'

const port = parseInt(env.PORT || '3000')
const host = env.HOST || '127.0.0.1'

const app = Fastify({
  logger: true
})

app
.register(import('@fastify/multipart'))
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