import executeQuery from "../db/dbHelper.js";

/**
 * Función para obtener todos los códigos de medicamento
 * @returns {Array} - Lista de códigos de medicamento
 * @throws {Error} - Si ocurre un error en la consulta
 */
export const getCodigoMedicamentos = async () => {
  const query =
    "SELECT id_codigo_medicamento, codigo_medicamento, nombre_medicamento, cantidad FROM codigo_medicamento ORDER BY id_codigo_medicamento ASC";
  try {
    return await executeQuery(query);
  } catch (error) {
    throw new Error(
      `Error al ejecutar consulta de códigos de medicamento: ${error.stack}`
    );
  }
};

/**
 * Función para obtener un código de medicamento por su ID
 * @param {number} idCodigoMedicamento - ID del código de medicamento
 * @returns {Array} - Detalles del código de medicamento
 * @throws {Error} - Si ocurre un error en la consulta
 */
export const getCodigoMedicamento = async (idCodigoMedicamento) => {
  const query =
    "SELECT id_codigo_medicamento, codigo_medicamento, nombre_medicamento, cantidad FROM codigo_medicamento WHERE id_codigo_medicamento = $1";
  try {
    return await executeQuery(query, [idCodigoMedicamento]);
  } catch (error) {
    throw new Error(
      `Error al ejecutar consulta de código de medicamento con idCodigoMedicamento=${idCodigoMedicamento}: ${error.stack}`
    );
  }
};

/**
 * Función para insertar un nuevo código de medicamento
 * @param {string} codigoMedicamento - Código del medicamento
 * @param {string} nombreMedicamento - Nombre del medicamento
 * @param {string} cantidad - Cantidad del medicamento
 * @returns {Array} - ID del código de medicamento insertado
 * @throws {Error} - Si ocurre un error en la consulta
 */
export const insertCodigoMedicamento = async (
  codigoMedicamento,
  nombreMedicamento,
  cantidad
) => {
  const query =
    "INSERT INTO codigo_medicamento (codigo_medicamento, nombre_medicamento, cantidad) VALUES ($1, $2, $3) RETURNING id_codigo_medicamento;";
  try {
    return await executeQuery(query, [
      codigoMedicamento,
      nombreMedicamento,
      cantidad,
    ]);
  } catch (error) {
    throw new Error(
      `Error al ejecutar inserción de código de medicamento con codigoMedicamento=${codigoMedicamento}: ${error.stack}`
    );
  }
};

/**
 * Función para actualizar un código de medicamento por su ID
 * @param {number} idCodigoMedicamento - ID del código de medicamento
 * @param {string} codigoMedicamento - Nuevo código del medicamento
 * @param {string} nombreMedicamento - Nuevo nombre del medicamento
 * @param {string} cantidad - Nueva cantidad del medicamento
 * @returns {Array} - Datos del código de medicamento actualizado
 * @throws {Error} - Si ocurre un error en la consulta
 */
export const updateCodigoMedicamento = async (
  idCodigoMedicamento,
  codigoMedicamento,
  nombreMedicamento,
  cantidad
) => {
  const query =
    "UPDATE codigo_medicamento SET codigo_medicamento = $2, nombre_medicamento = $3, cantidad = $4 WHERE id_codigo_medicamento = $1 RETURNING *;";
  try {
    return await executeQuery(query, [
      idCodigoMedicamento,
      codigoMedicamento,
      nombreMedicamento,
      cantidad,
    ]);
  } catch (error) {
    throw new Error(
      `Error al ejecutar actualización de código de medicamento con idCodigoMedicamento=${idCodigoMedicamento}: ${error.stack}`
    );
  }
};

/**
 * Función para eliminar un código de medicamento por su ID
 * @param {number} idCodigoMedicamento - ID del código de medicamento
 * @returns {Array} - Datos del código de medicamento eliminado
 * @throws {Error} - Si ocurre un error en la consulta
 */
export const deleteCodigoMedicamento = async (idCodigoMedicamento) => {
  const query =
    "DELETE FROM codigo_medicamento WHERE id_codigo_medicamento = $1 RETURNING *;";
  try {
    return await executeQuery(query, [idCodigoMedicamento]);
  } catch (error) {
    throw new Error(
      `Error al ejecutar borrado de código de medicamento con idCodigoMedicamento=${idCodigoMedicamento}: ${error.stack}`
    );
  }
};
