import { Router } from 'express'

import { userController } from '../controllers'

const router = Router()

router.post('/login', userController.login)

export default router
