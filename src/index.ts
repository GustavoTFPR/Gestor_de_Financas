import express from "express";
import type { Application } from "express";
import { AppDataSource } from "./data-source.js";
import { userRoutes } from "./routes/userRoutes.js";
import { categoriaRoutes } from "./routes/categoriaRoutes.js";
import { traRoutes } from "./routes/traRoutes.js";
import { authRoutes } from "./routes/authRoutes.js";
import { errorMiddleware } from "./middlewares/errorMiddleware.js";

const app: Application = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use("/api/usuario", userRoutes);
app.use("/api/categoria", categoriaRoutes);
app.use("/api/transacao", traRoutes);
app.use("/api", authRoutes);

app.use(errorMiddleware); // ← deve ser o ÚLTIMO

AppDataSource.initialize()
  .then(() => {
    console.log("Banco conectado!");
    app.listen(process.env.PORT, () => {
      console.log(`Servidor rodando em http://localhost:${port}`);
    });
  })
  .catch((error) => console.log("Erro ao conectar no banco: ", error));