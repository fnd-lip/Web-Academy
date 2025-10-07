import { Router } from 'express'
import productController from './product.controller'
import isAdmin from '../../middlewares/isAdmin'

const router = Router()

router.get('/', productController.index)
router.get('/create', isAdmin, productController.create)
router.post('/create', isAdmin, productController.create)
router.get('/read/:id', productController.read)
router.get('/update/:id', isAdmin, productController.update)
router.post('/update/:id', isAdmin, productController.update)
router.post('/remove/:id', isAdmin, productController.remove)

export default router
