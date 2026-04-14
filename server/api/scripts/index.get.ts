import prisma from '~/server/utils/prisma'

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const { include, type, direction } = query

  const whereClause: any = {}

  if (type) whereClause.type = type as string
  if (direction) whereClause.direction = direction as string

  const includeOptions: any = {}

  if (include === 'all' || include === 'languages') {
    includeOptions.languages = {
      include: {
        language: true
      }
    }
  }

  const scripts = await prisma.script.findMany({
    where: whereClause,
    include: includeOptions,
    orderBy: { name: 'asc' }
  })

  return scripts
})
