import prisma from '~/server/utils/prisma'

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const { scriptId, scriptName, isPrimary } = query

  if (!scriptId && !scriptName) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Either scriptId or scriptName is required'
    })
  }

  const whereClause: any = {}

  if (scriptId) {
    whereClause.scriptId = scriptId as string
  } else if (scriptName) {
    whereClause.script = {
      name: scriptName as string
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
    orderBy: {
      language: {
        name: 'asc'
      }
    }
  })

  return languageScripts.map(ls => ({
    ...ls.language,
    scriptRelation: {
      isPrimary: ls.isPrimary,
      status: ls.status,
      script: ls.script
    }
  }))
})
