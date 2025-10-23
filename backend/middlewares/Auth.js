import jwt from "jsonwebtoken"
import { error } from "../utils/Response.js"

const checkauth = async(req,res,next)=>{
    const token = req.cookies?.token
    console.log(token)
try {
    if(!token)return error(res,"Authentication failed")
const decoded = jwt.verify(token,process.env.JWT)

    if(!decoded)return error(res,"Authentication failed")
req.user=decoded
    next()

} catch (error) {
    return error(res,error.message)
}

}

export default checkauth