import express from "express";
import cors from "cors";
import morgan from "morgan";
import pacientesRoutes from "./routes/pacientes.js";

const app = express();
const PORT = process.env.PORT || 3000;

// middlewares
app.use(cors());
app.use(morgan("dev"));
app.use(express.json()); // <-- necesario para leer JSON del body

// rutas
app.use("/api/pacientes", pacientesRoutes);

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
