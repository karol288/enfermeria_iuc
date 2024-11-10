import { Router } from "express";
import {
  getTutores,
  getTutor,
  insertTutor,
  updateTutor,
  deleteTutor,
} from "../controllers/tutor.controllers.js";
import { asyncHandler } from "../middlewares/errorHandler.js";
import { respuestaError, respuestaOK } from "../lib/responseModels.js";

const routerTutores = Router();

routerTutores.get(
  "/tutores",
  asyncHandler(async (req, res) => {
    const rows = await getTutores();
    res.json(respuestaOK(rows));
  })
);

routerTutores.get(
  "/tutor/:id",
  asyncHandler(async (req, res) => {
    const idTutor = parseInt(req.params["id"]);
    if (isNaN(idTutor)) {
      return res
        .status(400)
        .json(respuestaError("El campo 'id' no es numérico."));
    }
    const rows = await getTutor(idTutor);
    res.json(respuestaOK(rows));
  })
);

routerTutores.post(
  "/tutor",
  asyncHandler(async (req, res) => {
    const { nombre, apellido, relacionEstudiante, correo, telefono } = req.body;
    if (!nombre || !apellido || !correo || !telefono) {
      return res
        .status(400)
        .json(
          respuestaError(
            "Los campos 'nombre', 'apellido', 'correo' y 'telefono' son obligatorios."
          )
        );
    }
    const row = await insertTutor(
      nombre,
      apellido,
      relacionEstudiante,
      correo,
      telefono
    );
    res.json(respuestaOK(row));
  })
);

routerTutores.put(
  "/tutor/:id",
  asyncHandler(async (req, res) => {
    const idTutor = parseInt(req.params["id"]);
    const { nombre, apellido, relacionEstudiante, correo, telefono } = req.body;

    if (isNaN(idTutor)) {
      return res
        .status(400)
        .json(respuestaError("El campo 'id' no es numérico."));
    }
    if (!nombre || !apellido || !correo || !telefono) {
      return res
        .status(400)
        .json(
          respuestaError(
            "Los campos 'nombre', 'apellido', 'correo' y 'telefono' son obligatorios."
          )
        );
    }
    const row = await updateTutor(
      idTutor,
      nombre,
      apellido,
      relacionEstudiante,
      correo,
      telefono
    );
    res.json(respuestaOK("Update OK"));
  })
);

routerTutores.delete(
  "/tutor/:id",
  asyncHandler(async (req, res) => {
    const idTutor = parseInt(req.params["id"]);
    if (isNaN(idTutor)) {
      return res
        .status(400)
        .json(respuestaError("El campo 'id' no es numérico."));
    }
    await deleteTutor(idTutor);
    res.json(respuestaOK("Delete OK"));
  })
);

export default routerTutores;
