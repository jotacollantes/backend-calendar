/*
Rutas de Eventos
host + /api/events
*/
const { Router }= require('express')
const {check}=require('express-validator')
const {listarEventos,crearEvento,actualizarEvento,borrarEvento }= require('../controllers/events')
const { isDate } = require('../helpers/isDate')
const { fieldsValidators } = require('../middlewares/fieldsValidators')
const {jwtValidator} = require('../middlewares/jwtValidator')

const router=Router()
//*Listar Eventos

router.get('/',[jwtValidator],listarEventos)
//*Crear Evento
router.post('/',[
    check('title','El titulo Es obligatorio').not().isEmpty(),
    //En el Metodo custom () enviamos un callback
    check('start','La fecha es obligatoria').custom(isDate),
    check('end','La fecha de finalizacion es obligatoria').custom(isDate),
    fieldsValidators,
    jwtValidator
],crearEvento)
//*Actualizar Evento
router.put('/:id',[jwtValidator],actualizarEvento)
//*Borrar Evento
router.delete('/:id',[jwtValidator],borrarEvento)
module.exports=router