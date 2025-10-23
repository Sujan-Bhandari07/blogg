import express from "express"
import checkauth from "../middlewares/Auth.js"
import { sendcomment } from "../contollers/Commentcontroller.js"

const commentrouter = express.Router()

commentrouter.post("/sendcomment",checkauth,sendcomment)


export default commentrouter