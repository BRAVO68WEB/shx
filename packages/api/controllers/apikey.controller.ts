import { NextFunction, Response } from 'express';
import APIKeyService from '../services/apikey.service';
import { ModRequest } from '../types';
import { makeResponse } from '../libs';
import { IAPIKeyController } from '../interfaces/apikey.interface';
import { CustomError } from '../libs/error';

export default class APIKeyController
	extends APIKeyService
	implements IAPIKeyController
{
	public list = async (
		req: ModRequest,
		res: Response,
		next: NextFunction
	): Promise<Response | void> => {
		let apikeys;
		try {
			const { masterkey } = req.query as { masterkey: string };
			apikeys = await this.listS(masterkey);
		} catch (error) {
			return next(error);
		}
		return res.status(200).json(makeResponse(apikeys));
	};

	public generate = async (
		req: ModRequest,
		res: Response,
		next: NextFunction
	): Promise<Response | void> => {
		let apikey;
		try {
			const { masterkey } = req.query as { masterkey: string };
			apikey = await this.generateS(masterkey);
		} catch (error: any) {
			return next(
				new CustomError({
					message: error.message,
					statusCode: 502,
				})
			);
		}
		return res.status(200).json(makeResponse(apikey));
	};

	public revoke = async (
		req: ModRequest,
		res: Response,
		next: NextFunction
	): Promise<Response | void> => {
		let delKey;
		try {
			const { masterkey, apikeyID } = req.query as {
				masterkey: string;
				apikeyID: string;
			};
			delKey = await this.deleteS(apikeyID, masterkey);
		} catch (error) {
			return next(error);
		}
		if (delKey === 0)
			return next(
				new CustomError({
					message: 'API Key not found',
					statusCode: 404,
				})
			);
		return res.status(200).json(makeResponse({ message: 'API Key revoked' }));
	};

	public verify = async (
		req: ModRequest,
		res: Response,
		next: NextFunction
	): Promise<Response | void> => {
		let result;
		try {
			const { apikey } = req.params as { apikey: string };
			result = await this.verifyS(apikey);
		} catch (error) {
			return next(error);
		}
		return res.status(200).json(makeResponse({ result }));
	};
}
