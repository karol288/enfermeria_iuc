import { Router } from "express";
import { getRoles, insertRol } from "../controllers/roles.controllers.js";
import { asyncHandler } from "../middlewares/errorHandler.js";
import { respuestaOK, respuestaError } from "../lib/responseModels.js";

const routerRoles = Router();

routerRoles.get(
  "/roles",
  asyncHandler(async (req, res) => {
    let rows = await getRoles();
    res.json(respuestaOK(rows));
  })
);

routerRoles.post(
  "/rol",
  asyncHandler(async (req, res) => {
    let { nombre_rol, descripcion_rol } = req.body;
    if (!nombre_rol || !descripcion_rol) {
      return res
        .status(400)
        .json(respuestaError("Campos no diligenciados correctamente."));
    }
    let row = await insertRol(nombre_rol, descripcion_rol);
    res.json(respuestaOK(row));
  })
);

export default routerRoles;
