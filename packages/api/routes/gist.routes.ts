import { Router } from 'express';
import APIKeyAuth from '../middlewares/apikey_check';
import GistController from '../controllers/gists.controller';
import {
	gistCreationValidation,
	gistGetValidation,
	gistListValidation,
	gistUpdateValidation,
} from '../validators/gist.validation';

const gistController = new GistController();
const apiKeyAuth = new APIKeyAuth();

const router = Router();

router.post(
	'/',
	apiKeyAuth.check as any,
	gistCreationValidation as any,
	gistController.create as any
);

router.get('/:gistID', gistGetValidation, gistController.get as any);

router.get('/:gistID/raw', gistGetValidation, gistController.getRaw as any);

router.get(
	'/',
	apiKeyAuth.check as any,
	gistListValidation as any,
	gistController.getAll as any
);

router.put(
	'/:gistID',
	apiKeyAuth.check as any,
	gistUpdateValidation as any,
	gistController.update as any
);

router.delete(
	'/:gistID',
	apiKeyAuth.check as any,
	gistController.delete as any
);

export default router;
