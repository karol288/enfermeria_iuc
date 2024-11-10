import { errorHandler } from "./errorHandler.js";

export const RoleValidation = (requiredRole) => {
    return (req, res, next) => {
        if (req.id_rol !== requiredRole) {
            errorHandler({statusCode: 403, message:'Acceso denegado. Rol insuficiente.'},req, res);
            return
        }
        next();
    };
};