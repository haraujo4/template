import { AppDataSource } from "../database/data-source";
import { User } from "../entities/userEntity";


const userListServices = async () =>{
    const userRepository = AppDataSource.getRepository(User)
    const users = userRepository.find()
    return users
}

export default userListServices