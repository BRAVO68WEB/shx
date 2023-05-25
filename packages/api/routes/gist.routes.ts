import { Router } from 'express';
import APIKeyAuth from '../middlewares/apikey_check';
import GistController from '../controllers/gists.controller';

const gistController = new GistController();
const apiKeyAuth = new APIKeyAuth();

const router = Router();

router.post('/', apiKeyAuth.check as any, gistController.create as any);

router.get('/:gistID', gistController.get as any);

router.get('/:gistID/raw', gistController.getRaw as any);

router.get('/', apiKeyAuth.check as any, gistController.getAll as any);

router.put('/:gistID', apiKeyAuth.check as any, gistController.update as any);

router.delete(
	'/:gistID',
	apiKeyAuth.check as any,
	gistController.delete as any
);

export default router;
