export default defineEventHandler((event) => {
  if (process.env.NODE_ENV === 'development') return

  const method = getMethod(event)
  if (method === 'POST' || method === 'PUT' || method === 'DELETE') {
    throw createError({ statusCode: 403, statusMessage: 'Forbidden' })
  }
})
