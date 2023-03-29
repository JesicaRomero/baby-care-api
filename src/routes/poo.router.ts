import { Router } from 'express';

import { pooController } from '../controllers';

const router = Router();

router.get('/:babyId', pooController.getAll);
router.get('/:babyId/:id', pooController.getOne);
router.post('/', pooController.create);
router.put('/:id', pooController.update);
router.delete('/:id', pooController.deleteOne);

export default router;
