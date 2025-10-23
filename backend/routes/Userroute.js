import express from "express"
import { checkresetotp, checkverifyotp, getuser, login, logout, register, sendresetotp, sendverifyotp, updateprofile } from "../contollers/Usercontroller.js"
import upload from "../middlewares/Multer.js"
import checkauth from "../middlewares/Auth.js"



const userrouter= express.Router()


userrouter.post("/register",register)
userrouter.post("/login",login)
userrouter.post("/logout",checkauth,logout)
userrouter.get("/getuser",checkauth,getuser)
userrouter.post("/sendverifyotp",checkauth,sendverifyotp)
userrouter.post("/sendresetotp",sendresetotp)
userrouter.post("/checkverifyotp",checkauth,checkverifyotp)
userrouter.post("/checkresetotp",checkresetotp)
userrouter.post("/updateprofile",checkauth,upload.fields([{name:"profilepic",maxCount:1},{name:"coverpic",maxCount:1}]),updateprofile)



export default userrouter