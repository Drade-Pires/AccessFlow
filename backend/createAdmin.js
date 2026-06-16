import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  let adminRole = await prisma.role.findUnique({
    where: {
      name: "ADMIN"
    }
  });

  if (!adminRole) {
    adminRole = await prisma.role.create({
      data: {
        name: "ADMIN"
      }
    });
  }

  const passwordHash = await bcrypt.hash("123456", 10);

  const admin = await prisma.user.upsert({
    where: {
      email: "admin@email.com"
    },
    update: {
      roleId: adminRole.id,
      active: true
    },
    create: {
      name: "Administrador",
      email: "admin@email.com",
      password: passwordHash,
      roleId: adminRole.id
    }
  });

  console.log("Admin criado:", admin.email);
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });