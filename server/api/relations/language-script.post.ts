import prisma from '~/server/utils/prisma'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  if (!body.languageId || !body.scriptId) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Both languageId and scriptId are required'
    })
  }

  const relation = await prisma.languageScript.create({
    data: {
      languageId: body.languageId,
      scriptId: body.scriptId,
      isPrimary: body.isPrimary || false,
      status: body.status
    },
    include: {
      language: true,
      script: true
    }
  })

  return relation
})
