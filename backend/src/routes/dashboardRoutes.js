import express from "express";
import { prisma } from "../lib/prisma.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get(
  "/dashboard/stats",
  authMiddleware,
  async (req, res) => {
    const totalUsers = await prisma.user.count();

    const activeUsers = await prisma.user.count({
      where: {
        active: true
      }
    });

    const totalAccessLogs = await prisma.accessLog.count();

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const todayAccessLogs = await prisma.accessLog.count({
      where: {
        createdAt: {
          gte: today
        }
      }
    });

    return res.json({
      totalUsers,
      activeUsers,
      totalAccessLogs,
      todayAccessLogs
    });
  }
);

export default router;