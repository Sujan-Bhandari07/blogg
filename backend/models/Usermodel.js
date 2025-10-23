import mongoose from "mongoose";

const userschema = new mongoose.Schema({
fullname:{
    type:String,
    required:true,
    
},
username:{
    type:String,
    required:true,
    unique:true
},
email:{
    type:String,
    required:true,
    unique:true
},
password:{
    type:String,
    required:true,

},
bio:{
    type:String,
default:""

},
profilepic:{
    type:String,
    required:true,

},
coverpic:{
    type:String,
    required:true,

},


verifyotp:{
    type:String,
    // required:true,
    default:""

    
},

verifyotpexp:{
    type:Number,
    // required:true,
    default:0
},
isverified:{
type:Boolean,
default:false
},

resetotp:{
    type:String,
    // required:true,
    default:""
},
resetotpexp:{
    type:Number,
    // required:true,
    default:0
},


// blogs:[{
//     type:mongoose.Schema.Types.ObjectId,
//     ref:"Blog"
// }]

},{timestamps:true})


const User=mongoose.models.User || mongoose.model("User",userschema)
export default User