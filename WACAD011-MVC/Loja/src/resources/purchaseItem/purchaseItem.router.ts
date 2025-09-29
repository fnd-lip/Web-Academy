import { Router } from 'express'
import purchaseItemController from './purchaseItem.controller'

const router = Router()

router.post("/add", purchaseItemController.add)
router.post("/increase/:id", purchaseItemController.increase)
router.post("/decrease/:id", purchaseItemController.decrease)
router.post("/remove/:id", purchaseItemController.remove)

export default router 