import { NextFunction, Response } from 'express';
import { ModRequest } from '../types';
import { makeResponse } from '../libs';
import { CustomError } from '../libs/error';
import InfoService from '../services/info.service';

export default class InfoController extends InfoService {
	public static get = async (
		req: ModRequest,
		res: Response,
		next: NextFunction
	): Promise<Response | void> => {
		try {
			const data = await this.getSystemInfo();
			res.status(200).json(makeResponse(data));
		} catch (error: any) {
			next(
				new CustomError({
					message: error.message,
					statusCode: 502,
				})
			);
		}
	};
}
