import { Router } from "express";
import {
  getDiagnostico,
  getDiagnosticos,
  insertDiagnostico,
  updateDiagnostico,
  deleteDiagnostico,
} from "../controllers/diagnostico.controllers.js";
import { errorHandler, asyncHandler } from "../middlewares/errorHandler.js";
import { respuestaError, respuestaOK } from "../lib/responseModels.js";

const routerDiagnostico = Router();

routerDiagnostico.get(
  "/diagnosticos",
  asyncHandler(async (req, res) => {
    let rows = await getDiagnosticos();
    res.json(respuestaOK(rows));
  })
);

routerDiagnostico.get(
  "/diagnostico/:id",
  asyncHandler(async (req, res) => {
    let idDiagnostico = parseInt(req.params["id"]);
    if (isNaN(idDiagnostico)) {
      return res
        .status(400)
        .json(respuestaError("El campo 'id' no es numérico."));
    }
    let rows = await getDiagnostico(idDiagnostico);
    res.json(respuestaOK(rows));
  })
);

routerDiagnostico.post(
  "/diagnostico",
  asyncHandler(async (req, res) => {
    const { salida_institucion, mejoramiendo, id_estudiante, id_visita } =
      req.body;

    if (!salida_institucion || !mejoramiendo || !id_estudiante || !id_visita) {
      return res
        .status(400)
        .json(respuestaError("Todos los campos son obligatorios."));
    }

    try {
      let row = await insertDiagnostico(
        salida_institucion,
        mejoramiendo,
        id_estudiante,
        id_visita
      );
      res.json(respuestaOK(row));
    } catch (error) {
      if (error?.name == "Custom error")
        return res.status(error.statusCode).json(respuestaError(error.message));
      else errorHandler({ status: 500, message: error.message }, req, res);
    }
  })
);

routerDiagnostico.put(
  "/diagnostico/:id",
  asyncHandler(async (req, res) => {
    let idDiagnostico = parseInt(req.params["id"]);
    const { salida_institucion, mejoramiendo, id_estudiante, id_visita } =
      req.body;

    if (isNaN(idDiagnostico)) {
      return res
        .status(400)
        .json(respuestaError("El campo 'id' no es numérico."));
    }

    if (!salida_institucion || !mejoramiendo || !id_estudiante || !id_visita) {
      return res
        .status(400)
        .json(respuestaError("Todos los campos son obligatorios."));
    }
    try {
      let row = await updateDiagnostico(
        idDiagnostico,
        salida_institucion,
        mejoramiendo,
        id_estudiante,
        id_visita
      );
      res.json(respuestaOK("Update OK"));
    } catch (error) {
      if (error?.name == "Custom error")
        return res.status(error.statusCode).json(respuestaError(error.message));
      else errorHandler({ status: 500, message: error.message }, req, res);
    }
  })
);

routerDiagnostico.delete(
  "/diagnostico/:id",
  asyncHandler(async (req, res) => {
    let idDiagnostico = parseInt(req.params["id"]);
    if (isNaN(idDiagnostico)) {
      return res
        .status(400)
        .json(respuestaError("El campo 'id' no es numérico."));
    }

    await deleteDiagnostico(idDiagnostico);
    res.json(respuestaOK("Delete OK"));
  })
);

export default routerDiagnostico;
