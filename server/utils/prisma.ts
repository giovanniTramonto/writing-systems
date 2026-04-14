import { PrismaClient } from '@prisma/client'

const prismaClientSingleton = () => {
  return new PrismaClient().$extends({
    result: {
      language: {
        speakers: {
          needs: { speakers: true },
          compute: (data) => data.speakers !== null ? Number(data.speakers) : null,
        },
      },
      country: {
        population: {
          needs: { population: true },
          compute: (data) => data.population !== null ? Number(data.population) : null,
        },
      },
      languageCountry: {
        speakers: {
          needs: { speakers: true },
          compute: (data) => data.speakers !== null ? Number(data.speakers) : null,
        },
      },
    },
  })
}

declare global {
  var prisma: undefined | ReturnType<typeof prismaClientSingleton>
}

const prisma = globalThis.prisma ?? prismaClientSingleton()

export default prisma

if (process.env.NODE_ENV !== 'production') globalThis.prisma = prisma
