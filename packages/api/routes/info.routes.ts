import { Hono } from 'hono';
import APIKeyAuth from '../middlewares/apikey_check';
import InfoController from '../controllers/info.controller';

const infoController = InfoController;
const apiKeyAuth = new APIKeyAuth();

const router = new Hono();

router.get('/sys', apiKeyAuth.check, infoController.get);

export default router;
