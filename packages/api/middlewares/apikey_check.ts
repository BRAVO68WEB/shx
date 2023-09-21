import { Context, Next } from 'hono';
import APIKeyService from '../services/apikey.service';
import { IAPIKeyAuth } from '../interfaces/apikey.interface';

const apiKeyService = new APIKeyService();

export default class APIKeyAuth implements IAPIKeyAuth {
	public check = async (
		ctx: Context,
		next: Next
	) => {
		if (!ctx.req.header('x-shx-api-key') && !ctx.req.query().apikey) {
			return ctx.json({
				success: false,
				message: 'API Key is required',
			}, 403);
		}

		const apikey = ctx.req.header('x-shx-api-key') ?? ctx.req.query().apikey;

		const data = await apiKeyService.checkS(apikey as string);
		if (!data) {
			return ctx.json({
				success: false,
				message: 'Invalid API Key',
			}, 401);
		}
		ctx.set("user", {
			apiKeyID: data.keyID,
			apiKey: data.key,
		});
		await next();
	};
}
