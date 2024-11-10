import { Router } from "express";
import {
  getVisitas,
  getVisita,
  insertVisita,
  updateVisita,
  deleteVisita,
} from "../controllers/visita.controllers.js";
import { asyncHandler } from "../middlewares/errorHandler.js";
import { respuestaError, respuestaOK } from "../lib/responseModels.js";

const routerVisitas = Router();

routerVisitas.get(
  "/visitas",
  asyncHandler(async (req, res) => {
    const rows = await getVisitas();
    res.json(respuestaOK(rows));
  })
);

routerVisitas.get(
  "/visita/:id",
  asyncHandler(async (req, res) => {
    const idVisita = parseInt(req.params["id"]);
    if (isNaN(idVisita)) {
      return res
        .status(400)
        .json(respuestaError("El campo 'id' no es numérico."));
    }
    const rows = await getVisita(idVisita);
    res.json(respuestaOK(rows));
  })
);

routerVisitas.post(
  "/visita",
  asyncHandler(async (req, res) => {
    const { hora, fecha, motivo_visita, id_estudiante } = req.body;

    if (!hora || !fecha || !motivo_visita || !id_estudiante) {
      return res
        .status(400)
        .json(respuestaError("Todos los campos son obligatorios."));
    }

    try {
      const row = await insertVisita(hora, fecha, motivo_visita, id_estudiante);
      res.json(respuestaOK(row));
    } catch (error) {
      if (error?.name === "Custom error") {
        return res.status(error.statusCode).json(respuestaError(error.message));
      }
      throw error;
    }
  })
);

routerVisitas.put(
  "/visita/:id",
  asyncHandler(async (req, res) => {
    const idVisita = parseInt(req.params["id"]);
    const { hora, fecha, motivo_visita, id_estudiante } = req.body;

    if (isNaN(idVisita)) {
      return res
        .status(400)
        .json(respuestaError("El campo 'id' no es numérico."));
    }

    if (!hora || !fecha || !motivo_visita || !id_estudiante) {
      return res
        .status(400)
        .json(respuestaError("Todos los campos son obligatorios."));
    }

    try {
      const row = await updateVisita(
        idVisita,
        hora,
        fecha,
        motivo_visita,
        id_estudiante
      );
      res.json(respuestaOK("Update OK"));
    } catch (error) {
      if (error?.name === "Custom error") {
        return res.status(error.statusCode).json(respuestaError(error.message));
      }
      throw error;
    }
  })
);

routerVisitas.delete(
  "/visita/:id",
  asyncHandler(async (req, res) => {
    const idVisita = parseInt(req.params["id"]);
    if (isNaN(idVisita)) {
      return res
        .status(400)
        .json(respuestaError("El campo 'id' no es numérico."));
    }

    const result = await deleteVisita(idVisita);
    res.json(respuestaOK("Delete OK"));
  })
);

export default routerVisitas;
