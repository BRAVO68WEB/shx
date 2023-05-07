import { Router } from 'express';
import APIKeyAuth from '../middlewares/apikey_check';
import SXCUController from '../controllers/sxcu.controller';

const sxcuController = new SXCUController();
const apiKeyAuth = new APIKeyAuth();

const router = Router();

router.get('/file.sxcu', apiKeyAuth.check as any, sxcuController.file as any);

router.get('/image.sxcu', apiKeyAuth.check as any, sxcuController.image as any);

router.get('/url.sxcu', apiKeyAuth.check as any, sxcuController.url as any);

router.get('/gist.sxcu', apiKeyAuth.check as any, sxcuController.text as any);

export default router;
