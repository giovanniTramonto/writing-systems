import prisma from '~/server/utils/prisma'

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')

  if (!id) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Script ID is required'
    })
  }

  await prisma.script.delete({
    where: { id }
  })

  return { success: true, message: 'Script deleted successfully' }
})
