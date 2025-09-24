import { Request, Response } from 'express'

const index = async (req: Request, res: Response) => {
  const response = await fetch('https://fakestoreapi.com/products')
  const produtos = await response.json()
  res.render('index', {
    produtos,
  })
}

const read = async (req: Request, res: Response) => {
  const { id } = req.params
  const response = await fetch(`https://fakestoreapi.com/products/${id}`)
  const produto = await response.json()
  res.render('produto', {
    produto,
  })
}
export default { index, read }