/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { Request, Response } from 'express'
import { UploadedFile } from 'express-fileupload'
import { v4 as uuidv4 } from 'uuid'

import {
  createProduct,
  getProduct,
  getProducts,
  removeProduct,
} from './product.service'
import { CreateProductDto } from './product.types'
import productSchema from './product.schema'
import validator from '../../utils/validator'

const index = async (req: Request, res: Response) => {
  const products = await getProducts()
  res.render('product/index', { products })
}
const create = async (req: Request, res: Response) => {
  if (req.method === 'GET') {
    //mostrar o formulário
    res.render('product/create')
  } else {
    try {
      const errors = validator(productSchema, req.body)
      if (Object.keys(errors).length > 0 || !req.files || !req.files.image) {
        if (!req.files || !req.files.image) {
          errors['image'] = 'A imagem do produto é obrigatória'
        }
        return res.render('product/create', {
          product: req.body,
          errors,
        })
      }

      const image = req.files.image as UploadedFile
      const publicFolder = `${process.cwd()}/public`
      const imagePath = `/img/product/${uuidv4()}-${image.name}`
      image.mv(`${publicFolder}${imagePath}`)
      const product = {
        ...(req.body as CreateProductDto),
        stock: parseInt(req.body.stock),
        image: imagePath,
      }
      await createProduct(product)
      res.redirect('/product')
    } catch (err) {
      console.log(err)
    }
  }
}
const read = async (req: Request, res: Response) => {
  const { id } = req.params
  if (!id) return res.status(400).json({ msg: 'rota inexistente' })
  try {
    const product = await getProduct(id)
    const quantityArray = Array.from({ length:10}, (value, i) => i + 1) 
    if (!product)
      return res
        .status(404)
        .json({ msg: 'Não existe produto com o id informado' })
    res.render('product/read', { product, quantityArray })
  } catch (err) {
    console.log(err)
  }
}
const update = async (req: Request, res: Response) => {
  const { id } = req.params
  if (!id) return res.status(400).json({ msg: 'O id do produto é obrigatório' })
  const product = await getProduct(id)
  if (req.method === 'GET') {
    res.render('product/update', { product })
  }
}

const remove = async (req: Request, res: Response) => {
  const { id } = req.params
  if (!id) return res.status(400).json({ msg: 'O id do produto é obrigatório' })
  try {
    const product = await removeProduct(id)
    res.status(200).json({ msg: 'Produto removido com sucesso', success: true })
  } catch (err) {
    res.status(500).json({ msg: 'Deleção mal sucedida', success: false })
  }
}

export default { index, create, read, update, remove }
