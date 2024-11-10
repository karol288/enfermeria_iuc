import executeQuery from "../db/dbHelper.js";

export const getAlergias = async () => {
  const query = "SELECT * FROM alergias ORDER BY id_alergias ASC";
  return await executeQuery(query);
};

export const getAlergia = async (idAlergia) => {
  const query = "SELECT * FROM alergias WHERE id_alergias = $1";
  const result = await executeQuery(query, [idAlergia]);
  if (result.length === 0) {
    throw {
      name: "Custom error",
      statusCode: 404,
      message: `Alergia con ID ${idAlergia} no encontrada.`,
    };
  }
  return result;
};

export const insertAlergia = async (alergias_medicamentos, id_estudiante) => {
  const query = `INSERT INTO alergias (alergias_medicamentos, id_estudiante) 
                   VALUES ($1, $2) RETURNING id_alergias;`;
  try {
    return await executeQuery(query, [alergias_medicamentos, id_estudiante]);
  } catch (error) {
    throw error;
  }
};

export const updateAlergia = async (
  idAlergia,
  alergias_medicamentos,
  id_estudiante
) => {
  const query = `UPDATE alergias 
                   SET alergias_medicamentos=$2, id_estudiante=$3 
                   WHERE id_alergias=$1 RETURNING *;`;
  const result = await executeQuery(query, [
    idAlergia,
    alergias_medicamentos,
    id_estudiante,
  ]);
  if (result.length === 0) {
    throw {
      name: "Custom error",
      statusCode: 404,
      message: `Alergia con ID ${idAlergia} no encontrada.`,
    };
  }
  return result;
};

export const deleteAlergia = async (idAlergia) => {
  const query = "DELETE FROM alergias WHERE id_alergias=$1 RETURNING *;";
  const result = await executeQuery(query, [idAlergia]);
  if (result.length === 0) {
    throw {
      name: "Custom error",
      statusCode: 404,
      message: `Alergia con ID ${idAlergia} no encontrada.`,
    };
  }
  return result;
};
