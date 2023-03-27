import { Router } from 'express';
import vaccineController from '../controllers/vaccine.controller';

const router = Router();

router.get('/', vaccineController.getAll);
router.get('/:period', vaccineController.getVaccineByPeriod);
router.get('/:communityCode', vaccineController.getVaccineByCommunity);

export default router;