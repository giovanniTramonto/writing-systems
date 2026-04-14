import prisma from '~/server/utils/prisma'

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')

  if (!id) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Character ID is required'
    })
  }

  await prisma.character.delete({
    where: { id }
  })

  return { success: true, message: 'Character deleted successfully' }
})
