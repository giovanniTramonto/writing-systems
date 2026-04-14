import prisma from '~/server/utils/prisma'

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')
  const query = getQuery(event)
  const { include } = query

  if (!id) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Country ID is required'
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

  const country = await prisma.country.findUnique({
    where: { id },
    include: includeOptions
  })

  if (!country) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Country not found'
    })
  }

  return country
})
