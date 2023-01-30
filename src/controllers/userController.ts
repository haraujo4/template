import{Request, Response} from 'express'
import userCreateServices from '../services/userCreateServices'
import userListServices from '../services/userListServices'
import userLoginServices from '../services/userLoginServices'
import userListOneServices from '../services/userLisOneServices'
import userUpdatePasswordServices from '../services/userUpdatePasswordServices'
import userDeleteServices from '../services/userDeleteServices'

export const createUserController = async (req:Request, res:Response) =>{
    try{
        const {name, email, password} = req.body
        const newUser = await userCreateServices({name, email, password})
        return res.status(201).send(newUser)
    }
    catch(err){
        if(err instanceof Error){
            return res.status(400).send({
                error:err.name,
                message:err.message
            })
        }
    }
}

export const userListController = async (req:Request, res:Response) =>{
    try{
        const users = await userListServices()
        return res.send(users)
    }
    catch(err){
        if(err instanceof Error){
            return res.status(400).send({
                error:err.name,
                message: err.message
            })
        }
    }
}

export const userListOneController = async (req:Request, res:Response)=>{
    try{
        const email = req.userEmail
        const user = await userListOneServices(email)
        return res.status(200).send(user)
    }
    catch(err){
        if(err instanceof Error){
            return res.status(400).send({
                error:err.name,
                message:err.message
            })
        }
    }
}

export const userLoginController = async (req:Request, res:Response) =>{
    try{
        const {email, password} = req.body
        const token = await userLoginServices({email, password})
        return res.status(201).json({token})
    }
    catch(err){
        if(err instanceof Error){
            return res.status(400).send({
                error:err.name,
                message:err.message
            })
        }
    }
}

export const userUpdatePasswordController = async (req:Request, res:Response) =>{
    try{
        const email = req.userEmail
        const {password} = req.body

        if(!password){
            throw new Error("Senha não informada")
        }

        const user = await userUpdatePasswordServices(email, password)

        return res.status(201).json({message:"Senha alterada"})
    }
    catch(err){
        if(err instanceof Error){
            res.status(400).send({
                error:err.name,
                message:err.message
            })
        }
    }
}

export const userDeleteController = async (req:Request, res:Response)=>{
    try{
        const email = req.userEmail
        const user = await userDeleteServices(email)
        return res.status(201).json({message:"Usuario apagado com sucesso"})
    }
    catch(err){
        if(err instanceof Error){
            res.status(400).send({
                error:err.name,
                message:err.message
            })
        }
    }
}


