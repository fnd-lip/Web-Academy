import { PrismaClient, Product } from '../../generated/prisma'
import { CreateProductDto } from './product.types'

const prisma = new PrismaClient()

export async function getProducts(): Promise<Product[]> {
  return await prisma.product.findMany({ where: { status: 1 } })
}

export async function createProduct(
  product: CreateProductDto,
): Promise<Product> {
  return await prisma.product.create({
    data: {
      ...product,
      status: 1,
    },
  })
}

export async function getProduct(id: string): Promise<Product | null> {
  return prisma.product.findFirst({ where: { id } })
}

export async function updateProduct(
  id: string,
  product: Partial<CreateProductDto>
): Promise<Product> {
  return prisma.product.update({
    where: { id },
    data: product,
  })
}

export async function removeProduct(id: string): Promise<Product | null> {
  return prisma.product.update({ where: { id }, data: { status: 0 } })
}

