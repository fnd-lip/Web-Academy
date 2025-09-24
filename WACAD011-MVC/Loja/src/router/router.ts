import { Router } from 'express'
import mainRouter from '../resources/main/main.router'
import productRouter from '../resources/product/product.router'

const router = Router()

router.use('/', mainRouter)
router.use('/product', productRouter)

export default router
