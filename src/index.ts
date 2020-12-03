import express, { Express } from "express"
import cors from "cors"
import signUpUser from "./controller/signUpUser"
import login from "./controller/login"
import createImage from "./controller/createImage"
import searchImgById from "./controller/searchImgById"
import searchAllImg from "./controller/searchAllImg"


const app: Express = express()
app.use(express.json())
app.use(cors())

app.post('/users/signup', signUpUser )
app.post('/users/login', login)
app.post('/image/create', createImage )

app.get('/image/:id', searchImgById)
app.get('/all', searchAllImg)






app.listen(3003, () => {
    console.log("Server running on port 3003")
} )