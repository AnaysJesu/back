import pkg from "pg";
import dotenv from "dotenv";
dotenv.config();

const { Pool } = pkg;

const isRender = !!process.env.DATABASE_URL;

export const pool = new Pool(
  isRender
    ? {
        connectionString: process.env.DATABASE_URL,
        ssl: { rejectUnauthorized: false }, // para Render
      }
    : {
        user: process.env.DB_USER || "postgres",
        host: process.env.DB_HOST || "localhost",
        database: process.env.DB_NAME || "fichamedica",
        password: process.env.DB_PASS || "",
        port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 5432,
      }
);

// Test de conexión
(async () => {
  try {
    const client = await pool.connect();
    await client.query("SELECT NOW()");
    client.release();
    console.log(
      `Conectado a PostgreSQL ${isRender ? "en Render ✅" : "local ✅"}`
    );
  } catch (err) {
    console.error("ERROR conexión PostgreSQL:", err);
  }
})();
