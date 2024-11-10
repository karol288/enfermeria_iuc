import executeQuery from "../db/dbHelper.js";
import { generateSalt } from "../lib/cryptolib.js";

/**
 * Función para realizar login de usuario
 * @param {string} nombre - Nombre del usuario
 * @param {string} password - Contraseña del usuario
 * @returns {Array} - Resultado de la consulta de login
 * @throws {Error} - Si ocurre un error en la consulta
 */
export const login = async (nombre, password) => {
  const query = `
        SELECT id_Usuarios, id_rol 
        FROM Usuarios u 
        WHERE Nombre = $1 
          AND password = encode(sha512($2 || u.sal::bytea), 'hex')
    `;
  try {
    const result = await executeQuery(query, [nombre, password]);
    return result;
  } catch (error) {
    throw `Error al ejecutar consulta de login: ${error.stack}`;
  }
};

/**
 * Función para registrar un nuevo usuario
 * @param {string} nombre - Nombre del usuario
 * @param {string} password - Contraseña del usuario
 * @param {number} id_rol - Rol del usuario
 * @returns {boolean} - True si el registro es exitoso, false si el usuario ya existe
 * @throws {Error} - Si ocurre un error en la consulta
 */
export const register = async (nombre, password, id_rol) => {
  const query = `
        INSERT INTO Usuarios (nombre, password, sal, id_rol) 
        VALUES ($1, encode(sha512(($2 || $3)::bytea), 'hex'), $3, $4)
    `;
  try {
    if (await userExists(nombre)) return false; // El usuario ya existe

    let salt = generateSalt(32);
    await executeQuery(query, [nombre, password, salt, id_rol]);
    return true;
  } catch (error) {
    throw new Error(`Error al ejecutar consulta de register: ${error.stack}`);
  }
};

/**
 * Función para verificar si un usuario ya existe
 * @param {string} nombre - Nombre del usuario
 * @returns {boolean} - True si el usuario existe, false en caso contrario
 * @throws {Error} - Si ocurre un error en la consulta
 */
export const userExists = async (nombre) => {
  const query = "SELECT 1 FROM Usuarios u WHERE Nombre = $1";
  try {
    const result = await executeQuery(query, [nombre]);
    return result.length > 0;
  } catch (error) {
    throw new Error(`Error al ejecutar consulta de userExists: ${error.stack}`);
  }
};
