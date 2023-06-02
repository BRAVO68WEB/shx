import { Router } from 'express';
import APIKeyAuth from '../middlewares/apikey_check';
import ConfigController from '../controllers/config.controller';
import { setConfigValidation } from '../validators/settings.validation';

const configController = new ConfigController();
const apiKeyAuth = new APIKeyAuth();

const router = Router();

router.get('/', apiKeyAuth.check as any, configController.getAllConfig as any);

router.post(
	'/',
	apiKeyAuth.check as any,
	setConfigValidation as any,
	configController.setConfig as any
);

router.get('/:key', apiKeyAuth.check as any, configController.getConfig as any);

export default router;
