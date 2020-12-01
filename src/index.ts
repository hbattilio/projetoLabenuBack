import express, { Express } from "express"
import cors from "cors"
import signUpUser from "./controller/signUpUser"
import login from "./controller/login"


const app: Express = express()
app.use(express.json())
app.use(cors())

app.post('/users/signup', signUpUser )
app.post('/users/login', login)







app.listen(3003, () => {
    console.log("Server running on port 3003")
} )