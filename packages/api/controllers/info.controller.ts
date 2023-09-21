import { Context } from 'hono';
import { makeResponse } from '../libs';
import { CustomError } from '../libs/error';
import InfoService from '../services/info.service';

export default class InfoController extends InfoService {
	public static get = async (
		ctx: Context
	) => {
		try {
			const data = await this.getSystemInfo();
			return ctx.json(makeResponse(data));
		} catch (error) {
			return ctx.json(error);
		}
	};
}
