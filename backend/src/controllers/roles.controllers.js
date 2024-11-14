import executeQuery from "../db/dbHelper.js";

/**
 * Obtener todos los roles
 */
export const getRoles = async () => {
  const query =
    "SELECT id_rol, nombre_rol, descripcion_rol FROM Roles ORDER BY id_rol ASC";
  try {
    return await executeQuery(query);
  } catch (error) {
    throw new Error(`Error al ejecutar consulta de Roles: ${error.stack}`);
  }
};

/**
 * Insertar un nuevo rol
 */
export const insertRol = async (nombreRol, descripcionRol) => {
  const query =
    "INSERT INTO roles (nombre_rol, descripcion_rol) VALUES ($1, $2) RETURNING id_rol;";
  try {
    return await executeQuery(query, [nombreRol, descripcionRol]);
  } catch (error) {
    throw new Error(
      `Error al ejecutar inserción de Rol con nombreRol=${nombreRol}: ${error.stack}`
    );
  }
};
