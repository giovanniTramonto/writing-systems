import prisma from '~/server/utils/prisma'

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')

  if (!id) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Language ID is required'
    })
  }

  await prisma.language.delete({
    where: { id }
  })

  return { success: true, message: 'Language deleted successfully' }
})
