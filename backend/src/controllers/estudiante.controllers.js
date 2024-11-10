import executeQuery from "../db/dbHelper.js";

/**
 * Función para obtener todos los estudiantes
 * @returns {Array} - Lista de estudiantes
 * @throws {Error} - Si ocurre un error en la consulta
 */
export const getEstudiantes = async () => {
  const query =
    "SELECT id_estudiante, nombre, apellido, tarjeta_identidad, curso, alergias_medicamentos FROM estudiante ORDER BY id_estudiante ASC";
  try {
    return await executeQuery(query);
  } catch (error) {
    throw new Error(
      `Error al ejecutar consulta de estudiantes: ${error.stack}`
    );
  }
};

/**
 * Función para obtener un estudiante por su ID
 * @param {number} idEstudiante - ID del estudiante
 * @returns {Array} - Detalles del estudiante
 * @throws {Error} - Si ocurre un error en la consulta
 */
export const getEstudiante = async (idEstudiante) => {
  const query =
    "SELECT id_estudiante, nombre, apellido, tarjeta_identidad, curso, alergias_medicamentos FROM estudiante WHERE id_estudiante = $1";
  try {
    return await executeQuery(query, [idEstudiante]);
  } catch (error) {
    throw new Error(
      `Error al ejecutar consulta de estudiante con idEstudiante=${idEstudiante}: ${error.stack}`
    );
  }
};

/**
 * Función para insertar un nuevo estudiante
 * @param {string} nombre - Nombre del estudiante
 * @param {string} apellido - Apellido del estudiante
 * @param {number} tarjetaIdentidad - Tarjeta de identidad del estudiante
 * @param {string} curso - Curso del estudiante
 * @param {string} alergiasMedicamentos - Alergias a medicamentos del estudiante
 * @returns {Array} - ID del estudiante insertado
 * @throws {Error} - Si ocurre un error en la consulta
 */
export const insertEstudiante = async (
  nombre,
  apellido,
  tarjetaIdentidad,
  curso,
  alergiasMedicamentos
) => {
  const query =
    "INSERT INTO estudiante (nombre, apellido, tarjeta_identidad, curso, alergias_medicamentos) VALUES ($1, $2, $3, $4, $5) RETURNING id_estudiante;";
  try {
    return await executeQuery(query, [
      nombre,
      apellido,
      tarjetaIdentidad,
      curso,
      alergiasMedicamentos,
    ]);
  } catch (error) {
    throw new Error(
      `Error al ejecutar inserción de estudiante con tarjetaIdentidad=${tarjetaIdentidad}: ${error.stack}`
    );
  }
};

/**
 * Función para actualizar un estudiante por su ID
 * @param {number} idEstudiante - ID del estudiante
 * @param {string} nombre - Nuevo nombre del estudiante
 * @param {string} apellido - Nuevo apellido del estudiante
 * @param {number} tarjetaIdentidad - Nueva tarjeta de identidad del estudiante
 * @param {string} curso - Nuevo curso del estudiante
 * @param {string} alergiasMedicamentos - Nuevas alergias a medicamentos del estudiante
 * @returns {Array} - Datos del estudiante actualizado
 * @throws {Error} - Si ocurre un error en la consulta
 */
export const updateEstudiante = async (
  idEstudiante,
  nombre,
  apellido,
  tarjetaIdentidad,
  curso,
  alergiasMedicamentos
) => {
  const query =
    "UPDATE estudiante SET nombre = $2, apellido = $3, tarjeta_identidad = $4, curso = $5, alergias_medicamentos = $6 WHERE id_estudiante = $1 RETURNING *;";
  try {
    return await executeQuery(query, [
      idEstudiante,
      nombre,
      apellido,
      tarjetaIdentidad,
      curso,
      alergiasMedicamentos,
    ]);
  } catch (error) {
    throw new Error(
      `Error al ejecutar actualización de estudiante con idEstudiante=${idEstudiante}: ${error.stack}`
    );
  }
};

/**
 * Función para eliminar un estudiante por su ID
 * @param {number} idEstudiante - ID del estudiante
 * @returns {Array} - Datos del estudiante eliminado
 * @throws {Error} - Si ocurre un error en la consulta
 */
export const deleteEstudiante = async (idEstudiante) => {
  const query = "DELETE FROM estudiante WHERE id_estudiante = $1 RETURNING *;";
  try {
    return await executeQuery(query, [idEstudiante]);
  } catch (error) {
    throw new Error(
      `Error al ejecutar borrado de estudiante con idEstudiante=${idEstudiante}: ${error.stack}`
    );
  }
};
