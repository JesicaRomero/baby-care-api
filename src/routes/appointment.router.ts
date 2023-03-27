import { Router } from 'express';

import { appointmentController } from '../controllers';

const router = Router();

router.get('/:babyId', appointmentController.getAll);
router.post('/', appointmentController.create);

export default router;
