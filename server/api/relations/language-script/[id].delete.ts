import prisma from '~/server/utils/prisma'

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')

  if (!id) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Relation ID is required'
    })
  }

  await prisma.languageScript.delete({
    where: { id }
  })

  return { success: true, message: 'Language-Script relation deleted successfully' }
})
