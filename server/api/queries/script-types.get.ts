import prisma from '~/server/utils/prisma'

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const { type } = query

  if (type) {
    // Get all scripts of a specific type
    const scripts = await prisma.script.findMany({
      where: {
        type: type as string
      },
      include: {
        languages: {
          include: {
            language: true
          }
        }
      },
      orderBy: { name: 'asc' }
    })

    return {
      type: type,
      scriptCount: scripts.length,
      scripts
    }
  } else {
    // Get summary of all script types
    const types = await prisma.script.groupBy({
      by: ['type'],
      _count: {
        type: true
      },
      orderBy: {
        _count: {
          type: 'desc'
        }
      }
    })

    return types.map(t => ({
      type: t.type,
      scriptCount: t._count.type
    }))
  }
})
