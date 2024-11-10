import { Router } from "express";
import {
  getAlergias,
  getAlergia,
  insertAlergia,
  updateAlergia,
  deleteAlergia,
} from "../controllers/alergias.controllers.js";
import { errorHandler, asyncHandler } from "../middlewares/errorHandler.js";
import { respuestaError, respuestaOK } from "../lib/responseModels.js";

const routerAlergia = Router();

routerAlergia.get(
  "/alergias",
  asyncHandler(async (req, res) => {
    let rows = await getAlergias();
    res.json(respuestaOK(rows));
  })
);

routerAlergia.get(
  "/alergia/:id",
  asyncHandler(async (req, res) => {
    let idAlergia = parseInt(req.params["id"]);
    if (isNaN(idAlergia)) {
      return res
        .status(400)
        .json(respuestaError("El campo 'id' no es numérico."));
    }
    let rows = await getAlergia(idAlergia);
    res.json(respuestaOK(rows));
  })
);

routerAlergia.post(
  "/alergia",
  asyncHandler(async (req, res) => {
    const { alergias_medicamentos, id_estudiante } = req.body;

    if (!alergias_medicamentos || !id_estudiante) {
      return res
        .status(400)
        .json(respuestaError("Todos los campos son obligatorios."));
    }

    try {
      let row = await insertAlergia(alergias_medicamentos, id_estudiante);
      res.json(respuestaOK(row));
    } catch (error) {
      errorHandler({ status: 500, message: error.message }, req, res);
    }
  })
);

routerAlergia.put(
  "/alergia/:id",
  asyncHandler(async (req, res) => {
    let idAlergia = parseInt(req.params["id"]);
    const { alergias_medicamentos, id_estudiante } = req.body;

    if (isNaN(idAlergia)) {
      return res
        .status(400)
        .json(respuestaError("El campo 'id' no es numérico."));
    }

    if (!alergias_medicamentos || !id_estudiante) {
      return res
        .status(400)
        .json(respuestaError("Todos los campos son obligatorios."));
    }

    try {
      let row = await updateAlergia(
        idAlergia,
        alergias_medicamentos,
        id_estudiante
      );
      res.json(respuestaOK("Update OK"));
    } catch (error) {
      errorHandler({ status: 500, message: error.message }, req, res);
    }
  })
);

routerAlergia.delete(
  "/alergia/:id",
  asyncHandler(async (req, res) => {
    let idAlergia = parseInt(req.params["id"]);
    if (isNaN(idAlergia)) {
      return res
        .status(400)
        .json(respuestaError("El campo 'id' no es numérico."));
    }

    await deleteAlergia(idAlergia);
    res.json(respuestaOK("Delete OK"));
  })
);

export default routerAlergia;
