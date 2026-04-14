import prisma from '~/server/utils/prisma'

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')
  const body = await readBody(event)

  if (!id) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Language ID is required'
    })
  }

  const updateData: any = {}

  if (body.name !== undefined) updateData.name = body.name
  if (body.nativeName !== undefined) updateData.nativeName = body.nativeName
  if (body.iso639_1 !== undefined) updateData.iso639_1 = body.iso639_1
  if (body.iso639_2 !== undefined) updateData.iso639_2 = body.iso639_2
  if (body.family !== undefined) updateData.family = body.family
  if (body.branch !== undefined) updateData.branch = body.branch
  if (body.speakers !== undefined) updateData.speakers = body.speakers ? BigInt(body.speakers) : null
  if (body.description !== undefined) updateData.description = body.description

  const language = await prisma.language.update({
    where: { id },
    data: updateData
  })

  return language
})
