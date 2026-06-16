import express from "express";
import cors from "cors";

import userRoutes from "./routes/userRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import accessLogsRoutes from "./routes/accessLogs.routes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(dashboardRoutes);

app.use(userRoutes);
app.use("/auth", authRoutes);
app.use("/access-logs", accessLogsRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
