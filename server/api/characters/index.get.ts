import prisma from '~/server/utils/prisma'

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const { include, block, category, languageId, scriptId, limit = '100' } = query

  const whereClause: any = {}

  if (block) whereClause.block = block as string
  if (category) whereClause.category = category as string
  if (languageId) whereClause.languageId = languageId as string
  if (scriptId) whereClause.scriptId = scriptId as string

  const includeOptions: any = {}

  if (include === 'all' || include === 'language') {
    includeOptions.language = true
  }

  if (include === 'all' || include === 'script') {
    includeOptions.script = true
  }

  const characters = await prisma.character.findMany({
    where: whereClause,
    include: includeOptions,
    orderBy: { unicodeDec: 'asc' },
    take: parseInt(limit as string)
  })

  return characters
})
