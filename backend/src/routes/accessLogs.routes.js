import express from "express";
import { prisma } from "../lib/prisma.js";

const router = express.Router();

router.get("/", async (req, res) => {

  const logs = await prisma.accessLog.findMany({
    include: {
      user: true
    }
  });

  res.json(logs);
});

router.post("/", async (req, res) => {

  const { userId, type, status } = req.body;

  const log = await prisma.accessLog.create({
    data: {
      userId,
      type,
      status
    }
  });

  res.status(201).json(log);
});

export default router;