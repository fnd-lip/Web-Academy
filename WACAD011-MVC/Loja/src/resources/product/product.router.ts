import { Router } from 'express'
import productController from './product.controller'

const router = Router()

router.get('/', productController.index)
router.get('/create', productController.create)
router.post('/create', productController.create)
router.get('/read/:id', productController.read)
router.get('/update/:id', productController.update)
router.post('/update/:id', productController.update)
router.post('/remove/:id', productController.remove)
router.get('/', productController.index)

export default router
