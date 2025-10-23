import express from "express"
import checkauth from "../middlewares/Auth.js"
import upload from "../middlewares/Multer.js"
import { blogbyid, createblog, getallblog, listownblog, postblog } from "../contollers/Blogcontroller.js"

const blogrouter = express.Router()


blogrouter.post("/createblog",checkauth,upload.fields([{name:"image",maxCount:1}]),createblog)
blogrouter.post("/postblog",checkauth,postblog)
blogrouter.get("/getallblog",checkauth,getallblog)
blogrouter.post("/getblogbyid/",checkauth,blogbyid)
blogrouter.get("/getownblog",checkauth,listownblog)

export default blogrouter