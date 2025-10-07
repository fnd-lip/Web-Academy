import { User } from '../../generated/prisma'

export type CreateClientDto = Pick<User, 'name' | 'password' | 'email' > & {
    repeatPassword: string
}

export type LoginDto = Pick<User, 'email' | 'password'>