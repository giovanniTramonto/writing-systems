import prisma from '~/server/utils/prisma'

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const { include, region, subregion } = query

  const whereClause: any = {}

  if (region) whereClause.region = region as string
  if (subregion) whereClause.subregion = subregion as string

  const includeOptions: any = {}

  if (include === 'all' || include === 'languages') {
    includeOptions.languages = {
      include: {
        language: true
      }
    }
  }

  const countries = await prisma.country.findMany({
    where: whereClause,
    include: includeOptions,
    orderBy: { name: 'asc' }
  })

  return countries
})
