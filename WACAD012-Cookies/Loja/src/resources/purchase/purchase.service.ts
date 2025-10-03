import { PrismaClient, Purchase } from '../../generated/prisma'
import { PurchaseStatus } from './purchase.constants'

const prisma = new PrismaClient()

export const findOrCreatePurchaseCart = async (id: string): Promise<Purchase> => {
  let purchase = await prisma.purchase.findFirst({
    where: { id }
  })
  if (!purchase)
    purchase = await prisma.purchase.create({
      data: { id, status: PurchaseStatus.opened },
    })
  return purchase
}

export const findItemsFromPurchaseCart = async (id: string) => {
  const cart = await findOrCreatePurchaseCart(id)
  return prisma.purchase.findFirst({
    where: {
      id: cart.id,
    },
    include: {
      Items: {
        select: {
          quantity: true,
          product: {
            select: {
              id: true,
              name: true,
              price: true,
              image: true,
            },
          },
        },
      },
    },
  })
}
