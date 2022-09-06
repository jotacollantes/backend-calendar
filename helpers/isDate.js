const moment = require('moment');
const isDate=(value) =>{
    //console.log(value)
    if(!value)
    {
        return false
    }
    //Para validar la fecha usamos el paquete moment
    const fecha=moment(value)
    if(fecha.isValid())
    {
        return true
    }
    else
    {
        return false
    }

}
module.exports={isDate}