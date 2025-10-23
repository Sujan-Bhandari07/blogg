  const error=(res,message,)=>{

    return res.status(400).json({success:false,message:message})

}
const success=(res,message,data)=>{

    if(data == undefined){
        return res.status(200).json({success:true,message:message})
    }else{

        return res.status(200).json({success:true,message:message,data:data})
    }


}

export  {error,success};
