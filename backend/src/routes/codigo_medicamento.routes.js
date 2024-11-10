import { Router } from "express";
import {
  getCodigoMedicamentos,
  getCodigoMedicamento,
  insertCodigoMedicamento,
  updateCodigoMedicamento,
  deleteCodigoMedicamento,
} from "../controllers/codigo_medicamento.controllers.js";
import { asyncHandler } from "../middlewares/errorHandler.js";
import { respuestaError, respuestaOK } from "../lib/responseModels.js";

const routerCodigoMedicamento = Router();

routerCodigoMedicamento.get(
  "/codigo_medicamentos",
  asyncHandler(async (req, res) => {
    let rows = await getCodigoMedicamentos();
    res.json(respuestaOK(rows));
  })
);

routerCodigoMedicamento.get(
  "/codigo_medicamento/:id",
  asyncHandler(async (req, res) => {
    let idCodigoMedicamento = parseInt(req.params["id"]);
    if (isNaN(idCodigoMedicamento)) {
      return res
        .status(400)
        .json(respuestaError("El campo 'id' no es numérico."));
    }
    let rows = await getCodigoMedicamento(idCodigoMedicamento);
    res.json(respuestaOK(rows));
  })
);

routerCodigoMedicamento.post(
  "/codigo_medicamento",
  asyncHandler(async (req, res) => {
    const { codigoMedicamento, nombreMedicamento, cantidad } = req.body;
    if (!codigoMedicamento || !nombreMedicamento) {
      return res
        .status(400)
        .json(
          respuestaError(
            "Los campos 'codigoMedicamento' y 'nombreMedicamento' son obligatorios."
          )
        );
    }
    let row = await insertCodigoMedicamento(
      codigoMedicamento,
      nombreMedicamento,
      cantidad
    );
    res.json(respuestaOK(row));
  })
);

routerCodigoMedicamento.put(
  "/codigo_medicamento/:id",
  asyncHandler(async (req, res) => {
    let idCodigoMedicamento = parseInt(req.params["id"]);
    const { codigoMedicamento, nombreMedicamento, cantidad } = req.body;

    if (isNaN(idCodigoMedicamento)) {
      return res
        .status(400)
        .json(respuestaError("El campo 'id' no es numérico."));
    }

    if (!codigoMedicamento || !nombreMedicamento) {
      return res
        .status(400)
        .json(
          respuestaError(
            "Los campos 'codigoMedicamento' y 'nombreMedicamento' son obligatorios."
          )
        );
    }

    const row = await updateCodigoMedicamento(
      idCodigoMedicamento,
      codigoMedicamento,
      nombreMedicamento,
      cantidad
    );
    res.json(respuestaOK("Update OK"));
  })
);

routerCodigoMedicamento.delete(
  "/codigo_medicamento/:id",
  asyncHandler(async (req, res) => {
    let idCodigoMedicamento = parseInt(req.params["id"]);
    if (isNaN(idCodigoMedicamento)) {
      return res
        .status(400)
        .json(respuestaError("El campo 'id' no es numérico."));
    }
    await deleteCodigoMedicamento(idCodigoMedicamento);
    res.json(respuestaOK("Delete OK"));
  })
);

export default routerCodigoMedicamento;
