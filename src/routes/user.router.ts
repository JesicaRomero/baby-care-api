import { Router } from 'express';

import { userController } from '../controllers';

const router = Router();

router.post('/login', userController.login);
router.post('/register', userController.register);
router.put('/edit-profile', userController.editProfile);

export default router;
