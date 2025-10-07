import { CreateClientDto, LoginDto } from './auth.types'
import { createUser } from '../user/user.service'
import { CreateUserDto } from '../user/user.types'
import { UserTypes } from '../userType/userType.constants'
import { PrismaClient, User } from '../../generated/prisma'
import { compare } from 'bcryptjs'

const prisma = new PrismaClient()

export const createClient = async (client: CreateClientDto) => {
  const user: CreateUserDto = {
    ...client,
    typeId: UserTypes.client,
  }
  return await createUser(user)
}

export const checkCredentials = async (credentials: LoginDto) : Promise<User | null> => {
  const user = await prisma.user.findFirst({
    where: {
      email: credentials.email,
    },
  })
  if (!user) return null
  const ok = await compare(credentials.password, user.password)
  if (!ok) return null
  return user
}
