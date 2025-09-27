import { pool } from "./db.js";

(async () => {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS pacientes (
        id SERIAL PRIMARY KEY,
        rut VARCHAR(20) NOT NULL,
        nombres VARCHAR(100) NOT NULL,
        apellidos VARCHAR(100) NOT NULL,
        direccion TEXT,
        ciudad VARCHAR(100),
        telefono VARCHAR(20),
        email VARCHAR(100),
        fecha_nacimiento DATE,
        estado_civil VARCHAR(20),
        comentarios TEXT
      );
    `);
    console.log("Tabla pacientes creada ✅");
    process.exit(0);
  } catch (err) {
    console.error("Error creando tabla:", err);
    process.exit(1);
  }
})();
