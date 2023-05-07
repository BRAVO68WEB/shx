import { NextFunction, Response } from 'express';
import APIKeyService from '../services/apikey.service';
import { ModRequest } from '../types';
import { makeResponse } from '../libs';

export default class APIKeyController extends APIKeyService {
	public list = async (req: ModRequest, res: Response, next: NextFunction) => {
		try {
			const { masterkey } = req.query as { masterkey: string };
			const apikeys = await this.listS(masterkey);
			res.status(200).json(makeResponse(apikeys));
		} catch (error) {
			next(error);
		}
	};

	public generate = async (
		req: ModRequest,
		res: Response,
		next: NextFunction
	) => {
		try {
			const { masterkey } = req.query as { masterkey: string };
			const apikey = await this.generateS(masterkey);
			res.status(201).json(makeResponse(apikey));
		} catch (error) {
			next(error);
		}
	};

	public revoke = async (
		req: ModRequest,
		res: Response,
		next: NextFunction
	) => {
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
}
