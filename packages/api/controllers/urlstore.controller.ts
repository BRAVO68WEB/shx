import { Response, NextFunction, Request } from 'express';
import { ModRequest } from '../types';
import URLStoreService from '../services/urlstore.service';
import { makeResponse } from '../libs';
import {
	IURLStoreController,
	URLStoreRep,
} from '../interfaces/urlstore.interface';

export default class URLStoreController
	extends URLStoreService
	implements IURLStoreController
{
	public create = async (
		req: ModRequest,
		res: Response,
		next: NextFunction
	): Promise<Response | void> => {
		try {
			const { url } = req.body;
			let urlstore: URLStoreRep = await this.storeURLS(url, req.user);
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
	): Promise<Response | void> => {
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

	public delete = async (
		req: ModRequest,
		res: Response,
		next: NextFunction
	): Promise<Response | void> => {
		try {
			const { urlID } = req.params;
			const urlstore = await this.deleteURLS(urlID);
			if (urlstore === null) {
				return res
					.status(404)
					.json(makeResponse({ message: 'URL not found !!' }));
			}
			res.status(202).json(makeResponse({ message: 'URL deleted !!' }));
		} catch (error) {
			next(error);
		}
	};

	public update = async (
		req: ModRequest,
		res: Response,
		next: NextFunction
	): Promise<Response | void> => {
		try {
			const { urlID } = req.params;
			const { original_url, short_key } = req.body;
			const urlstore = await this.updateURLS(urlID, {
				original_url,
				short_key,
			});
			if (urlstore === null) {
				return res
					.status(404)
					.json(makeResponse({ message: 'URL not found !!' }));
			}
			res.status(200).json(makeResponse({ message: 'URL updated !!' }));
		} catch (error) {
			next(error);
		}
	};

	public getAll = async (
		req: ModRequest,
		res: Response,
		next: NextFunction
	): Promise<Response | void> => {
		try {
			const { query, limit, page } = req.query as {
				query: string;
				limit: string;
				page: string;
			};
			const { data, meta } = await this.getAllURLS(
				query,
				parseInt(limit),
				parseInt(page)
			);
			res.status(200).json(makeResponse(data, meta));
		} catch (error) {
			next(error);
		}
	};

	public fetch = async (
		req: ModRequest,
		res: Response,
		next: NextFunction
	): Promise<Response | void> => {
		try {
			const { urlID } = req.params;
			const urlstore = await this.getaURLS(urlID);
			if (urlstore === null) {
				return res
					.status(404)
					.json(makeResponse({ message: 'URL not found !!' }));
			}
			res.status(200).json(makeResponse(urlstore));
		} catch (error) {
			next(error);
		}
	};
}
