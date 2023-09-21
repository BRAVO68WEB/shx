import { Context } from 'hono';
import ConfigService from '../services/config.service';
import { makeResponse } from '../libs';
import {
	IConfigController,
	ConfigKeysTypes,
} from '../interfaces/config.interface';

export default class ConfigController
	extends ConfigService
	implements IConfigController
{
	public getAllConfig = async (
		ctx: Context
	) => {
		let config;
		try {
			config = await this.getAllConfigS();
		} catch (error) {
			return ctx.json({
				error,
			})
		}
		return ctx.json(makeResponse(config));
	};

	public setConfig = async (
		ctx: Context
	) => {
		try {
			const { key, value } = await ctx.req.json();
			if (!key || !value)
				throw new Error("Invalid Request");
			await this.setConfigS(key, value);
			return ctx.json(
				makeResponse({
					message: 'Config updated successfully',
				}),
				201
			);
		} catch (error) {
			return ctx.json({
				error,
			})
		}
	};

	public getConfig = async (
		ctx: Context
	) => {
		try {
			const { key } = ctx.req.param() as { key: ConfigKeysTypes };
			if (!key)
				throw new Error("Invalid Request");
			const config = await this.getConfigS(key);
			ctx.json(makeResponse(config));
		} catch (error) {
			return ctx.json({
				error,
			})
		}
	};
}
