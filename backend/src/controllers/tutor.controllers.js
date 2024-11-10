import executeQuery from "../db/dbHelper.js";

/**
 * Función para obtener todos los tutores
 * @returns {Array} - Lista de tutores
 * @throws {Error} - Si ocurre un error en la consulta
 */
export const getTutores = async () => {
  const query =
    "SELECT id_tutor, nombre, apellido, relacion_estudiante, correo, telefono FROM tutor ORDER BY id_tutor ASC";
  try {
    return await executeQuery(query);
  } catch (error) {
    throw new Error(`Error al ejecutar consulta de tutores: ${error.stack}`);
  }
};

/**
 * Función para obtener un tutor por su ID
 * @param {number} idTutor - ID del tutor
 * @returns {Array} - Detalles del tutor
 * @throws {Error} - Si ocurre un error en la consulta
 */
export const getTutor = async (idTutor) => {
  const query =
    "SELECT id_tutor, nombre, apellido, relacion_estudiante, correo, telefono FROM tutor WHERE id_tutor = $1";
  try {
    return await executeQuery(query, [idTutor]);
  } catch (error) {
    throw new Error(
      `Error al ejecutar consulta de tutor con idTutor=${idTutor}: ${error.stack}`
    );
  }
};

/**
 * Función para insertar un nuevo tutor
 * @param {string} nombre - Nombre del tutor
 * @param {string} apellido - Apellido del tutor
 * @param {string} relacionEstudiante - Relación con el estudiante
 * @param {string} correo - Correo del tutor
 * @param {number} telefono - Teléfono del tutor
 * @returns {Array} - ID del tutor insertado
 * @throws {Error} - Si ocurre un error en la consulta
 */
export const insertTutor = async (
  nombre,
  apellido,
  relacionEstudiante,
  correo,
  telefono
) => {
  const query = `INSERT INTO tutor (nombre, apellido, relacion_estudiante, correo, telefono) 
                   VALUES ($1, $2, $3, $4, $5) RETURNING id_tutor;`;
  try {
    return await executeQuery(query, [
      nombre,
      apellido,
      relacionEstudiante,
      correo,
      telefono,
    ]);
  } catch (error) {
    throw new Error(
      `Error al ejecutar inserción de tutor con nombre=${nombre}: ${error.stack}`
    );
  }
};

/**
 * Función para actualizar un tutor por su ID
 * @param {number} idTutor - ID del tutor
 * @param {string} nombre - Nombre del tutor
 * @param {string} apellido - Apellido del tutor
 * @param {string} relacionEstudiante - Relación con el estudiante
 * @param {string} correo - Correo del tutor
 * @param {number} telefono - Teléfono del tutor
 * @returns {Array} - Datos del tutor actualizado
 * @throws {Error} - Si ocurre un error en la consulta
 */
export const updateTutor = async (
  idTutor,
  nombre,
  apellido,
  relacionEstudiante,
  correo,
  telefono
) => {
  const query = `UPDATE tutor SET nombre = $2, apellido = $3, relacion_estudiante = $4, correo = $5, telefono = $6 
                   WHERE id_tutor = $1 RETURNING *;`;
  try {
    return await executeQuery(query, [
      idTutor,
      nombre,
      apellido,
      relacionEstudiante,
      correo,
      telefono,
    ]);
  } catch (error) {
    throw new Error(
      `Error al ejecutar actualización de tutor con idTutor=${idTutor}: ${error.stack}`
    );
  }
};

/**
 * Función para eliminar un tutor por su ID
 * @param {number} idTutor - ID del tutor
 * @returns {Array} - Datos del tutor eliminado
 * @throws {Error} - Si ocurre un error en la consulta
 */
export const deleteTutor = async (idTutor) => {
  const query = "DELETE FROM tutor WHERE id_tutor = $1 RETURNING *;";
  try {
    return await executeQuery(query, [idTutor]);
  } catch (error) {
    throw new Error(
      `Error al ejecutar borrado de tutor con idTutor=${idTutor}: ${error.stack}`
    );
  }
};
