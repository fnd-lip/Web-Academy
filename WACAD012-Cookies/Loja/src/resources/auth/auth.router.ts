import { Router } from 'express'
import authController from './auth.controller'

const router = Router()

router.get('/signup', authController.signup)
router.post('/signup', authController.signup)
router.get('/login', authController.login)
router.post('/login', authController.login)
router.post('/logout', authController.logout)

export default router