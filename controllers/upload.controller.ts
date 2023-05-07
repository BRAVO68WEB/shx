import { NextFunction, Response } from 'express';
import { ModRequest } from '../types';
import Uploader from '../services/upload.service';
import { makeResponse } from '../libs';
import { IUploaderController } from '../interfaces/upload.interface';

export default class UploadController
	extends Uploader
	implements IUploaderController
{
	public upload = async (
		req: ModRequest,
		res: Response,
		next: NextFunction
	): Promise<any> => {
		try {
			const { file } = req;
			if (!file) {
				const error = new Error('Please upload a file');
				next(error);
				return;
			}
			let data = await this.uploadS(file, req.user);
			data = {
				...data,
				url: data.upload_url,
			};
			res.status(200).json(makeResponse(data));
		} catch (error: any) {
			next(error);
		}
	};

	public uploadImage = async (
		req: ModRequest,
		res: Response,
		next: NextFunction
	): Promise<any> => {
		try {
			const { file } = req;
			if (!file) {
				const error = new Error('Please upload a image');
				next(error);
				return;
			}
			let data = await this.uploadImageS(file, req.user);
			data = {
				...data,
				url: data.upload_url,
			};
			res.status(200).json(makeResponse(data));
		} catch (error: any) {
			next(error);
		}
	};
}
