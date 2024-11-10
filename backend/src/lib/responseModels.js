export const respuestaOK = (mensaje)=>{
    return {
        success: true,
        message: mensaje
    }
}

export const respuestaError = (mensaje)=>{
    return {
        success: false,
        message: mensaje
    }
}