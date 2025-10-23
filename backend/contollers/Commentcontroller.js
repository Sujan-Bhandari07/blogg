import Blog from "../models/Blogmodel.js"
import Comment from "../models/Commentmodel.js"
import { error, success } from "../utils/Response.js"

const sendcomment = async(req,res)=>{
    const{_id}=req.user
    const{blogid,message}= req.body
    try {
        if(!blogid || !message ){
            return error(res,"Provide comment")
        }
        const comment = await Comment.create({
            sender:_id,message:message,post:blogid
        })
        if(!comment){
            return error(res,"failed to comment")
        }
        const blog=await Blog.findOne({_id:blogid})
        if(!blog){
            return error(res,"No blog found")
        }
        blog.comments.push(comment._id)
        await blog.save()
        return success(res,"Commented")

    } catch (err) {
        return error(res,err.message)
    }

}

export {sendcomment}