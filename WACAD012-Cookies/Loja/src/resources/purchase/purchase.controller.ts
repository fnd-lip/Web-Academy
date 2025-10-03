import { Request, Response } from 'express'
import { findItemsFromPurchaseCart } from './purchase.service'

const cart = async (req: Request, res: Response) => {
  try {
    if (!req.session.guestPurchaseId)
      throw new Error('Id do carrinho não definido')
    const cart = await findItemsFromPurchaseCart(req.session.guestPurchaseId)
    if (!cart) throw new Error('Carrinho não existe')

    const totalPrice = cart.Items.reduce(
      (acc, v) => acc + v.quantity * Number(v.product.price),
      0,
    )
    res.render('purchase/cart', {
      cartItems: cart.Items,
      totalPrice: totalPrice.toFixed(2).replace('.', ','),
    })
  } catch (err) {
    res.status(500).json({ error: 'Erro ao recuperar itens' })
  }
}
export default { cart }
