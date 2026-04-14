import prisma from '~/server/utils/prisma'

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const { languageId, languageName, isPrimary } = query

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

  if (isPrimary !== undefined) {
    whereClause.isPrimary = isPrimary === 'true'
  }

  const languageScripts = await prisma.languageScript.findMany({
    where: whereClause,
    include: {
      language: true,
      script: true
    },
    orderBy: [
      { isPrimary: 'desc' },
      {
        script: {
          name: 'asc'
        }
      }
    ]
  })

  return languageScripts.map(ls => ({
    ...ls.script,
    languageRelation: {
      isPrimary: ls.isPrimary,
      status: ls.status,
      language: ls.language
    }
  }))
})
