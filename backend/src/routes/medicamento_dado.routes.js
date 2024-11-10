import { Router } from "express";
import {
  getMedicamentoDado,
  getMedicamentosDados,
  insertMedicamentoDado,
  updateMedicamentoDado,
  deleteMedicamentoDado,
} from "../controllers/medicamento_dado.controllers.js";
import { errorHandler, asyncHandler } from "../middlewares/errorHandler.js";
import { respuestaError, respuestaOK } from "../lib/responseModels.js";

const routerMedicamentoDado = Router();

routerMedicamentoDado.get(
  "/medicamentos-dados",
  asyncHandler(async (req, res) => {
    let rows = await getMedicamentosDados();
    res.json(respuestaOK(rows));
  })
);

routerMedicamentoDado.get(
  "/medicamento-dado/:id",
  asyncHandler(async (req, res) => {
    let idMedicamentoDado = parseInt(req.params["id"]);
    if (isNaN(idMedicamentoDado)) {
      return res
        .status(400)
        .json(respuestaError("El campo 'id' no es numérico."));
    }
    let rows = await getMedicamentoDado(idMedicamentoDado);
    res.json(respuestaOK(rows));
  })
);

routerMedicamentoDado.post(
  "/medicamento-dado",
  asyncHandler(async (req, res) => {
    const { dosisRecomendada, idVisita, idCodigoMedicamento } = req.body;

    // Validación de campos obligatorios
    if (!dosisRecomendada || !idVisita || !idCodigoMedicamento) {
      return res
        .status(400)
        .json(respuestaError("Todos los campos son obligatorios."));
    }

    try {
      let row = await insertMedicamentoDado(
        dosisRecomendada,
        idVisita,
        idCodigoMedicamento
      );
      res.json(respuestaOK(row));
    } catch (error) {
      if (error?.name === "Custom error")
        return res.status(error.statusCode).json(respuestaError(error.message));
      else errorHandler({ status: 500, message: error.message }, req, res);
    }
  })
);

routerMedicamentoDado.put(
  "/medicamento-dado/:id",
  asyncHandler(async (req, res) => {
    let idMedicamentoDado = parseInt(req.params["id"]);
    const { dosisRecomendada, idVisita, idCodigoMedicamento } = req.body;

    if (isNaN(idMedicamentoDado)) {
      return res
        .status(400)
        .json(respuestaError("El campo 'id' no es numérico."));
    }

    if (!dosisRecomendada || !idVisita || !idCodigoMedicamento) {
      return res
        .status(400)
        .json(respuestaError("Todos los campos son obligatorios."));
    }
    try {
      let row = await updateMedicamentoDado(
        idMedicamentoDado,
        dosisRecomendada,
        idVisita,
        idCodigoMedicamento
      );
      res.json(respuestaOK("Update OK"));
    } catch (error) {
      if (error?.name === "Custom error")
        return res.status(error.statusCode).json(respuestaError(error.message));
      else errorHandler({ status: 500, message: error.message }, req, res);
    }
  })
);

routerMedicamentoDado.delete(
  "/medicamento-dado/:id",
  asyncHandler(async (req, res) => {
    let idMedicamentoDado = parseInt(req.params["id"]);
    if (isNaN(idMedicamentoDado)) {
      return res
        .status(400)
        .json(respuestaError("El campo 'id' no es numérico."));
    }

    await deleteMedicamentoDado(idMedicamentoDado);
    res.json(respuestaOK("Delete OK"));
  })
);

export default routerMedicamentoDado;
