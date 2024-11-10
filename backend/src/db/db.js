import pg from "pg";
import dotenv from "dotenv";
dotenv.config({ path: "./backend/.env" });

const { Pool } = pg;

let localPoolConfig = {
  user: "postgres",
  password: "123",
  host: "localhost",
  port: "5432",
  database: "enfermeria",
};

const poolConfig = process.env.POSTGRESQL_URI
  ? {
      connectionString: process.env.POSTGRESQL_URI,
      /* ssl: {
    rejectUnauthorized: false
  } */
    }
  : localPoolConfig;

let pool;

try {
  pool = new Pool(poolConfig);
} catch (exception) {
  console.error(
    "Error no controlado al conectarse a PostgreSQL:",
    exception.message
  );
}
export default pool;
