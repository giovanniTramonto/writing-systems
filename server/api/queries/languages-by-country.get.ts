import prisma from '~/server/utils/prisma'

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const { countryId, countryName, iso3166_1, isOfficial } = query

  if (!countryId && !countryName && !iso3166_1) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Either countryId, countryName, or iso3166_1 is required'
    })
  }

  const whereClause: any = {}

  if (countryId) {
    whereClause.countryId = countryId as string
  } else if (countryName) {
    whereClause.country = {
      name: countryName as string
    }
  } else if (iso3166_1) {
    whereClause.country = {
      iso3166_1: iso3166_1 as string
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
    orderBy: [
      { isOfficial: 'desc' },
      { percentage: 'desc' },
      {
        language: {
          name: 'asc'
        }
      }
    ]
  })

  return languageCountries.map(lc => ({
    ...lc.language,
    countryRelation: {
      isOfficial: lc.isOfficial,
      speakers: lc.speakers,
      percentage: lc.percentage,
      status: lc.status,
      country: lc.country
    }
  }))
})
