import { PrismaClient } from '@prisma/client'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const prisma = new PrismaClient()

async function main() {
  console.log('Deleting old data...')
  await prisma.moment.deleteMany({})
  console.log('Old data deleted!')

  console.log('Reading data from JSON...')
  const dataPath = path.join(__dirname, 'moments-data.json')
  const jsonData = fs.readFileSync(dataPath, 'utf8')
  const momentsData = JSON.parse(jsonData)

  console.log('Inserting new data...')
  for (const momentData of momentsData) {
    await prisma.moment.create({
      data: {
        content: JSON.stringify(momentData),
        images: []
      }
    })
  }

  console.log('Seed data created successfully!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
