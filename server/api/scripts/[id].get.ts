import prisma from '~/server/utils/prisma'

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')
  const query = getQuery(event)
  const { include } = query

  if (!id) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Script ID is required'
    })
  }

  const includeOptions: any = {}

  if (include === 'all' || include === 'languages') {
    includeOptions.languages = {
      include: {
        language: true
      }
    }
  }

  if (include === 'all' || include === 'characters') {
    includeOptions.characters = true
  }

  const script = await prisma.script.findUnique({
    where: { id },
    include: includeOptions
  })

  if (!script) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Script not found'
    })
  }

  return script
})
