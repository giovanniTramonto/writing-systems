import prisma from '~/server/utils/prisma'

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')

  if (!id) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Country ID is required'
    })
  }

  await prisma.country.delete({
    where: { id }
  })

  return { success: true, message: 'Country deleted successfully' }
})
