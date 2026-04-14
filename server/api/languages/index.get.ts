import prisma from '~/server/utils/prisma'

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const { include, family, iso639_1 } = query

  const whereClause: any = {}

  if (family) whereClause.family = family as string
  if (iso639_1) whereClause.iso639_1 = iso639_1 as string

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

  const languages = await prisma.language.findMany({
    where: whereClause,
    include: includeOptions,
    orderBy: { name: 'asc' }
  })

  return languages
})
