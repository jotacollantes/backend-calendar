//*Para tener el intelligence volvemos a importar EXPRESS
const {response}   = require('express')
//*Para poder obtener los mensajes de error en caso de que express-validator los haya capturado en el proceso de validacion del middleware
const {validationResult}=require('express-validator')

const fieldsValidators=(req,res=response,next)=> {
    const errors=validationResult(req)
    if(!errors.isEmpty())
    {
        return res.status(400).json({
            ok:false,
            errors: errors.mapped()
        })
    }

next()
}
module.exports={
    fieldsValidators:fieldsValidators
}