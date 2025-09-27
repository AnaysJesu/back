import { pool } from "./db.js";

const initDb = async () => {
  try {
    // Crear tabla si no existe
    await pool.query(`
      CREATE TABLE IF NOT EXISTS pacientes (
        id SERIAL PRIMARY KEY,
        rut VARCHAR(12) NOT NULL,
        nombres VARCHAR(100) NOT NULL,
        apellidos VARCHAR(100) NOT NULL,
        direccion VARCHAR(200),
        ciudad VARCHAR(100),
        telefono VARCHAR(20),
        email VARCHAR(100),
        fecha_nacimiento DATE,
        estado_civil VARCHAR(20),
        comentarios TEXT
      );
    `);
    console.log("Tabla pacientes creada ✅");

    // Insertar paciente inicial de ejemplo
    const result = await pool.query(`
      INSERT INTO pacientes (rut, nombres, apellidos, email, estado_civil)
      VALUES ('11111111-1', 'Juan', 'Pérez', 'juan@example.com', 'Soltero')
      RETURNING *;
    `);

    console.log("Paciente inicial insertado ✅", result.rows[0]);
  } catch (err) {
    console.error("Error initDbRender:", err);
  } finally {
    pool.end();
    console.log("Conexión cerrada ✅");
  }
};

initDb();
