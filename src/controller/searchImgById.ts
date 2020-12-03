import { Request, Response } from "express";
import { connection } from "../data/connection";
import { Image } from "../types/types";
import { getTokenData } from "../services/authenticator";

export default async function searchImgById(
    req: Request,
    res: Response)
    {
        try{
            let message = "Search was success!"

            const { id } = req.params
            const token = req.headers.authorization as string

            if(!token){
                throw new Error ("The Token must be informed")
            }
            getTokenData(token)

            const queryResult: any = await connection("laproject_images")
                .select("*")
                .where({id})

            if(!queryResult[0]) {
                res.statusCode = 404
                message = "Image not found"
                throw new Error(message)
            }
            const image: Image = {
                id: queryResult[0].id,
                subtitle: queryResult[0].subtitle,
                author: queryResult[0].author,
                date: queryResult[0].date,
                file: queryResult[0].file,
                tags: queryResult[0].tags,
                collection: queryResult[0].collection
                }

                res.status(200).send({ message, image })
        }   catch(error){
            let message = error.sqlMessage || error.message
            res.statusCode = 400
            res.send({ message })
        }
    }