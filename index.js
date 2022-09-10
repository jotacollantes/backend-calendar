const express   = require('express')
const dotenv = require('dotenv')
const { dbConnection } = require('./database/config')
const cors=require('cors')
dotenv.config()
//console.log(process.env)
//*Creamos el servidor
const app =express()

//*Incluimos el middlewate cors con la configuracion por defecto
app.use(cors())

//* Conexion a las DB
dbConnection()


//*************************************MIDDLEWARES**********************************************//

//*Para apuntar al index del directorio public usamos el middleware use
app.use(express.static('public')) //*Especificamos el path
//* Para todo lo que venga en el body que entra al endpoint sea leido como JSON
app.use(express.json())
//********************************************FIN**********************************************//


//* Rutas AUTH: Crear, login, renew
//Especificamos el nombre del endpoit y habilitamos todo lo que se exporte del archivo /routes/auth.js
app.use('/api/auth',require('./routes/auth'))


//*Rutas CRUD
app.use('/api/events',require('./routes/events'))

app.get('*',(req,res))=>{
    res.sendFile(__dirname+'/public/index.html');
}



//*Escuchar peticiones
app.listen(process.env.PORT,()=> {
    console.log(`Corriendo en el puerto: ${process.env.PORT}`)
})