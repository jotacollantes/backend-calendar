/*
Rutas de usuario
host + /api/auth
*/
const { Router }= require('express')
const {check}=require('express-validator')
const {crearUsuario, loginUsuario, revalidarToken }= require('../controllers/auth')
const { fieldsValidators } = require('../middlewares/fieldsValidators')
const {jwtValidator} = require('../middlewares/jwtValidator')

const router=Router()



router.post(
    "/new",
    [
    //para el check se tiene que especificar el campo a verificar, el mensaje en caso de error y la condicion que se debe de cumplir    
    check('name','El nombres es obligatorio').not().isEmpty(),
    check('email','El correo es obligatorio').isEmail(),
    check('password','El password debe de ser minimo 6 caracteres').isLength({min: 6}),fieldsValidators
],
    crearUsuario)

router.post(
    "/",
    [
    //para el check se tiene que especificar el campo a verificar, el mensaje en caso de error y la condicion que se debe de cumplir    
    check('email','El correo es obligatorio').isEmail(),
    //check('password','El password debe de ser minimo 6 caracteres').isLength({min: 6}),
    fieldsValidators
    ],
    loginUsuario)

router.get("/renew",[jwtValidator],revalidarToken)

module.exports= router