import { pool } from "./db.js";

(async () => {
  try {
    // Crear la tabla si no existe
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
      )
    `);
    console.log("Tabla pacientes creada ✅");

    // Insertar paciente de ejemplo
    const result = await pool.query(
      `INSERT INTO pacientes 
        (rut, nombres, apellidos, direccion, ciudad, telefono, email, fecha_nacimiento, estado_civil, comentarios)
       VALUES
        ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)
       RETURNING *`,
      [
        "12345678-9",
        "Juan",
        "Pérez",
        "Av. Siempre Viva 123",
        "Santiago",
        "987654321",
        "juan@example.com",
        "1990-05-01",
        "Soltero",
        "Paciente de ejemplo"
      ]
    );

    console.log("Paciente insertado ✅", result.rows[0]);

  } catch (err) {
    console.error("Error en initDb:", err);
  } finally {
    await pool.end();
    console.log("Conexión cerrada ✅");
  }
})();
