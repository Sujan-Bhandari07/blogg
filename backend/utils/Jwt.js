import jwt from "jsonwebtoken"

const gettoken = (id)=>{
const token = jwt.sign({_id:id},process.env.JWT,{
    expiresIn:"7d"
})
return token

}

export default gettoken