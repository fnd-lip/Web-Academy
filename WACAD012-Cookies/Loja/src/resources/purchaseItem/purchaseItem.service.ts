import { PrismaClient, Purchase, PurchaseItem } from '../../generated/prisma'
import { findOrCreatePurchaseCart } from '../purchase/purchase.service'
import { AddItemToPurchaseCartDto } from './purchaseItem.types'

const prisma = new PrismaClient()

export const addItemToPurchaseCart = async (
  purchaseItem: AddItemToPurchaseCartDto,
  purchaseCart: Purchase,
): Promise<PurchaseItem> => {
  return prisma.purchaseItem.upsert({
    where: {
      productId_purchaseId: {
        productId: purchaseItem.productId,
        purchaseId: purchaseCart.id,
      },
    },
    update: {
      quantity: purchaseItem.quantity,
    },
    create: {
      productId: purchaseItem.productId,
      purchaseId: purchaseCart.id,
      quantity: purchaseItem.quantity,
    },
  })
}

export const increaseItemQuantity = async (productId: string) => {
  const cart = await findOrCreatePurchaseCart()
  return prisma.purchaseItem.update({
    where: {
      productId_purchaseId: {
        productId,
        purchaseId: cart.id,
      },
    },
    data: {
      quantity: {
        increment: 1,
      },
    },
  })
}

export const decreaseItemQuantity = async (productId: string) => {
  const cart = await findOrCreatePurchaseCart()
  return prisma.purchaseItem.update({
    where: {
      productId_purchaseId: {
        productId,
        purchaseId: cart.id,
      },
    },
    data: {
      quantity: {
        decrement: 1,
      },
    },
  })
}

export const removeItemFromCart = async (productId: string) => {
  const cart = await findOrCreatePurchaseCart()
  return prisma.purchaseItem.delete({
    where: {
      productId_purchaseId: {
        productId,
        purchaseId: cart.id,
      },
    },
  })
}
