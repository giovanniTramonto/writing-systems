import prisma from '~/server/utils/prisma'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  const character = await prisma.character.create({
    data: {
      character: body.character,
      unicodeHex: body.unicodeHex,
      unicodeDec: body.unicodeDec,
      name: body.name,
      block: body.block,
      category: body.category,
      description: body.description,
      languageId: body.languageId,
      scriptId: body.scriptId
    }
  })

  return character
})
