import pkg from "pg";
import dotenv from "dotenv";
dotenv.config();
const { Pool } = pkg;

export const pool = new Pool({
  user: process.env.DB_USER || "postgres",
  host: process.env.DB_HOST || "localhost",
  database: process.env.DB_NAME || "fichamedica",
  password: process.env.DB_PASS || "",
  port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 5432,
});

(async () => {
  try {
    const client = await pool.connect();
    await client.query('SELECT NOW()');
    client.release();
    console.log("Conectado a PostgreSQL OK");
  } catch (err) {
    console.error("ERROR conexión PostgreSQL:", err);
  }
})();
