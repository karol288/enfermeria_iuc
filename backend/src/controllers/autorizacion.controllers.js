import executeQuery from "../db/dbHelper.js";

export const getAutorizaciones = async () => {
  const query = "SELECT * FROM autorizacion ORDER BY id_autorizacion ASC";
  return await executeQuery(query);
};

export const getAutorizacion = async (idAutorizacion) => {
  const query = "SELECT * FROM autorizacion WHERE id_autorizacion = $1";
  const result = await executeQuery(query, [idAutorizacion]);
  if (result.length === 0) {
    throw {
      name: "Custom error",
      statusCode: 404,
      message: `Autorización con ID ${idAutorizacion} no encontrada.`,
    };
  }
  return result;
};

export const insertAutorizacion = async (
  detallesAutorizacion,
  idEstudiante,
  idTutor,
  idMedicamentoDado
) => {
  const query = `INSERT INTO autorizacion 
                   (detalles_autorizacion, id_estudiante, id_tutor, id_medicamento_dado) 
                   VALUES ($1, $2, $3, $4) RETURNING id_autorizacion;`;
  try {
    return await executeQuery(query, [
      detallesAutorizacion,
      idEstudiante,
      idTutor,
      idMedicamentoDado,
    ]);
  } catch (error) {
    throw error;
  }
};

export const updateAutorizacion = async (
  idAutorizacion,
  detallesAutorizacion,
  idEstudiante,
  idTutor,
  idMedicamentoDado
) => {
  const query = `UPDATE autorizacion 
                   SET detalles_autorizacion=$2, id_estudiante=$3, id_tutor=$4, id_medicamento_dado=$5 
                   WHERE id_autorizacion=$1 RETURNING *;`;
  try {
    const result = await executeQuery(query, [
      idAutorizacion,
      detallesAutorizacion,
      idEstudiante,
      idTutor,
      idMedicamentoDado,
    ]);
    if (result.length === 0) {
      throw {
        name: "Custom error",
        statusCode: 404,
        message: `Autorización con ID ${idAutorizacion} no encontrada.`,
      };
    }
    return result;
  } catch (error) {
    throw error;
  }
};

export const deleteAutorizacion = async (idAutorizacion) => {
  const query =
    "DELETE FROM autorizacion WHERE id_autorizacion=$1 RETURNING *;";
  const result = await executeQuery(query, [idAutorizacion]);
  if (result.length === 0) {
    throw {
      name: "Custom error",
      statusCode: 404,
      message: `Autorización con ID ${idAutorizacion} no encontrada.`,
    };
  }
  return result;
};
