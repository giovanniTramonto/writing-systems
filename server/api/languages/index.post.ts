import prisma from '~/server/utils/prisma'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  const language = await prisma.language.create({
    data: {
      name: body.name,
      nativeName: body.nativeName,
      iso639_1: body.iso639_1,
      iso639_2: body.iso639_2,
      family: body.family,
      branch: body.branch,
      speakers: body.speakers ? BigInt(body.speakers) : null,
      description: body.description
    }
  })

  return language
})
