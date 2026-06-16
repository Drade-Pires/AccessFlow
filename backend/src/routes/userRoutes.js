import express from "express";
import bcrypt from "bcrypt";
import { prisma } from "../lib/prisma.js";

import { authMiddleware } from "../middlewares/authMiddleware.js";
import { roleMiddleware } from "../middlewares/roleMiddleware.js";

const router = express.Router();

const getUsers = async (req, res) => {
  const users = await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      active: true,
      roleId: true,
      createdAt: true,
      updatedAt: true,
      role: true
    },
    orderBy: {
      createdAt: "desc"
    }
  });

  return res.json(users);
};

const getUserById = async (req, res) => {
  const { id } = req.params;

  const user = await prisma.user.findUnique({
    where: { id },
    select: {
      id: true,
      name: true,
      email: true,
      active: true,
      roleId: true,
      createdAt: true,
      updatedAt: true,
      role: true
    }
  });

  if (!user) {
    return res.status(404).json({
      message: "Usuário não encontrado"
    });
  }

  return res.json(user);
};

const createUser = async (req, res) => {
  const { name, email, password, roleId } = req.body;

  if (!name || !email || !password || !roleId) {
    return res.status(400).json({
      message: "Nome, email, senha e perfil são obrigatórios"
    });
  }

  const userAlreadyExists = await prisma.user.findUnique({
    where: { email }
  });

  if (userAlreadyExists) {
    return res.status(400).json({
      message: "Email já cadastrado"
    });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
      roleId
    },
    select: {
      id: true,
      name: true,
      email: true,
      active: true,
      roleId: true,
      createdAt: true,
      updatedAt: true,
      role: true
    }
  });

  return res.status(201).json(user);
};

const updateUser = async (req, res) => {
  const { id } = req.params;
  const { name, email, active, roleId } = req.body;

  const user = await prisma.user.update({
    where: { id },
    data: {
      name,
      email,
      active,
      roleId
    },
    select: {
      id: true,
      name: true,
      email: true,
      active: true,
      roleId: true,
      updatedAt: true,
      role: true
    }
  });

  return res.json(user);
};

const updateUserStatus = async (req, res) => {
  const { id } = req.params;
  const { active } = req.body;

  const user = await prisma.user.update({
    where: { id },
    data: {
      active
    },
    select: {
      id: true,
      name: true,
      email: true,
      active: true,
      updatedAt: true
    }
  });

  return res.json(user);
};

const deleteUser = async (req, res) => {
  const { id } = req.params;

  await prisma.user.delete({
    where: { id }
  });

  return res.json({
    message: "Usuário removido com sucesso"
  });
};

router.get(
  "/users",
  authMiddleware,
  roleMiddleware("ADMIN"),
  getUsers
);

router.get(
  "/users/:id",
  authMiddleware,
  roleMiddleware("ADMIN"),
  getUserById
);

router.post(
  "/users",
  authMiddleware,
  roleMiddleware("ADMIN"),
  createUser
);

router.put(
  "/users/:id",
  authMiddleware,
  roleMiddleware("ADMIN"),
  updateUser
);

router.patch(
  "/users/:id/status",
  authMiddleware,
  roleMiddleware("ADMIN"),
  updateUserStatus
);

router.delete(
  "/users/:id",
  authMiddleware,
  roleMiddleware("ADMIN"),
  deleteUser
);

export default router;