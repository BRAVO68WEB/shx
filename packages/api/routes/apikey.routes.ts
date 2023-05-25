import { Router } from 'express';
import APIKeyController from '../controllers/apikey.controller';

const apiKeyController = new APIKeyController();

const router = Router();

router.get('/', apiKeyController.list as any);

router.post('/', apiKeyController.generate as any);

router.delete('/', apiKeyController.revoke as any);

router.get('/verify/:apikey', apiKeyController.verify as any);

export default router;
