import { Request, Response } from "express"
import { generateId } from "../services/idGenerator"
import { hash } from "../services/hashManager"
import { connection } from "../data/connection"
import { generateToken } from "../services/authenticator"



export default async function signUpUser (
    req: Request,
    res: Response) {
        try{
            let message = "Signup sucess!"
            const { name, email, nickname, password } = req.body

            if(!name || !email || !nickname || !password) {
                res.statusCode = 406
                message = '"name", "email", "nickname" and "password" must be provided'
                throw new Error(message)
            }

            const id: string = generateId()

            const cypherPassword = await hash(password);

            await connection("laproject_users")
                .insert({
                    id,
                    name,
                    nickname,
                    email,
                    password: cypherPassword
                })
            
            const token: string = generateToken({ id })

            res.status(201).send({message, token})
                
        } catch (error){
            res.statusCode = 400
            let message = error.sqlMessage || error.message || "Connection error"
            res.send({message})
        }
    
}