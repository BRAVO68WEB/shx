import { NextFunction, Response } from 'express';
import { ModRequest } from '../types';
import Uploader from '../services/upload.service';

export default class UploadController extends Uploader {
	public upload = async (
		req: ModRequest,
		res: Response,
		next: NextFunction
	) => {
		try {
			const { file } = req;
			if (!file) {
				const error = new Error('Please upload a file');
				next(error);
				return;
			}
			const data = await this.uploadS(file, req.user);
			res.status(200).json({
				success: true,
				message: 'File uploaded successfully',
				data,
			});
		} catch (error: any) {
			next(error);
		}
	};

	public uploadImage = async (
		req: ModRequest,
		res: Response,
		next: NextFunction
	) => {
		try {
			const { file } = req;
			if (!file) {
				const error = new Error('Please upload a image');
				next(error);
				return;
			}
			const data = await this.uploadImageS(file, req.user);
			res.status(200).json({
				success: true,
				message: 'Image uploaded successfully',
				data,
			});
		} catch (error: any) {
			next(error);
		}
	};
}
