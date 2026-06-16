import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const adminRole = await prisma.role.upsert({
    where: { name: "ADMIN" },
    update: {},
    create: { name: "ADMIN" }
  });

  const supervisorRole = await prisma.role.upsert({
    where: { name: "SUPERVISOR" },
    update: {},
    create: { name: "SUPERVISOR" }
  });

  const funcionarioRole = await prisma.role.upsert({
    where: { name: "FUNCIONARIO" },
    update: {},
    create: { name: "FUNCIONARIO" }
  });

  const passwordHash = await bcrypt.hash("123456", 10);

  await prisma.user.upsert({
    where: { email: "admin@email.com" },
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

  console.log("Banco populado com sucesso!");
  console.log("Admin: admin@email.com");
  console.log("Senha: 123456");
  console.log("Roles criadas:", {
    admin: adminRole.name,
    supervisor: supervisorRole.name,
    funcionario: funcionarioRole.name
  });
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });