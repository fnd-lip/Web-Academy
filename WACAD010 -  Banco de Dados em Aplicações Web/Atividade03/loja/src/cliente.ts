import { PrismaClient, Cliente } from "@prisma/client";

const prisma = new PrismaClient();

export const ClienteRepository = {
  async create(data: Omit<Cliente, "id_cliente">): Promise<Cliente> {
    return prisma.cliente.create({ data });
  },

  async findAll(): Promise<Cliente[]> {
    return prisma.cliente.findMany();
  },

  async findById(id: number): Promise<Cliente | null> {
    return prisma.cliente.findUnique({
      where: { id_cliente: id },
    });
  },

  async update(id: number, data: Partial<Cliente>): Promise<Cliente> {
    return prisma.cliente.update({
      where: { id_cliente: id },
      data,
    });
  },

  async delete(id: number): Promise<Cliente> {
    return prisma.cliente.delete({
      where: { id_cliente: id },
    });
  },
};
