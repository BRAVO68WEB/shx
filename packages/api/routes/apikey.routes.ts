import { Router } from 'express';
import APIKeyController from '../controllers/apikey.controller';
import {
	apiKeyLCValidation,
	apiKeyRevokeValidation,
} from '../validators/apikey.validation';

const apiKeyController = new APIKeyController();

const router = Router();

router.get('/', apiKeyLCValidation as any, apiKeyController.list as any);

router.post('/', apiKeyLCValidation as any, apiKeyController.generate as any);

router.delete(
	'/',
	apiKeyRevokeValidation as any,
	apiKeyController.revoke as any
);

router.get('/verify/:apikey', apiKeyController.verify as any);

export default router;
