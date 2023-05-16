import { Router } from 'express';
import URLStoreController from '../controllers/urlstore.controller';
import APIKeyAuth from '../middlewares/apikey_check';

const urlStoreController = new URLStoreController();
const apiKeyAuth = new APIKeyAuth();

const router = Router();

router.post('/', apiKeyAuth.check as any, urlStoreController.create as any);

export default router;
