import { Response, NextFunction, Request } from 'express';
import { ModRequest } from '../types';
import URLStoreService from '../services/urlstore.service';
import { makeResponse } from '../libs';
import { IURLStoreController } from '../interfaces/urlstore.interface';

export default class URLStoreController
	extends URLStoreService
	implements IURLStoreController
{
	public create = async (
		req: ModRequest,
		res: Response,
		next: NextFunction
	): Promise<any> => {
		try {
			const { url } = req.body;
			let urlstore = await this.storeURLS(url, req.user);
			urlstore = {
				...urlstore,
				url: `${req.protocol}://${req.hostname}/${urlstore.short_key}`,
			};
			res.status(201).json(makeResponse(urlstore));
		} catch (error) {
			next(error);
		}
	};

	public get = async (
		req: Request,
		res: Response,
		next: NextFunction
	): Promise<any> => {
		try {
			const { urlKey } = req.params;
			const urlstore = await this.getURLS(urlKey);
			if (urlstore === null) {
				return res
					.status(404)
					.json(makeResponse({ message: 'URL not found !!' }));
			}
			res.status(304).redirect(urlstore.original_url);
		} catch (error) {
			next(error);
		}
	};
}
