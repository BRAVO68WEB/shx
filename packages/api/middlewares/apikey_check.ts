import { Response, NextFunction } from 'express';
import { ModRequest, UserMeta } from '../types';
import APIKeyService from '../services/apikey.service';
import { IAPIKeyAuth } from '../interfaces/apikey.interface';

const apiKeyService = new APIKeyService();

export default class APIKeyAuth implements IAPIKeyAuth {
	public check = async (
		req: ModRequest,
		res: Response,
		next: NextFunction
	): Promise<any> => {
		if (!req.headers['x-shx-api-key'] && !req.query.apikey) {
			return res.status(401).json({
				success: false,
				message: 'API Key is required',
			});
		}

		const apikey = req.headers['x-shx-api-key'] || req.query.apikey;

		const data = await apiKeyService.checkS(apikey as string);
		if (!data) {
			return res.status(401).json({
				success: false,
				message: 'Invalid API Key',
			});
		}
		req.user = {
			apiKeyID: data.keyID,
			ip: req.ip,
			apiKey: data.key,
		} as UserMeta;
		next();
	};
}
