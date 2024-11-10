import executeQuery from "../db/dbHelper.js";

export const getVisitas = async () => {
  const query = "SELECT * FROM visita ORDER BY id_visita ASC";
  return await executeQuery(query);
};

export const getVisita = async (idVisita) => {
  const query = "SELECT * FROM visita WHERE id_visita = $1";
  const result = await executeQuery(query, [idVisita]);
  if (result.length === 0)
    throw {
      name: "Custom error",
      statusCode: 404,
      message: `Visita con ID ${idVisita} no encontrada.`,
    };
  return result;
};

export const insertVisita = async (
  hora,
  fecha,
  motivo_visita,
  id_estudiante
) => {
  const query = `INSERT INTO visita (hora, fecha, motivo_visita, id_estudiante) 
                   VALUES ($1, $2, $3, $4) RETURNING id_visita;`;

  try {
    return await executeQuery(query, [
      hora,
      fecha,
      motivo_visita,
      id_estudiante,
    ]);
  } catch (error) {
    if (error.message.includes("fecha_hora")) {
      throw {
        name: "Custom error",
        statusCode: 409,
        message: `La combinación de hora y fecha ya existe.`,
      };
    }
    throw error;
  }
};

export const updateVisita = async (
  idVisita,
  hora,
  fecha,
  motivo_visita,
  id_estudiante
) => {
  const query = `UPDATE visita 
                   SET hora = $2, fecha = $3, motivo_visita = $4, id_estudiante = $5 
                   WHERE id_visita = $1 RETURNING *;`;
  const result = await executeQuery(query, [
    idVisita,
    hora,
    fecha,
    motivo_visita,
    id_estudiante,
  ]);
  if (result.length === 0)
    throw {
      name: "Custom error",
      statusCode: 404,
      message: `Visita con ID ${idVisita} no encontrada.`,
    };
  return result;
};

export const deleteVisita = async (idVisita) => {
  const query = "DELETE FROM visita WHERE id_visita = $1 RETURNING *;";
  const result = await executeQuery(query, [idVisita]);
  if (result.length === 0)
    throw {
      name: "Custom error",
      statusCode: 404,
      message: `Visita con ID ${idVisita} no encontrada.`,
    };
  return result;
};
