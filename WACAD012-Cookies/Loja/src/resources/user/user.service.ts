import { PrismaClient } from '../../generated/prisma'
import { UserStatus } from './user.constants'
import { CreateUserDto } from './user.types'
import { hash, genSalt } from 'bcryptjs'
import getEnv from '../../utils/getEnv'

const prisma = new PrismaClient()
const env = getEnv()

export  const createUser = async( user: CreateUserDto) => {
    const { repeatPassword, ...data} = user
    const salt = await genSalt(env.BCRYPT_ROUNDS)
    const password = await hash(data.password, salt)
    return prisma.user.create({
        data: {
            ...data,
            password,
            status: UserStatus.active
        }
    })
}