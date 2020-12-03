import { connection } from './data/connection'

export async function mySqlSetup(){
    try{
        await connection.raw(`
            CREATE TABLE laproject_users(
                id VARCHAR(80) PRIMARY KEY,
                name VARCHAR(80) NOT NULL,
                nickname VARCHAR(80) NOT NULL,
                email VARCHAR(80) NOT NULL,
                password VARCHAR(80) NOT NULL
            )
       `)

       await connection.raw(`
            CREATE TABLE laproject_images(
                id VARCHAR(80) PRIMARY KEY,
                subtitle VARCHAR(80) NOT NULL,
                author VARCHAR(80) NOT NULL,
                date DATE NOT NULL,
                file VARCHAR(255) NOT NULL,
                tags VARCHAR(80) NOT NULL,
                collection VARCHAR(80) NOT NULL
            )
       
       
       `)
       console.log("MySql create tables successfully")
    }  catch(error){
        console.log(error)
    }
}

mySqlSetup()