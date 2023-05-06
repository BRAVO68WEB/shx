import { Router } from 'express';
import UploadController from '../controllers/upload.controller';
import { UploadFactory } from '../helpers/upload.factory';
import APIKeyAuth from '../middlewares/apikey_check';

const uploadController = new UploadController();
const uploaderFactory = new UploadFactory();
const apiKeyAuth = new APIKeyAuth();

const router = Router();

router.post(
	'/file',
	apiKeyAuth.check as any,
	uploaderFactory.getUploader().single('file'),
	uploadController.upload as any
);

router.post(
	'/image',
	apiKeyAuth.check as any,
	uploaderFactory
		.getUploader({
			mimeFilters: ['image/jpeg', 'image/png', 'image/gif'],
		})
		.single('file'),
	uploadController.uploadImage as any
);

export default router;
