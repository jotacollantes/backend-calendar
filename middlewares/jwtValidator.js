const {request,response}=require("express")
const jwt= require('jsonwebtoken')

const jwtValidator=(req=request,res=response,next)=>{
    const token=req.header('x-token')
    //console.log(token)
    if(!token){
        return res.status(401).json({
            ok:false,
            msg: "No hay token en el header"
        })
    }

    try {
        //*Desestructuramos el payload
        const {uid,name}=jwt.verify(token,process.env.SECRET_JWT_SEED)
        //console.log(payload)
        //*Modificamos el req asignandole el uid y el name y este podra ser usado en el controlador revalidarToken() como referencia 
        req.uid=uid
        req.name=name
    } catch (error) {
        console.log(error)
        return res.status(401).json({
            ok:false,
            msg: "Token no valido"
        })
    }

    next()

}

module.exports={
    jwtValidator:jwtValidator
}