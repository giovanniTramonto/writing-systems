import prisma from '~/server/utils/prisma'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  if (!body.languageId || !body.countryId) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Both languageId and countryId are required'
    })
  }

  const relation = await prisma.languageCountry.create({
    data: {
      languageId: body.languageId,
      countryId: body.countryId,
      isOfficial: body.isOfficial || false,
      speakers: body.speakers ? BigInt(body.speakers) : null,
      percentage: body.percentage,
      status: body.status
    },
    include: {
      language: true,
      country: true
    }
  })

  return relation
})
