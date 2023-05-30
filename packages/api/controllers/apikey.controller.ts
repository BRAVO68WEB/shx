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
	): Promise<any> => {
		try {
			const { masterkey } = req.query as { masterkey: string };
			const apikeys = await this.listS(masterkey);
			// TODO: Enpacsulate API Key to avoid showing entire key after generation
			return res.status(200).json(makeResponse(apikeys));
		} catch (error) {
			next(error);
		}
	};

	public generate = async (
		req: ModRequest,
		res: Response,
		next: NextFunction
	): Promise<any> => {
		try {
			const { masterkey } = req.query as { masterkey: string };
			const apikey = await this.generateS(masterkey);
			res.status(201).json(makeResponse(apikey));
		} catch (error: any) {
			next(
				new CustomError({
					message: error.message,
					statusCode: 403,
				})
			);
		}
	};

	public revoke = async (
		req: ModRequest,
		res: Response,
		next: NextFunction
	): Promise<any> => {
		try {
			const { masterkey, apikey } = req.query as {
				masterkey: string;
				apikey: string;
			};
			await this.deleteS(apikey, masterkey);
			res.status(200).json(makeResponse({ message: 'API Key revoked' }));
		} catch (error) {
			next(error);
		}
	};

	public verify = async (
		req: ModRequest,
		res: Response,
		next: NextFunction
	): Promise<any> => {
		try {
			const { apikey } = req.params as { apikey: string };
			const result = await this.verifyS(apikey);
			res.status(200).json(makeResponse({ result }));
		} catch (error) {
			next(error);
		}
	};
}
