import { connection } from './data/connection'

async function createTables(){
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
       console.log("MySql create tables successfully")
    }  catch(error){
        console.log(error)
    }
}

createTables()