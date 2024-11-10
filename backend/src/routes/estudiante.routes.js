import { Router } from "express";
import {
  getEstudiantes,
  getEstudiante,
  insertEstudiante,
  updateEstudiante,
  deleteEstudiante,
} from "../controllers/estudiante.controllers.js";
import { asyncHandler } from "../middlewares/errorHandler.js";
import { respuestaError, respuestaOK } from "../lib/responseModels.js";

const routerEstudiantes = Router();

routerEstudiantes.get(
  "/estudiantes",
  asyncHandler(async (req, res) => {
    let rows = await getEstudiantes();
    res.json(respuestaOK(rows));
  })
);

routerEstudiantes.get(
  "/estudiante/:id",
  asyncHandler(async (req, res) => {
    let idEstudiante = parseInt(req.params["id"]);
    if (isNaN(idEstudiante)) {
      return res
        .status(400)
        .json(respuestaError("El campo 'id' no es numérico."));
    }
    let rows = await getEstudiante(idEstudiante);
    res.json(respuestaOK(rows));
  })
);

routerEstudiantes.post(
  "/estudiante",
  asyncHandler(async (req, res) => {
    const { nombre, apellido, tarjetaIdentidad, curso, alergiasMedicamentos } =
      req.body;

    if (
      !nombre ||
      !apellido ||
      !tarjetaIdentidad ||
      !curso ||
      !alergiasMedicamentos
    ) {
      return res
        .status(400)
        .json(respuestaError("Todos los campos son obligatorios."));
    }

    let row = await insertEstudiante(
      nombre,
      apellido,
      tarjetaIdentidad,
      curso,
      alergiasMedicamentos
    );
    res.json(respuestaOK(row));
  })
);

routerEstudiantes.put(
  "/estudiante/:id",
  asyncHandler(async (req, res) => {
    let idEstudiante = parseInt(req.params["id"]);
    const { nombre, apellido, tarjetaIdentidad, curso, alergiasMedicamentos } =
      req.body;

    if (isNaN(idEstudiante)) {
      return res
        .status(400)
        .json(respuestaError("El campo 'id' no es numérico."));
    }

    if (
      !nombre ||
      !apellido ||
      !tarjetaIdentidad ||
      !curso ||
      !alergiasMedicamentos
    ) {
      return res
        .status(400)
        .json(respuestaError("Todos los campos son obligatorios."));
    }

    const row = await updateEstudiante(
      idEstudiante,
      nombre,
      apellido,
      tarjetaIdentidad,
      curso,
      alergiasMedicamentos
    );
    res.json(respuestaOK("Update OK"));
  })
);

routerEstudiantes.delete(
  "/estudiante/:id",
  asyncHandler(async (req, res) => {
    let idEstudiante = parseInt(req.params["id"]);
    if (isNaN(idEstudiante)) {
      return res
        .status(400)
        .json(respuestaError("El campo 'id' no es numérico."));
    }
    await deleteEstudiante(idEstudiante);
    res.json(respuestaOK("Delete OK"));
  })
);

export default routerEstudiantes;
