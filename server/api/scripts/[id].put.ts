import prisma from '~/server/utils/prisma'

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')
  const body = await readBody(event)

  if (!id) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Script ID is required'
    })
  }

  const updateData: any = {}

  if (body.name !== undefined) updateData.name = body.name
  if (body.nativeName !== undefined) updateData.nativeName = body.nativeName
  if (body.iso15924 !== undefined) updateData.iso15924 = body.iso15924
  if (body.type !== undefined) updateData.type = body.type
  if (body.direction !== undefined) updateData.direction = body.direction
  if (body.description !== undefined) updateData.description = body.description

  const script = await prisma.script.update({
    where: { id },
    data: updateData
  })

  return script
})
