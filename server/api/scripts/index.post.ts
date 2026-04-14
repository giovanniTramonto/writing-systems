import prisma from '~/server/utils/prisma'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  const script = await prisma.script.create({
    data: {
      name: body.name,
      nativeName: body.nativeName,
      iso15924: body.iso15924,
      type: body.type,
      direction: body.direction,
      description: body.description
    }
  })

  return script
})
