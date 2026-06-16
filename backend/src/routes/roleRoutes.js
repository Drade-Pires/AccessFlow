import express from "express";
import { prisma } from "../lib/prisma.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { roleMiddleware } from "../middlewares/roleMiddleware.js";

const router = express.Router();

router.get("/roles", authMiddleware, roleMiddleware("ADMIN"), async (req, res) => {
  const roles = await prisma.role.findMany({
    orderBy: {
      name: "asc"
    }
  });

  return res.json(roles);
});

export default router;