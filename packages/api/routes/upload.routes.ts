import { Hono } from 'hono';
import UploadController from '../controllers/upload.controller';
import APIKeyAuth from '../middlewares/apikey_check';
import { Bindings, Variables } from '../types';

const uploadController = new UploadController();
const apiKeyAuth = new APIKeyAuth();

const router = new Hono<{ Bindings: Bindings, Variables: Variables }>();

router.post(
	'/file',
	apiKeyAuth.check,
	uploadController.upload
);

router.get(
	'/',
	apiKeyAuth.check,
	uploadController.getAllFiles
);

router.get(
	'/:fileID',
	apiKeyAuth.check,
	uploadController.getFile
);

router.get(
	'/delete/:fileID',
	uploadController.deleteFile
);

export default router;
