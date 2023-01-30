import{AppDataSource} from '../database/data-source'
import { User } from '../entities/userEntity'
import { IUserCreate } from '../interfaces'
import bcrypt from 'bcrypt'


const userCreateServices = async ({name, email, password}:IUserCreate) =>{
    const userRepository = AppDataSource.getRepository(User)
    const users = await userRepository.find()
    const emailAlreadyExist = users.find(user => user.email === email)

    if(emailAlreadyExist){
        throw new Error("Email já existe")
    }

    const user = new User()
    user.name = name
    user.email = email
    user.password = bcrypt.hashSync(password,10)
    
    userRepository.create(user)
    await userRepository.save(user);

    return user
}

export default userCreateServices