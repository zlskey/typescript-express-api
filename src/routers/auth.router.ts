import { Router } from 'express'

import { authController } from '../controllers'
import { authMiddleware } from '../middlewares'

const router = Router()

router.post('/signup', authController.signup)
router.post('/login', authController.login)
router.get('/logout', authMiddleware, authController.logout)

export default router
