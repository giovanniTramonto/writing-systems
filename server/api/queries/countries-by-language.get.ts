import prisma from '~/server/utils/prisma'

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const { languageId, languageName, isOfficial } = query

  if (!languageId && !languageName) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Either languageId or languageName is required'
    })
  }

  const whereClause: any = {}

  if (languageId) {
    whereClause.languageId = languageId as string
  } else if (languageName) {
    whereClause.language = {
      name: languageName as string
    }
  }

  if (isOfficial !== undefined) {
    whereClause.isOfficial = isOfficial === 'true'
  }

  const languageCountries = await prisma.languageCountry.findMany({
    where: whereClause,
    include: {
      language: true,
      country: true
    },
    orderBy: {
      country: {
        name: 'asc'
      }
    }
  })

  return languageCountries.map(lc => ({
    ...lc.country,
    languageRelation: {
      isOfficial: lc.isOfficial,
      speakers: lc.speakers,
      percentage: lc.percentage,
      status: lc.status,
      language: lc.language
    }
  }))
})
