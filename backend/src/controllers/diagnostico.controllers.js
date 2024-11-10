import executeQuery from "../db/dbHelper.js";

export const getDiagnosticos = async () => {
  const query = "SELECT * FROM diagnostico ORDER BY id_diagnostico ASC";
  return await executeQuery(query);
};

export const getDiagnostico = async (idDiagnostico) => {
  const query = "SELECT * FROM diagnostico WHERE id_diagnostico = $1";
  const result = await executeQuery(query, [idDiagnostico]);
  if (result.length === 0)
    throw {
      name: "Custom error",
      statusCode: 404,
      message: `Diagnóstico con ID ${idDiagnostico} no encontrado.`,
    };
  return result;
};

export const insertDiagnostico = async (
  salida_institucion,
  mejoramiendo,
  id_estudiante,
  id_visita
) => {
  const query = `INSERT INTO diagnostico 
                   (salida_institucion, mejoramiendo, id_estudiante, id_visita) 
                   VALUES ($1, $2, $3, $4) RETURNING id_diagnostico;`;
  try {
    return await executeQuery(query, [
      salida_institucion,
      mejoramiendo,
      id_estudiante,
      id_visita,
    ]);
  } catch (error) {
    if (error.message.includes("ref_diagnostico_to_estudiante")) {
      throw {
        name: "Custom error",
        statusCode: 422,
        message: `El id_estudiante=${id_estudiante} no existe.`,
      };
    }
    if (error.message.includes("ref_diagnostico_to_visita")) {
      throw {
        name: "Custom error",
        statusCode: 422,
        message: `El id_visita=${id_visita} no existe.`,
      };
    }
    throw error;
  }
};

export const updateDiagnostico = async (
  idDiagnostico,
  salida_institucion,
  mejoramiendo,
  id_estudiante,
  id_visita
) => {
  const query = `UPDATE diagnostico 
                   SET salida_institucion=$2, mejoramiendo=$3, id_estudiante=$4, id_visita=$5 
                   WHERE id_diagnostico=$1 RETURNING *;`;
  try {
    const result = await executeQuery(query, [
      idDiagnostico,
      salida_institucion,
      mejoramiendo,
      id_estudiante,
      id_visita,
    ]);
    if (result.length === 0)
      throw {
        name: "Custom error",
        statusCode: 404,
        message: `Diagnóstico con ID ${idDiagnostico} no encontrado.`,
      };
    return result;
  } catch (error) {
    if (error.message.includes("ref_diagnostico_to_estudiante")) {
      throw {
        name: "Custom error",
        statusCode: 422,
        message: `El id_estudiante=${id_estudiante} no existe.`,
      };
    }
    if (error.message.includes("ref_diagnostico_to_visita")) {
      throw {
        name: "Custom error",
        statusCode: 422,
        message: `El id_visita=${id_visita} no existe.`,
      };
    }
    throw error;
  }
};

export const deleteDiagnostico = async (idDiagnostico) => {
  const query = "DELETE FROM diagnostico WHERE id_diagnostico=$1 RETURNING *;";
  const result = await executeQuery(query, [idDiagnostico]);
  if (result.length === 0)
    throw {
      name: "Custom error",
      statusCode: 404,
      message: `Diagnóstico con ID ${idDiagnostico} no encontrado.`,
    };
  return result;
};
