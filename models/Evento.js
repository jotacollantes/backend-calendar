const {Schema,model} = require('mongoose');

const EventoSchema =Schema({
    title : {
        type: String,
        required: true
    },
    notes : {
        type: String,
    },
    start : {
        type: Date,
        required: true
    },
    end : {
        type: Date,
        required: true
    },
    user: {
        //*El tipo de dato para user es el id generado por mongo al momento de grabar el registro, haciendo referencia al schema Usuario
        type : Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    }


})
//*Para transformar el nombre del campo _id a id y no mostrar __v en los resultados devueltos en la peticion como por ejemplo cuando vemos los resultados en el postman. Esto no afecta a como se graban los datos en mongo
EventoSchema.method('toJSON', function () {
    const {__v,_id,...rest}=this.toObject()
    //*Rompemos la referencia mutando el objeto a rest que no incluyen __v ni _id y le añadimos el campo id con el valor _i que obtuvimos de la destruccturacion
    rest.id=_id
    return rest
})


//*Exportacion por defecto
module.exports =model('Evento',EventoSchema)