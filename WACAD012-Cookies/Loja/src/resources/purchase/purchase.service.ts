import { PrismaClient, Purchase } from '../../generated/prisma'
import { PurchaseStatus } from './purchase.constants'

const prisma = new PrismaClient()

export const findOrCreatePurchaseCart = async (
  id: string,
  userId?: string,
): Promise<Purchase> => {
  let purchase = await prisma.purchase.findFirst({
    where: { id },
  })
  if (!purchase)
    purchase = await prisma.purchase.create({
      data: { id, status: PurchaseStatus.opened },
    })
  if (userId && !purchase.userId) await setUserIdToPurchase(purchase.id, userId)
  return purchase
}

export const setUserIdToPurchase = async (
  purchaseId: string,
  userId: string,
) => {
  console.log(purchaseId, userId)
  return prisma.purchase.update({
    where: {
      id: purchaseId,
    },
    data: {
      userId: userId,
    },
  })
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
