import { Context } from 'hono';
import APIKeyService from '../services/apikey.service';
import { makeResponse } from '../libs';
import { IAPIKeyController } from '../interfaces/apikey.interface';

export default class APIKeyController
	extends APIKeyService
	implements IAPIKeyController
{
	public list = async (
		ctx: Context
	) => {
		let apikeys;
		let metadata;
		try {
			const { masterkey } = ctx.req.query() as { masterkey: string };
			const { data, meta } = await this.listS(masterkey);
			apikeys = data;
			metadata = meta;
		} catch (error) {
			return ctx.json({
				error,
			}, 401)
		}
		return ctx.json(makeResponse(apikeys, metadata));
	};

	public generate = async (
		ctx: Context
	) => {
		let apikey;
		try {
			const { masterkey } = ctx.req.query() as { masterkey: string };
			apikey = await this.generateS(masterkey);
		} catch (error: any) {
			return ctx.json({
				error,
			}, 401)
		}
		return ctx.json(makeResponse(apikey), 201);
	};

	public revoke = async (
		ctx: Context
	) => {
		let delKey;
		try {
			const { masterkey, apikeyID } = ctx.req.query() as {
				masterkey: string;
				apikeyID: string;
			};
			delKey = await this.deleteS(apikeyID, masterkey);
		} catch (error) {
			return ctx.json({
				error,
			}, 401);
		}
		if (delKey === 0)
			return ctx.json({
				message: 'API Key not found',
				statusCode: 404,
			}, 404)
		return ctx.json(makeResponse({ message: 'API Key revoked' }), 202);
	};

	public verify = async (
		ctx: Context
	) => {
		let result;
		try {
			const { apikey } = ctx.req.param() as { apikey: string };
			result = await this.verifyS(apikey);
		} catch (error) {
			return ctx.json({
				error,
			}, 401);
		}
		return ctx.json(makeResponse({ result }), 200);
	};
}
