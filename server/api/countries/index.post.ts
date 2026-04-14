import prisma from '~/server/utils/prisma'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  const country = await prisma.country.create({
    data: {
      name: body.name,
      nativeName: body.nativeName,
      iso3166_1: body.iso3166_1,
      iso3166_2: body.iso3166_2,
      region: body.region,
      subregion: body.subregion,
      population: body.population ? BigInt(body.population) : null,
      description: body.description
    }
  })

  return country
})
