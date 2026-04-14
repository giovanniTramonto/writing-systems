import prisma from '~/server/utils/prisma'

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')
  const query = getQuery(event)
  const { include } = query

  if (!id) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Character ID is required'
    })
  }

  const includeOptions: any = {}

  if (include === 'all' || include === 'language') {
    includeOptions.language = true
  }

  if (include === 'all' || include === 'script') {
    includeOptions.script = true
  }

  const character = await prisma.character.findUnique({
    where: { id },
    include: includeOptions
  })

  if (!character) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Character not found'
    })
  }

  return character
})
