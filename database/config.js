const mongoose = require('mongoose');

const dbConnection = async()=> {

    try {
        await mongoose.connect(process.env.DB_CNN);
        console.log(`DB Online ${process.env.DB_NAME}`)
    } catch (error) {
        console.log(error)
        throw new Error('Error al inicializar DB')
        
    }

}

module.exports ={
    dbConnection:dbConnection
}