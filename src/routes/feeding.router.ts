import { Router } from 'express';
import { feedingController } from '../controllers'

const router = Router();

router.get('/:babyId', feedingController.getAll);
router.post('/', feedingController.create);

export default router;