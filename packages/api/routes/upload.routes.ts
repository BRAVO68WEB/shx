import { Router } from 'express';
import UploadController from '../controllers/upload.controller';
import { UploadFactory } from '../helpers/upload.factory';
import APIKeyAuth from '../middlewares/apikey_check';
import {
	deleteFileValidation,
	urlUploadValidation,
	listFileValidation,
} from '../validators/upload.validation';

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

router.post(
	'/image-from-url',
	apiKeyAuth.check as any,
	urlUploadValidation as any,
	uploadController.uploadImageFromURL as any
);

router.post(
	'/file-from-url',
	apiKeyAuth.check as any,
	urlUploadValidation as any,
	uploadController.uploadFileFromURL as any
);

router.get(
	'/',
	apiKeyAuth.check as any,
	listFileValidation as any,
	uploadController.getAllFiles as any
);

router.get(
	'/:fileID',
	apiKeyAuth.check as any,
	uploadController.getFile as any
);

router.get(
	'/delete/:fileID',
	deleteFileValidation as any,
	uploadController.deleteFile as any
);

export default router;
