import { Request, Response } from 'express';
import { generateId } from "../services/idGenerator";
import { connection } from "../data/connection"
import { getTokenData } from "../services/authenticator"

export default async function createImage (
    req: Request,
    res: Response) {
        try{
            let message = "Image include sucessfully!"
            const {subtitle, author, date, file, tags, collection} = req.body
            const token = req.headers.authorization as string

            if(!subtitle || !author || !date || !file || !tags || !collection) {
                res.statusCode = 406
                message = '"subtitle", "author", "date", "file", "tags" and "collection" must be provided'
                throw new Error(message)
            }
            if(!token){
                res.statusCode = 401
                throw new Error("The Token must be informed")
            }
            getTokenData(token)

            const id: string = generateId()

            await connection("laproject_images")
                .insert({
                    id,
                    subtitle, 
                    author, 
                    date, 
                    file, 
                    tags, 
                    collection
                })
            
            res.status(201).send({message})
            
        }   catch(error){
            res.statusCode = 400
            let message = error.sqlMessage || error.message || "Connection error"
            res.send({message})
        }
    }