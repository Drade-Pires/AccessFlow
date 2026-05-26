import bcrypt from "bcrypt";
import { prisma } from "../lib/prisma.js";

import express from "express";
import jwt from "jsonwebtoken";

const router = express.Router();

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await prisma.user.findUnique({
    where: {
      email
    },
    include: {
      role: true
    }
  });

  if (!user) {
    return res.status(401).json({
      message: "Email ou senha inválidos"
    });
  }

  const passwordMatch = await bcrypt.compare(password, user.password);

  if (!passwordMatch) {
    return res.status(401).json({
      message: "Email ou senha inválidos"
    });
  }

  const token = jwt.sign(
    {
      id: user.id,
      name: user.name,
      role: user.role.name
    },
    process.env.JWT_SECRET || "segredo_teste",
    {
      expiresIn: "1d"
    }
  );

  return res.json({
    message: "Login realizado com sucesso",
    token
  });
});

router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,

      role: {
        connect: {
          name: "FUNCIONARIO"
        }
      }
    }
  });

  return res.json({
  id: user.id,
  name: user.name,
  email: user.email
});
});

export default router;