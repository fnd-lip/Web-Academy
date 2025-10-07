import { genSalt, hash } from 'bcryptjs'
import { PrismaClient } from '../src/generated/prisma'
import { UserTypes } from '../src/resources/userType/userType.constants'
import getEnv from '../src/utils/getEnv'
import { UserStatus } from '../src/resources/user/user.constants'

const prisma = new PrismaClient()

async function seed() {
  try {
    const env = getEnv()
    await prisma.userType.createMany({
      data: [
        { id: UserTypes.admin, label: 'admin' },
        { id: UserTypes.client, label: 'client' },
      ],
      skipDuplicates: true,
    })
    const salt = await genSalt(env.BCRYPT_ROUNDS)
    const password = await hash(env.PASSWORD_ADMIN, salt)
    await prisma.user.createMany({
      data: [
        {
          name: 'Admin',
          email: 'admin@admin.com',
          typeId: UserTypes.admin,
          password,
          status: UserStatus.active,
        },
      ],
    })
    return true
  } catch (err) {
    return false
  }
}

seed()
  .then(() => {
    console.log('Seeds executadas com sucesso')
  })
  .catch((err) => {
    console.log('Erro ao adicionar a seed:')
    console.log(err)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
