import express from "express";
import { prisma } from "../lib/prisma.js";

import { authMiddleware } from "../middlewares/authMiddleware.js";
import { roleMiddleware } from "../middlewares/roleMiddleware.js";

const router = express.Router();

const getUsers = async (req, res) => {
  const users = await prisma.user.findMany();

return res.json(users);
};

router.get(
  "/users",
  authMiddleware,
  roleMiddleware("ADMIN"),
  getUsers
);

export default router;