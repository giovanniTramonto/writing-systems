import prisma from '~/server/utils/prisma'

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')
  const query = getQuery(event)
  const { include } = query

  if (!id) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Language ID is required'
    })
  }

  const includeOptions: any = {}

  if (include === 'all' || include === 'scripts') {
    includeOptions.scripts = {
      include: {
        script: true
      }
    }
  }

  if (include === 'all' || include === 'countries') {
    includeOptions.countries = {
      include: {
        country: true
      }
    }
  }

  if (include === 'all' || include === 'characters') {
    includeOptions.characters = true
  }

  const language = await prisma.language.findUnique({
    where: { id },
    include: includeOptions
  })

  if (!language) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Language not found'
    })
  }

  return language
})
