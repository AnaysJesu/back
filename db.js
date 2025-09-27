import pkg from "pg";
import dotenv from "dotenv";
dotenv.config();
const { Pool } = pkg;

export const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASS,
  port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 5432,
  ssl: { rejectUnauthorized: false } // ✅ importante para Render
});

(async () => {
  try {
    const client = await pool.connect();
    await client.query("SELECT NOW()");
    client.release();
    console.log("Conectado a PostgreSQL Render OK");
  } catch (err) {
    console.error("ERROR conexión PostgreSQL Render:", err);
  }
})();
