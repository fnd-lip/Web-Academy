import { Router } from 'express'
import mainController from './main.controller'

const router = Router()

router.get('/', mainController.index)
router.get('/hb1', mainController.hb1)
router.get('/hb2', mainController.hb2)
router.get('/hb3', mainController.hb3)
router.get('/hb4', mainController.hb4)
router.get('/hb5', mainController.hb5)
router.get('/sobre', mainController.sobre)

export default router
