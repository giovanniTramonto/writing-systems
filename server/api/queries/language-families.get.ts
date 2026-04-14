import prisma from '~/server/utils/prisma'

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const { family } = query

  if (family) {
    // Get all languages in a specific family
    const languages = await prisma.language.findMany({
      where: {
        family: family as string
      },
      include: {
        scripts: {
          include: {
            script: true
          }
        }
      },
      orderBy: [
        { branch: 'asc' },
        { name: 'asc' }
      ]
    })

    return {
      family: family,
      languageCount: languages.length,
      languages
    }
  } else {
    // Get summary of all families
    const families = await prisma.language.groupBy({
      by: ['family'],
      _count: {
        family: true
      },
      orderBy: {
        _count: {
          family: 'desc'
        }
      }
    })

    return families.filter(f => f.family !== null).map(f => ({
      family: f.family,
      languageCount: f._count.family
    }))
  }
})
