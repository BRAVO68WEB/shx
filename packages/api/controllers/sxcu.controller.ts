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
			const { apikey } = req.query as {
				apikey: string;
			};
			const fileData = await this.createUploadImageSxcu(
				apikey,
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
			const { apikey } = req.query as {
				apikey: string;
			};
			const fileData = await this.createUploadFileSxcu(
				apikey,
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
			const { apikey } = req.query as {
				apikey: string;
			};
			const fileData = await this.createURLShrinkSxcu(
				apikey,
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
			const { apikey } = req.query as {
				apikey: string;
			};
			const fileData = await this.createPasteSxcu(
				apikey,
				req.protocol + '://' + req.hostname
			);
			res.send(fileData);
		} catch (error: any) {
			next(error);
		}
	};
}
