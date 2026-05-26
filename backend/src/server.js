import express from "express";

import userRoutes from "./routes/userRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import accessLogsRoutes from "./routes/accessLogs.routes.js";

const app = express();

app.use(express.json());

app.use(userRoutes);
app.use("/auth", authRoutes);
app.use("/access-logs", accessLogsRoutes);

app.listen(3000, () => {
  console.log("Servidor rodando");
});