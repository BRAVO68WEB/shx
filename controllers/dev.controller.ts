import DevClass from '../services/dev.service';
import { Request, Response } from 'express';
import { makeResponse } from '../libs';

export default class DevController extends DevClass {
	public devFunc = async (req: Request, res: Response): Promise<any> => {
		try {
			const data = await this.devRun();
			res.send(makeResponse(data));
		} catch (err: any) {
			res.send(makeResponse(err.message, {}, 'Failed', true));
		}
	};
}
