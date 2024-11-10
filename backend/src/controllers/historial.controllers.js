import executeQuery from "../db/dbHelper.js";

// Obtener todos los historiales
export const getHistoriales = async () => {
  const query = "SELECT * FROM historial ORDER BY id_historial ASC";
  return await executeQuery(query);
};

// Obtener un historial por su ID
export const getHistorial = async (idHistorial) => {
  const query = "SELECT * FROM historial WHERE id_historial = $1";
  const result = await executeQuery(query, [idHistorial]);
  if (result.length === 0)
    throw {
      name: "Custom error",
      statusCode: 404,
      message: `Historial con ID ${idHistorial} no encontrado.`,
    };
  return result;
};

// Insertar un nuevo historial
export const insertHistorial = async (idEstudiante, idDiagnostico) => {
  const query = `INSERT INTO historial (id_estudiante, id_diagnostico) 
                   VALUES ($1, $2) RETURNING id_historial;`;
  try {
    return await executeQuery(query, [idEstudiante, idDiagnostico]);
  } catch (error) {
    if (error.message.search("ref_historial_to_estudiante") > -1) {
      throw {
        name: "Custom error",
        statusCode: 422,
        message: `El id_estudiante=${idEstudiante} no existe.`,
      };
    }
    if (error.message.search("ref_historial_to_diagnostico") > -1) {
      throw {
        name: "Custom error",
        statusCode: 422,
        message: `El id_diagnostico=${idDiagnostico} no existe.`,
      };
    }
    throw error;
  }
};

// Actualizar un historial por su ID
export const updateHistorial = async (
  idHistorial,
  idEstudiante,
  idDiagnostico
) => {
  const query = `UPDATE historial 
                   SET id_estudiante=$2, id_diagnostico=$3 
                   WHERE id_historial=$1 RETURNING *;`;
  try {
    const result = await executeQuery(query, [
      idHistorial,
      idEstudiante,
      idDiagnostico,
    ]);
    if (result.length === 0)
      throw {
        name: "Custom error",
        statusCode: 404,
        message: `Historial con ID ${idHistorial} no encontrado.`,
      };
    return result;
  } catch (error) {
    if (error.message.search("ref_historial_to_estudiante") > -1) {
      throw {
        name: "Custom error",
        statusCode: 422,
        message: `El id_estudiante=${idEstudiante} no existe.`,
      };
    }
    if (error.message.search("ref_historial_to_diagnostico") > -1) {
      throw {
        name: "Custom error",
        statusCode: 422,
        message: `El id_diagnostico=${idDiagnostico} no existe.`,
      };
    }
    throw error;
  }
};

// Eliminar un historial por su ID
export const deleteHistorial = async (idHistorial) => {
  const query = "DELETE FROM historial WHERE id_historial=$1 RETURNING *;";
  const result = await executeQuery(query, [idHistorial]);
  if (result.length === 0)
    throw {
      name: "Custom error",
      statusCode: 404,
      message: `Historial con ID ${idHistorial} no encontrado.`,
    };
  return result;
};
