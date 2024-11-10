import { Router } from "express";
import {
  getAutorizacion,
  getAutorizaciones,
  insertAutorizacion,
  updateAutorizacion,
  deleteAutorizacion,
} from "../controllers/autorizacion.controllers.js";
import { errorHandler, asyncHandler } from "../middlewares/errorHandler.js";
import { respuestaError, respuestaOK } from "../lib/responseModels.js";

const routerAutorizacion = Router();

routerAutorizacion.get(
  "/autorizaciones",
  asyncHandler(async (req, res) => {
    let rows = await getAutorizaciones();
    res.json(respuestaOK(rows));
  })
);

routerAutorizacion.get(
  "/autorizacion/:id",
  asyncHandler(async (req, res) => {
    let idAutorizacion = parseInt(req.params["id"]);
    if (isNaN(idAutorizacion)) {
      return res
        .status(400)
        .json(respuestaError("El campo 'id' no es numérico."));
    }
    let rows = await getAutorizacion(idAutorizacion);
    res.json(respuestaOK(rows));
  })
);

routerAutorizacion.post(
  "/autorizacion",
  asyncHandler(async (req, res) => {
    const { detallesAutorizacion, idEstudiante, idTutor, idMedicamentoDado } =
      req.body;

    if (
      !detallesAutorizacion ||
      !idEstudiante ||
      !idTutor ||
      !idMedicamentoDado
    ) {
      return res
        .status(400)
        .json(respuestaError("Todos los campos son obligatorios."));
    }

    try {
      let row = await insertAutorizacion(
        detallesAutorizacion,
        idEstudiante,
        idTutor,
        idMedicamentoDado
      );
      res.json(respuestaOK(row));
    } catch (error) {
      errorHandler({ status: 500, message: error.message }, req, res);
    }
  })
);

routerAutorizacion.put(
  "/autorizacion/:id",
  asyncHandler(async (req, res) => {
    let idAutorizacion = parseInt(req.params["id"]);
    const { detallesAutorizacion, idEstudiante, idTutor, idMedicamentoDado } =
      req.body;

    if (isNaN(idAutorizacion)) {
      return res
        .status(400)
        .json(respuestaError("El campo 'id' no es numérico."));
    }

    if (
      !detallesAutorizacion ||
      !idEstudiante ||
      !idTutor ||
      !idMedicamentoDado
    ) {
      return res
        .status(400)
        .json(respuestaError("Todos los campos son obligatorios."));
    }

    try {
      let row = await updateAutorizacion(
        idAutorizacion,
        detallesAutorizacion,
        idEstudiante,
        idTutor,
        idMedicamentoDado
      );
      res.json(respuestaOK("Update OK"));
    } catch (error) {
      errorHandler({ status: 500, message: error.message }, req, res);
    }
  })
);

routerAutorizacion.delete(
  "/autorizacion/:id",
  asyncHandler(async (req, res) => {
    let idAutorizacion = parseInt(req.params["id"]);
    if (isNaN(idAutorizacion)) {
      return res
        .status(400)
        .json(respuestaError("El campo 'id' no es numérico."));
    }

    await deleteAutorizacion(idAutorizacion);
    res.json(respuestaOK("Delete OK"));
  })
);

export default routerAutorizacion;
