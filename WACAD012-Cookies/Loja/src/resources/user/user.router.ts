import { Router } from 'express'
import userController from './user.controller'
import isAdmin from '../../middlewares/isAdmin'

const router = Router()

router.get('/create', isAdmin, userController.create)
router.post('/create', isAdmin, userController.create)

export default router
