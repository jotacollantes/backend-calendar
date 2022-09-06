const {request,response}  = require('express')
const Evento = require('../models/Evento')


const listarEventos=async(req=request,res=response) =>{
    
        try {
             const eventos =await Evento.find({})
                                        .populate('user','name')//* Mostrar el campo name que esta en la coleccion de usuarios gracias a la referencia que se especifico en el modelo Evento   

            return res.status(200).json({
                ok: true,
                eventos
            })
        } catch (error) {
            console.log(error)
            return res.status(500).json({
                ok: false,
                msg: 'Error al consultar los eventos'
            })
        }
}

const crearEvento=async(req,res=response) =>{
    //console.log(req.body)
    //console.log(req.uid)
    const evento= new Evento(req.body)

    try {
        //*Para Grabar el ID del usuario lo obtenemos de req.uid de la request  y dicho valor los asignamos al campo user dela instancia del modelo evento
        evento.user=req.uid
        const eventSaved= await evento.save()
        
        return res.status(201).json({
            ok: true,
            eventSaved
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            ok: false,
            msg: 'Error al grabar'
        })
    }
    
    
    

}


const actualizarEvento=async(req=request,res=response) =>{
    //console.log(req.params.id)
    const eventId=req.params.id
    const uid=req.uid
    //console.log('Event id:',eventId)
    
    try {

        //*Validamos que el evento exista
        const evento = await Evento.findById(eventId)
        //const evento = await Evento.findOne({_id : eventId})
        //console.log(evento)
        
        if(!evento){
            return  res.status(400).json({
                ok: false,
                msg: 'Evento no existe',
            })
        }
        if(evento.user.toString() !==uid)
        {
            return  res.status(401).json({
            ok: false,
            msg: "El evento consultado no le pertenece"})
        }
        
        //* En este punto el evento existe y el usuario es el propietario del evento
        
        //*Creamos el nuevo evento con lo que viene en el req.body (que es la informacion del usuario) + uid ya que en el body el uid no esta incluido
        const nuevoEvento={
            //*propagamos el req.body
            ...req.body,
            user :uid
        }
        //console.log({nuevoEvento})
        //*Se especifica como 3er argumento en el metodo findByIdAndUpdate() para que este devuelva el vento actualizado y se lo pueda enviar como respuesta en el res.json
        const eventoActualizado= await Evento.findByIdAndUpdate(eventId,nuevoEvento,{new : true})

        return  res.status(201).json({
            ok: true,
            eventoActualizado})


       
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({
        ok: false,
        msg: 'Comuniquese con el administrador',
        
    })
    }
}

const borrarEvento=async(req=request,res=response) =>{
    //console.log(req.params.id)
    const eventId=req.params.id
    const uid=req.uid
    //console.log('Event id:',eventId)
    
    try {

        //*Validamos que el evento exista
        const evento = await Evento.findById(eventId)
        //const evento = await Evento.findOne({_id : eventId})
        //console.log(evento)
        
        if(!evento){
            return  res.status(400).json({
                ok: false,
                msg: 'Evento no existe',
            })
        }
        if(evento.user.toString() !==uid)
        {
            return  res.status(401).json({
            ok: false,
            msg: "El evento que desea eliminar no le pertenece"})
        }
        
        //* En este punto el evento existe y el usuario es el propietario del evento
        
        
        //console.log({nuevoEvento})
        //*Se especifica como 3er argumento en el metodo findByIdAndUpdate() para que este devuelva el vento actualizado y se lo pueda enviar como respuesta en el res.json
        const eventoEliminado= await Evento.findByIdAndDelete(eventId)

        return  res.status(201).json({
            ok: true,
            eventoEliminado})


       
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({
        ok: false,
        msg: 'Comuniquese con el administrador',
        
    })
    }
}



module.exports={
    listarEventos,
    crearEvento,
    actualizarEvento,
    borrarEvento
}