import mongoose from "mongoose";

const commentschema = new mongoose.Schema({
    sender:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    message:{
        type:String,
        required:true,
    },
    post:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Blog",
        required:true
    }
},{timestamps:true})

const Comment = mongoose.models.Comment || mongoose.model("Comment",commentschema)
export default Comment