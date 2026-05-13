import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('=== Testing flat Moment table ===')
  
  const [list, total] = await Promise.all([
    prisma.moment.findMany({
      orderBy: {
        createTime: 'desc'
      },
      skip: 0,
      take: 8
    }),
    prisma.moment.count()
  ])

  console.log('Total count:', total)
  console.log('=== List ===')
  for (const item of list) {
    console.log(JSON.stringify(item, null, 2))
  }
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
