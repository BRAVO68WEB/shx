import { NextFunction, Response } from 'express';
import GistService from '../services/gist.service';
import { ModRequest } from '../types';
import { makeResponse } from '../libs';

export default class GistController extends GistService {
	public create = async (
		req: ModRequest,
		res: Response,
		next: NextFunction
	) => {
		try {
			const { content, isOneTimeOnly, passkey } = req.body;
			const priavte = {
				isPrivate: passkey ? true : false,
				passkey: passkey || null,
			};
			let gist = await this.createGistS(
				content,
				req.user,
				priavte,
				isOneTimeOnly
			);
			gist = {
				...gist,
				gist_url: `${req.protocol}://${req.hostname}/gist/${gist.gist_url_key}`,
			};
			res.status(201).json(makeResponse(gist));
		} catch (error) {
			next(error);
		}
	};

	public get = async (req: ModRequest, res: Response, next: NextFunction) => {
		try {
			const { gistKey } = req.params;
			const { passkey } = req.query as { passkey: string };
			const gist = await this.getGistS(gistKey, passkey);
			if (gist === null) {
				res
					.status(404)
					.json(
						makeResponse({
							message: 'Gist not found or Invalid passkey passed !!',
						})
					);
			} else {
				res.status(200).json(makeResponse(gist));
			}
		} catch (error) {
			next(error);
		}
	};
}
