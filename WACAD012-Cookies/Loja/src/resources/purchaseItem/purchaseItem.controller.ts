import { Request, Response } from 'express'
import { AddItemToPurchaseCartDto } from './purchaseItem.types'
import { findOrCreatePurchaseCart } from '../purchase/purchase.service'
import { error } from 'node:console'
import {
  addItemToPurchaseCart,
  decreaseItemQuantity,
  increaseItemQuantity,
  removeItemFromCart,
} from './purchaseItem.service'

const add = async (req: Request, res: Response) => {
  const purchaseItem = {
    productId: req.body.productId,
    quantity: parseInt(req.body.quantity),
  } as AddItemToPurchaseCartDto
  try {
    const purChaseCart = await findOrCreatePurchaseCart()
    await addItemToPurchaseCart(purchaseItem, purChaseCart)
    res.redirect('/product')
  } catch (err) {
    console.log(err)
    res
      .status(500)
      .json({ message: 'Erro ao adicionar o item no carrinho de compras' })
  }
}
const increase = async (req: Request, res: Response) => {
  const { id } = req.params
  if (!id) return res.status(400).json({ msg: 'O id é obrigatório' })
  try {
    await increaseItemQuantity(id)
    res.status(200).json({ msg: 'Incremento bem sucedido', success: true })
  } catch (err) {
    res.status(500).json({ msg: 'Incremento mal sucedido', success: false })
  }
}

const decrease = async (req: Request, res: Response) => {
  const { id } = req.params
  if (!id) return res.status(400).json({ msg: 'O id é obrigatório' })
  try {
    await decreaseItemQuantity(id)
    res.status(200).json({ msg: 'Decremento bem sucedido', success: true })
  } catch (err) {
    res.status(500).json({ msg: 'Decremento mal sucedido', success: false })
  }
}

const remove = async (req: Request, res: Response) => {
  const { id } = req.params
  if (!id) return res.status(400).json({ msg: "O id é obrigatório" })
  try {
    await removeItemFromCart(id)
    res.status(200).json({ msg: "Item removido com sucesso", success: true })
  } catch (err) {
    res.status(500).json({ msg: 'Erro ao remover item', success: false })
  }
}

export default {
  add,
  remove,
  increase,
  decrease,
}
