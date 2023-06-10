import { NextFunction, Response, Request } from 'express';
import GistService from '../services/gist.service';
import { ModRequest } from '../types';
import { makeResponse } from '../libs';
import {
	GistRep,
	IGistController,
	IPrivate,
} from '../interfaces/gists.interface';

export default class GistController
	extends GistService
	implements IGistController
{
	public create = async (
		req: ModRequest,
		res: Response,
		next: NextFunction
	): Promise<Response | void> => {
		try {
			const { content, isOneTimeOnly, passkey } = req.body;
			const priavte: IPrivate = {
				isPrivate: passkey ? true : false,
				passkey: passkey || null,
			};
			let gist: GistRep = await this.createGistS(
				content,
				req.user,
				priavte,
				isOneTimeOnly
			);
			gist = {
				...gist,
				gist_url: `${req.protocol}://${req.hostname}/gist/${gist.gist_url_key}`,
			};
			return res.status(201).json(makeResponse(gist));
		} catch (error) {
			return next(error);
		}
	};

	public get = async (
		req: Request,
		res: Response,
		next: NextFunction
	): Promise<Response | void> => {
		try {
			const { gistID } = req.params;
			const { passkey } = req.query as { passkey: string };
			const gist = await this.getGistS(gistID, passkey);
			if (gist === null) {
				return res.status(404).json(
					makeResponse({
						message: 'Gist not found or Invalid passkey passed !!',
					})
				);
			} else {
				return res.status(200).json(makeResponse(gist));
			}
		} catch (error) {
			return next(error);
		}
	};

	public delete = async (
		req: ModRequest,
		res: Response,
		next: NextFunction
	): Promise<Response | void> => {
		try {
			const { gistID } = req.params;
			const gist = await this.deleteGistS(gistID);
			if (gist === null) {
				res.status(404).json(
					makeResponse({
						message: 'Gist not found !!',
					})
				);
			} else {
				res.status(202).json(
					makeResponse({
						message: 'Gist deleted successfully !!',
					})
				);
			}
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
			const { gistID } = req.params;
			const { content } = req.body;
			const gist = await this.updateGistS(gistID, content);
			if (gist === null) {
				res.status(404).json(
					makeResponse({
						message: 'Gist not found !!',
					})
				);
			} else {
				res.status(200).json(
					makeResponse({
						message: 'Gist updated successfully !!',
					})
				);
			}
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
			const { search, limit, page } = req.query as {
				search: string;
				limit: string;
				page: string;
			};
			const gists = await this.listGistsS(
				search,
				parseInt(page),
				parseInt(limit)
			);
			res.status(200).json(makeResponse(gists));
		} catch (error) {
			next(error);
		}
	};

	public getRaw = async (
		req: Request,
		res: Response,
		next: NextFunction
	): Promise<Response | void> => {
		try {
			const { gistID } = req.params;
			const { passkey } = req.query as { passkey: string };
			const gist = await this.getGistS(gistID, passkey);
			if (gist === null) {
				res.status(404).json(
					makeResponse({
						message: 'Gist not found or Invalid passkey passed !!',
					})
				);
			} else {
				res
					.status(200)
					.setHeader('Content-Type', 'text/plain')
					.send(gist.content);
			}
		} catch (error) {
			next(error);
		}
	};
}
