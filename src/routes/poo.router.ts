import { Router } from 'express';

import { pooController } from '../controllers';

const router = Router();

router.get('/:babyId', pooController.getAll);
router.post('/', pooController.create);

export default router;
