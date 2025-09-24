import { Router } from 'express'
import productController from './product.controller'

const router = Router()


router.get('/', productController.index)

router.get('/:id', productController.read)


export default router