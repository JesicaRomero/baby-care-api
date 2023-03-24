import { Router } from 'express'
import userRouter from './user.router'

const router = Router();

router.use("/user/v1", userRouter);

export default router
