import { Router } from 'express';

import { appointmentController } from '../controllers';

const router = Router();

router.get('/:babyId', appointmentController.getAll);
router.get('/:babyId/:id', appointmentController.getOne);
router.post('/', appointmentController.create);
router.put('/:id', appointmentController.update);
router.delete('/:id', appointmentController.deleteOne);

export default router;
