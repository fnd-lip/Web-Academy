import { User } from "../../generated/prisma";

export type CreateUserDto = Pick<User, 'name' | 'email' | 'typeId' | 'password'> & {
    repeatPassword: string
}