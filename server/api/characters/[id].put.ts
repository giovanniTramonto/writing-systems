import prisma from '~/server/utils/prisma'

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')
  const body = await readBody(event)

  if (!id) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Character ID is required'
    })
  }

  const updateData: any = {}

  if (body.character !== undefined) updateData.character = body.character
  if (body.unicodeHex !== undefined) updateData.unicodeHex = body.unicodeHex
  if (body.unicodeDec !== undefined) updateData.unicodeDec = body.unicodeDec
  if (body.name !== undefined) updateData.name = body.name
  if (body.block !== undefined) updateData.block = body.block
  if (body.category !== undefined) updateData.category = body.category
  if (body.description !== undefined) updateData.description = body.description
  if (body.languageId !== undefined) updateData.languageId = body.languageId
  if (body.scriptId !== undefined) updateData.scriptId = body.scriptId

  const character = await prisma.character.update({
    where: { id },
    data: updateData
  })

  return character
})
