import { Router } from 'express';
import APIKeyAuth from '../middlewares/apikey_check';
import InfoController from '../controllers/info.controller';

const infoController = InfoController;
const apiKeyAuth = new APIKeyAuth();

const router = Router();

router.get('/sys', apiKeyAuth.check as any, infoController.get as any);

export default router;
