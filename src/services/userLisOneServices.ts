import { AppDataSource } from "../database/data-source";
import { User } from "../entities/userEntity";


const userListOneServices = async (email:string) =>{
    const userRepository = AppDataSource.getRepository(User)
    const users = await userRepository.find()

    const account = users.find(user => user.email === email)

    return account
}

export default userListOneServices