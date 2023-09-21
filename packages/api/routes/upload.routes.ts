import { Hono } from 'hono';
import UploadController from '../controllers/upload.controller';
import APIKeyAuth from '../middlewares/apikey_check';

const uploadController = new UploadController();
const apiKeyAuth = new APIKeyAuth();

const router = new Hono();

router.post(
	'/file',
	apiKeyAuth.check,
	uploadController.upload
);

router.post(
	'/image',
	apiKeyAuth.check,
	uploadController.uploadImage
);

router.post(
	'/image-from-url',
	apiKeyAuth.check,
	uploadController.uploadImageFromURL
);

router.post(
	'/file-from-url',
	apiKeyAuth.check,
	uploadController.uploadFileFromURL
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
