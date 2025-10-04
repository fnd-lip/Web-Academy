import { CreateClientDto } from "./auth.types";
import { createUser } from "../user/user.service";
import { CreateUserDto } from "../user/user.types";
import { UserTypes } from "../userType/userType.constants";

export const createClient = async(client: CreateClientDto) => {
    const user: CreateUserDto = {
        ...client,
        typeId: UserTypes.client,
    }
    return await createUser(user)
}