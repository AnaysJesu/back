import express from "express";
import { pool } from "../db.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    console.log("POST /api/pacientes -> body:", req.body);

    const {
      rut, nombres, apellidos, direccion, ciudad,
      telefono, email, fecha_nacimiento, estado_civil, comentarios
    } = req.body;

    // validación mínima
    if (!rut || !nombres || !apellidos) {
      return res.status(400).json({ error: "Faltan campos requeridos: rut, nombres o apellidos" });
    }

    const params = [
      rut,
      nombres,
      apellidos,
      direccion || null,
      ciudad || null,
      telefono || null,
      email || null,
      fecha_nacimiento || null,
      estado_civil || null,
      comentarios || null
    ];
    console.log("SQL params:", params);

    const result = await pool.query(
      `INSERT INTO pacientes 
       (rut, nombres, apellidos, direccion, ciudad, telefono, email, fecha_nacimiento, estado_civil, comentarios)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10) RETURNING *`,
      params
    );

    console.log("Insert OK -> id:", result.rows[0].id);
    return res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error("Error en POST /api/pacientes:", error);
    // Para debug local devolvemos el message / code (no en producción)
    return res.status(500).json({ error: error.message, code: error.code, detail: error.detail });
  }
});

// ➡️ Buscar por apellido
router.get("/buscar/:apellido", async (req, res) => {
  try {
    const { apellido } = req.params;
    const result = await pool.query(
      `SELECT * FROM pacientes WHERE apellidos ILIKE $1`,
      [`%${apellido}%`]
    );
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: "Error en búsqueda" });
  }
});

export default router;
