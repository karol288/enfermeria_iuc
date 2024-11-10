import jwt from 'jsonwebtoken'
import { respuestaError } from '../lib/responseModels.js';

export const TokenValidation = (req, res, next) => {
    try {
        const token = req.header('token');
        if (!token) 
            return res.status(401).json(respuestaError("Acceso denegado por falta de Token"));
        const payload = jwt.verify(token, process.env['TOKEN_SECRET'] || '');        
        req.id_Usuario = payload.id_Usuario;
        req.id_rol = payload.id_rol
        next();
    } catch (e) {
        if (e?.name == "JsonWebTokenError")
            return res.status(400).json(respuestaError("Token invalido"));
        else if (e?.name == "TokenExpiredError")
            return res.status(400).json(respuestaError("Token vencido"));
        else{
            throw e
        }
    }
}

export const generateJWT = (id_Usuario, id_rol) =>{
    const user = { id_Usuario, id_rol}
    const jwt_res = jwt.sign(user, process.env.TOKEN_SECRET, { expiresIn: process.env["MAX_TIMEOUT_TOKEN"]})
    return jwt_res
}