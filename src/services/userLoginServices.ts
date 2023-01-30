import { AppDataSource } from "../database/data-source";
import { User } from "../entities/userEntity";
import { IUserLogin } from "../interfaces";
import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken";


const userLoginServices = async({email, password}:IUserLogin) =>{
    const userRepository = AppDataSource.getRepository(User)
    const users = await userRepository.find()
    const account = users.find(user => user.email ===email)

    if(!account){
        throw new Error("Usuario não encontrado")
    }

    if(!bcrypt.compareSync(password, account.password)){
        throw new Error("Usuario ou senha incorreta")
    }

    const token = jwt.sign(
        {email:email},
        String(process.env.JWT_SECRET),
        {expiresIn: '1d'}
    )

    return token
}

export default userLoginServices