import { Router } from "express";
import {
  getHistoriales,
  getHistorial,
  insertHistorial,
  updateHistorial,
  deleteHistorial,
} from "../controllers/historial.controllers.js";
import { errorHandler, asyncHandler } from "../middlewares/errorHandler.js";
import { respuestaError, respuestaOK } from "../lib/responseModels.js";

const routerHistorial = Router();

// Ruta para obtener todos los historiales
routerHistorial.get(
  "/historiales",
  asyncHandler(async (req, res) => {
    let rows = await getHistoriales();
    res.json(respuestaOK(rows));
  })
);

// Ruta para obtener un historial por ID
routerHistorial.get(
  "/historial/:id",
  asyncHandler(async (req, res) => {
    let idHistorial = parseInt(req.params["id"]);
    if (isNaN(idHistorial)) {
      return res
        .status(400)
        .json(respuestaError("El campo 'id' no es numérico."));
    }
    let rows = await getHistorial(idHistorial);
    res.json(respuestaOK(rows));
  })
);

// Ruta para insertar un nuevo historial
routerHistorial.post(
  "/historial",
  asyncHandler(async (req, res) => {
    const { idEstudiante, idDiagnostico } = req.body;

    // Validación de campos obligatorios
    if (!idEstudiante || !idDiagnostico) {
      return res
        .status(400)
        .json(respuestaError("Todos los campos son obligatorios."));
    }

    try {
      let row = await insertHistorial(idEstudiante, idDiagnostico);
      res.json(respuestaOK(row));
    } catch (error) {
      if (error?.name === "Custom error")
        return res.status(error.statusCode).json(respuestaError(error.message));
      else errorHandler({ status: 500, message: error.message }, req, res);
    }
  })
);

// Ruta para actualizar un historial por ID
routerHistorial.put(
  "/historial/:id",
  asyncHandler(async (req, res) => {
    let idHistorial = parseInt(req.params["id"]);
    const { idEstudiante, idDiagnostico } = req.body;

    if (isNaN(idHistorial)) {
      return res
        .status(400)
        .json(respuestaError("El campo 'id' no es numérico."));
    }

    if (!idEstudiante || !idDiagnostico) {
      return res
        .status(400)
        .json(respuestaError("Todos los campos son obligatorios."));
    }

    try {
      let row = await updateHistorial(idHistorial, idEstudiante, idDiagnostico);
      res.json(respuestaOK("Update OK"));
    } catch (error) {
      if (error?.name === "Custom error")
        return res.status(error.statusCode).json(respuestaError(error.message));
      else errorHandler({ status: 500, message: error.message }, req, res);
    }
  })
);

// Ruta para eliminar un historial por ID
routerHistorial.delete(
  "/historial/:id",
  asyncHandler(async (req, res) => {
    let idHistorial = parseInt(req.params["id"]);
    if (isNaN(idHistorial)) {
      return res
        .status(400)
        .json(respuestaError("El campo 'id' no es numérico."));
    }

    await deleteHistorial(idHistorial);
    res.json(respuestaOK("Delete OK"));
  })
);

export default routerHistorial;
