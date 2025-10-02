import { PrismaClient, Purchase } from '../../generated/prisma'
import { PurchaseStatus } from './purchase.constants'

const prisma = new PrismaClient()

export const findOrCreatePurchaseCart = async (): Promise<Purchase> => {
  let purchase = await prisma.purchase.findFirst({
    where: { status: PurchaseStatus.opened },
  })
  if (!purchase)
    purchase = await prisma.purchase.create({
      data: { status: PurchaseStatus.opened },
    })
  return purchase
}

export const findItemsFromPurchaseCart = async () => {
  const cart = await findOrCreatePurchaseCart()
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
