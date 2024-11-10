import { Router } from "express";
import { login, register } from "../controllers/usuarios.controllers.js";
import { generateJWT, TokenValidation } from "../middlewares/Token.js";
import { asyncHandler, errorHandler } from "../middlewares/errorHandler.js";
import { RoleValidation } from "../middlewares/roleValidation.js";
import { ID_ROL_ADMIN } from "../lib/constants.js";
import { respuestaOK, respuestaError } from "../lib/responseModels.js";
const routerUsuarios = Router();

routerUsuarios.post(
  "/login",
  asyncHandler(async (req, res) => {
    let { usuario, pass } = req.body;
    let rows = await login(usuario, pass);
    if (rows?.length === 0) {
      return res
        .status(400)
        .json(respuestaError("Usuario o contraseña son incorrectos"));
    }
    let token = generateJWT(rows[0].id_usuarios, rows[0].id_rol); //Obtener Json web token (JWT)
    res.json({ token: token });
  })
);

routerUsuarios.post(
  "/register",
  TokenValidation,
  RoleValidation(ID_ROL_ADMIN),
  asyncHandler(async (req, res) => {
    let { usuario, pass, rol } = req.body;
    let registered = await register(usuario, pass, rol);
    if (!registered) {
      res.status(409).json(respuestaError("Usuario ya registrado"));
    } else {
      res.json(respuestaOK("Usuario registrado con éxito"));
    }
  })
);

export default routerUsuarios;
