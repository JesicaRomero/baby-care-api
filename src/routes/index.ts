import { Router } from 'express'
import userRouter from './user.router'
import pooRouter from './poo.router'
import appointmentRouter from './appointment.router'

const router = Router()

router.use('/api/v1/user', userRouter)
router.use('/api/v1/poo', pooRouter)
router.use('/api/v1/appointment', appointmentRouter)

export default router
