import { Router } from 'express';
import { feedingController } from '../controllers'

const router = Router();

router.post('/', feedingController.create);
router.get('/:babyId', feedingController.getAll);
router.get('/:babyId/:id', feedingController.getOneFeeding);
router.put('/:id', feedingController.updateFeeding);
router.delete('/:id', feedingController.deleteFeeding);

export default router;