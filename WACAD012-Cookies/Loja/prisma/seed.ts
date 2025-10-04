import { PrismaClient } from '../src/generated/prisma'
import { UserTypes } from '../src/resources/userType/userType.constants'

const prisma = new PrismaClient()

async function seed() {
  return await prisma.userType.createMany({
    data: [
      { id: UserTypes.admin, label: 'admin' },
      { id: UserTypes.client, label: 'client' },
    ],
  })
}

seed().then(() => {
    console.log('Registros adicionados no banco')
})
.catch((err) => {
    console.log('Erro ao adicionar a seed:')
    console.log(err)
})
.finally(async () => {
    await prisma.$disconnect()
})