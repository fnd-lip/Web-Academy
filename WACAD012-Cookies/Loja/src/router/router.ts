import { Router } from 'express'
import mainRouter from '../resources/main/main.router'
import productRouter from '../resources/product/product.router'
import purchaseRouter from '../resources/purchase/purchase.router'
import purchaseItemRouter from '../resources/purchaseItem/purchaseItem.router'


const router = Router()

router.use('/', mainRouter)
router.use('/product', productRouter)
router.use('/purchaseItem', purchaseItemRouter)
router.use('/purchase', purchaseRouter)

export default router
