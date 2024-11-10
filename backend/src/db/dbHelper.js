import pool from './db.js';

/**
 * Función genérica para ejecutar consultas SQL
 * @param {string} query - La consulta SQL a ejecutar
 * @param {Array} params - Los parámetros para la consulta SQL
 * @returns {Array} - Los resultados de la consulta
 * @throws {Error} - Si ocurre un error en la consulta
 */
export const executeQuery = async (query, params = []) => {
    try {
        const result = await pool.query(query, params);
        return result.rows;
    } catch (error) {
        // Detectar si es un error de conexión (usualmente es ECONNREFUSED para conexiones fallidas)
        if (error.code === 'ECONNREFUSED') {
            throw new Error('Conexión a la base de datos fallida: La conexión fue rechazada. ¿Quiza el servidor de BD no está activo?');
        }

        // Otros errores que podemos manejar de forma más específica
        if (error.code) {
            throw new Error(` en la base de datos (Código: ${error.code}): ${error.message || error.detail || 'Mensaje no disponible'}`);
        }

        // Si el error es genérico, devolver lo que esté disponible
        throw new Error(` en la consulta: ${error.message || 'Mensaje no disponible'}`);
    }
};
export default executeQuery;