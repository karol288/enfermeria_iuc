export const errorHandler = (err, req, res, next) => {
    if (err.stack)
        console.error(err.stack); // Imprime el error en la consola para depuración  
    else
        console.error(err)
    // Establece un código de estado dependiendo del tipo de error
    const statusCode = err.statusCode || 500;
    const environment = process.env.NODE_ENV || 'production';

    // Envía la respuesta de error al cliente
    res.status(statusCode).json({
        success: false,
        message: statusCode >= 500 && statusCode <= 599 ? 
                 (environment === 'development' ? err.message : 'Internal Server Error') 
                 : err.message,
        stack: environment === 'development' && statusCode >= 500 ? err.stack : null // No mostrar stack en producción
      });
      
};

export const asyncHandler = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
};

export class DatabaseError extends Error {
    constructor(statusCode, message) {
        super(message)
        this.name = this.constructor.name;
        this.statusCode = statusCode;
    }
}