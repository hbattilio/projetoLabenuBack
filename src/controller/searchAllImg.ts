import { Request, Response } from "express";
import { connection } from "../data/connection";
import { getTokenData } from "../services/authenticator";
import { Image } from "../types/types";

export default async function searchAllImg(
    req: Request,
    res: Response)
    {
        try{
            let message = "Search All images was success!"
            const token = req.headers.authorization as string

            if(!token){
                res.statusCode = 401
                throw new Error("The Token must be informed")        
            }

            getTokenData(token)
            
            const queryResult: Image[] = await connection.raw(`
                SELECT * FROM laproject_images
            `)
            
            if(!queryResult.length) {
                res.statusCode = 404
                message = " All Image not found"
                throw new Error(message)
            }
            
            let image = queryResult[0]

                res.status(200).send({ image })
        }   catch(error){
            let message = error.sqlMessage || error.message
            res.statusCode = 400
            res.send({ message })
        }
    }