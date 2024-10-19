// Import the framework and instantiate it
import Fastify from 'fastify'
const app = Fastify({
  logger: true
})

app.register(import('@fastify/multipart'))
app.register(import('./converterPlugin.mjs'))

try {
  await app.listen({ port: 3000 })
} catch (err) {
  app.log.error(err)
  process.exit(1)
}