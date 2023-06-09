import { NextFunction, Response } from 'express';
import { ModRequest } from '../types';
import SxcuService from '../services/sxcu.service';
import { ISXCUController } from '../interfaces/sxcu.interface';

export default class SxcuController
	extends SxcuService
	implements ISXCUController
{
	public image = async (
		req: ModRequest,
		res: Response,
		next: NextFunction
	): Promise<Response | void> => {
		try {
			const fileData = await this.createUploadImageSxcu(
				req.user.apiKey,
				req.protocol + '://' + req.hostname
			);
			res.send(fileData);
		} catch (error: any) {
			next(error);
		}
	};

	public file = async (
		req: ModRequest,
		res: Response,
		next: NextFunction
	): Promise<Response | void> => {
		try {
			const fileData = await this.createUploadFileSxcu(
				req.user.apiKey,
				req.protocol + '://' + req.hostname
			);
			res.send(fileData);
		} catch (error: any) {
			next(error);
		}
	};

	public url = async (
		req: ModRequest,
		res: Response,
		next: NextFunction
	): Promise<Response | void> => {
		try {
			const fileData = await this.createURLShrinkSxcu(
				req.user.apiKey,
				req.protocol + '://' + req.hostname
			);
			res.send(fileData);
		} catch (error: any) {
			next(error);
		}
	};

	public text = async (
		req: ModRequest,
		res: Response,
		next: NextFunction
	): Promise<Response | void> => {
		try {
			const fileData = await this.createPasteSxcu(
				req.user.apiKey,
				req.protocol + '://' + req.hostname
			);
			res.send(fileData);
		} catch (error: any) {
			next(error);
		}
	};
}
