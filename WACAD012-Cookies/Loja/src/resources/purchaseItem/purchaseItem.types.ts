import { PurchaseItem } from '../../generated/prisma'

export type AddItemToPurchaseCartDto = Pick<
  PurchaseItem,
  'productId' | 'quantity'
>
