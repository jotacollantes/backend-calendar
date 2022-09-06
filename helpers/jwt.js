const jwt= require('jsonwebtoken')

const generaJwt=(uid,name)=>{

    return new Promise((resolve,reject) =>{
        const payload={ uid: uid, name: name}
        //* jwt.sing necesita el payload, el secretkey, las opciones del token y un callback que retornara el reject con el mensaje de errory o el resolve con el token
        jwt.sign(payload,process.env.SECRET_JWT_SEED,{expiresIn: '2h'},
        (err,token)=>{
            if(err) {
                console.log(err)
                return reject('No se pudo generar el token')
            }
            return resolve(token)
        })
    })
}

module.exports={
    generaJwt:generaJwt
}