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
  if (body.iso3166_1 !== undefined) updateData.iso3166_1 = body.iso3166_1
  if (body.iso3166_2 !== undefined) updateData.iso3166_2 = body.iso3166_2
  if (body.region !== undefined) updateData.region = body.region
  if (body.subregion !== undefined) updateData.subregion = body.subregion
  if (body.population !== undefined) updateData.population = body.population ? BigInt(body.population) : null
  if (body.description !== undefined) updateData.description = body.description

  const country = await prisma.country.update({
    where: { id },
    data: updateData
  })

  return country
})
