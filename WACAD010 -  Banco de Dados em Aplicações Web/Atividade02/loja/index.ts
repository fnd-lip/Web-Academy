import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

async function main() {
  // Criar categoria
  const categoria = await prisma.categoria.create({
    data: {
      nome: "Eletrônicos",
    },
  })

  // Criar cliente
  const cliente = await prisma.cliente.create({
    data: {
      nome: "João Silva",
      cpf: "12345678901",
      email: "joao@email.com",
    },
  })

  console.log({ categoria, cliente })
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  })
