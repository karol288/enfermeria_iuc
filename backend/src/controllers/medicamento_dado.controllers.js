import executeQuery from "../db/dbHelper.js";

export const getMedicamentosDados = async () => {
  const query =
    "SELECT * FROM medicamento_dado ORDER BY id_medicamento_dado ASC";
  return await executeQuery(query);
};

export const getMedicamentoDado = async (idMedicamentoDado) => {
  const query = "SELECT * FROM medicamento_dado WHERE id_medicamento_dado = $1";
  const result = await executeQuery(query, [idMedicamentoDado]);
  if (result.length === 0)
    throw {
      name: "Custom error",
      statusCode: 404,
      message: `Medicamento dado con ID ${idMedicamentoDado} no encontrado.`,
    };
  return result;
};

export const insertMedicamentoDado = async (
  dosisRecomendada,
  idVisita,
  idCodigoMedicamento
) => {
  const query = `INSERT INTO medicamento_dado 
                   (dosis_recomendada, id_visita, id_codigo_medicamento) 
                   VALUES ($1, $2, $3) RETURNING id_medicamento_dado;`;

  try {
    return await executeQuery(query, [
      dosisRecomendada,
      idVisita,
      idCodigoMedicamento,
    ]);
  } catch (error) {
    if (error.message.search("ref_medicamento_dado_to_visita") > -1) {
      throw {
        name: "Custom error",
        statusCode: 422,
        message: `El idVisita=${idVisita} no existe.`,
      };
    }
    if (error.message.search("ref_medicamento_dado_to_medicamento") > -1) {
      throw {
        name: "Custom error",
        statusCode: 422,
        message: `El idCodigoMedicamento=${idCodigoMedicamento} no existe.`,
      };
    }
    throw error;
  }
};

export const updateMedicamentoDado = async (
  idMedicamentoDado,
  dosisRecomendada,
  idVisita,
  idCodigoMedicamento
) => {
  const query = `UPDATE medicamento_dado 
                   SET dosis_recomendada=$2, id_visita=$3, id_codigo_medicamento=$4 
                   WHERE id_medicamento_dado=$1 RETURNING *;`;
  try {
    const result = await executeQuery(query, [
      idMedicamentoDado,
      dosisRecomendada,
      idVisita,
      idCodigoMedicamento,
    ]);
    if (result.length === 0)
      throw {
        name: "Custom error",
        statusCode: 404,
        message: `Medicamento dado con ID ${idMedicamentoDado} no encontrado.`,
      };
    return result;
  } catch (error) {
    if (error.message.search("ref_medicamento_dado_to_visita") > -1) {
      throw {
        name: "Custom error",
        statusCode: 422,
        message: `El idVisita=${idVisita} no existe.`,
      };
    }
    if (error.message.search("ref_medicamento_dado_to_medicamento") > -1) {
      throw {
        name: "Custom error",
        statusCode: 422,
        message: `El idCodigoMedicamento=${idCodigoMedicamento} no existe.`,
      };
    }
    throw error;
  }
};

export const deleteMedicamentoDado = async (idMedicamentoDado) => {
  const query =
    "DELETE FROM medicamento_dado WHERE id_medicamento_dado=$1 RETURNING *;";
  const result = await executeQuery(query, [idMedicamentoDado]);
  if (result.length === 0)
    throw {
      name: "Custom error",
      statusCode: 404,
      message: `Medicamento dado con ID ${idMedicamentoDado} no encontrado.`,
    };
  return result;
};
