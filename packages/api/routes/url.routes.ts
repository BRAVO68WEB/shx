import { Router } from 'express';
import URLStoreController from '../controllers/urlstore.controller';
import APIKeyAuth from '../middlewares/apikey_check';
import {
	urlCreateValidation,
	urlGelAllValidation,
	urlUpdateValidation,
} from '../validators/url.validation';

const urlStoreController = new URLStoreController();
const apiKeyAuth = new APIKeyAuth();

const router = Router();

router.post(
	'/',
	apiKeyAuth.check as any,
	urlCreateValidation as any,
	urlStoreController.create as any
);

router.get('/:urlID', apiKeyAuth.check as any, urlStoreController.fetch as any);

router.get(
	'/',
	apiKeyAuth.check as any,
	urlGelAllValidation as any,
	urlStoreController.getAll as any
);

router.put(
	'/:urlID',
	apiKeyAuth.check as any,
	urlUpdateValidation as any,
	urlStoreController.update as any
);

router.delete(
	'/:urlID',
	apiKeyAuth.check as any,
	urlStoreController.delete as any
);

export default router;
