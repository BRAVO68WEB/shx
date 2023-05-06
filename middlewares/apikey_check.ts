import { Response, NextFunction } from 'express';
import { ModRequest } from '../types';
import APIKeyService from '../services/apikey.service';

const apiKeyService = new APIKeyService();

export default class APIKeyAuth {
	public async check(req: ModRequest, res: Response, next: NextFunction) {
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
		};
		next();
	}
}
