//*Para tener el intelligence volvemos a importar EXPRESS
const {request,response}   = require('express')
const Usuario = require('../models/Usuario')
const bcrypt = require('bcryptjs')
const { generaJwt } = require('../helpers/jwt')


const crearUsuario=async(req=request,res=response)=> {
    const {name,email,password} =req.body
  
   try {

    let usuario= await Usuario.findOne({email: email})
    //console.log(usuario)
    if(usuario){
        return res.status(400).json({
            ok:false,
            msg: `El usuario con el email ${email} ya existe en DB`,
            
        })
    }

    //* Sobreescribimos la variable usuario porque esta declarada con let
    usuario = new Usuario(req.body)

    const salt =bcrypt.genSaltSync()
    usuario.password=bcrypt.hashSync(password,salt)

    await usuario.save()

    //*Generamos el JWT, tiene que ser despues del save() porque se va a necesitar el usuario._id
    const token=await generaJwt(usuario.id,usuario.name)
    
    return res.status(201).json({
        ok:true,
        //msg: "registro",
        uid: usuario.id,
        name: usuario.name,
        //email: usuario.email,
        //password: usuario.password
        token:token

    })
   } catch (error) {
    return res.status(500).json({
        ok:false,
        msg: "Comuniquese con el administrador",
        
    })
   }
    
    
}
const loginUsuario=async(req,res=response)=> {
    
    const {email,password} =req.body

     try {
 
     const usuario= await Usuario.findOne({email: email})
     
        if(!usuario){
            return res.status(400).json({
                ok:false,
                msg: "Password o contraseña no son validas",
                
            })
        }
 
    const validatePassword =bcrypt.compareSync(password,usuario.password)//* Devuelve true o false
        if (!validatePassword)
        {
            return res.status(400).json({
                ok:false,
                msg: "Contraseña es invalida",
                })
        }
        
        //console.log('id: ',usuario.id)
        const token=await generaJwt(usuario._id,usuario.name)
        return res.status(201).json({
            ok:true,
            uid: usuario.id,
            name: usuario.name,
            token: token
            })
    }
    catch (error) {
     return res.status(500).json({
         ok:false,
         msg: "Comuniquese con el administrador",
         
     })
    }
}

const revalidarToken=async(req,res=response)=> {

     const {uid,name}=req
    //*Generamos un nuevo token:
    const token=await generaJwt(uid,name)
    return res.json({
        ok:true,
        uid,
        name,
        token
    })
}

module.exports={
    crearUsuario:crearUsuario,
    loginUsuario:loginUsuario,
    revalidarToken:revalidarToken
}