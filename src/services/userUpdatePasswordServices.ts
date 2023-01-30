import { AppDataSource } from "../database/data-source"
import { User } from "../entities/userEntity"
import bcrypt from 'bcrypt'



const userUpdatePasswordServices = async (email:string, password:string) =>{
    const userRepository = AppDataSource.getRepository(User)
    const users = await userRepository.find()

    const account = users.find(user => user.email === email)

    if(bcrypt.compareSync(password, account!.password)){
        throw new Error("informe uma senha diferente")
    }

    const newPassowrd = bcrypt.hashSync(password, 10)
    await userRepository.update(account!.id, {password: newPassowrd})
    return true
}

export default userUpdatePasswordServices