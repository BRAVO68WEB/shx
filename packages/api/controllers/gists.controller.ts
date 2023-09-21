import { NextFunction, Response, Request } from 'express';
import GistService from '../services/gist.service';
import { ModRequest } from '../types';
import { makeResponse } from '../libs';
import {
	GistRep,
	IGistController,
	IPrivate,
} from '../interfaces/gists.interface';
import { Context } from 'hono';

export default class GistController
	extends GistService
	implements IGistController
{
	public create = async (
		ctx: Context
	) => {
		try {
			const client_url = ctx.req.url.split(ctx.req.path)[0];
			const { content, isOneTimeOnly, passkey } = await ctx.req.json();
			const priavte: IPrivate = {
				isPrivate: !!passkey,
				passkey: passkey || null,
			};
			let gist: GistRep = await this.createGistS(
				content,
				await ctx.get("user"),
				priavte,
				isOneTimeOnly
			);
			gist = {
				...gist,
				gist_url: `${client_url}/gist/${gist.gist_url_key}`,
			};
			return ctx.json(makeResponse(gist), 201);
		} catch (error) {
			return ctx.json(error, 500);
		}
	};

	public get = async (
		ctx: Context
	) => {
		try {
			const { gistID } = ctx.req.param();
			const { passkey } = ctx.req.query() as { passkey: string };
			const gist = await this.getGistS(gistID, passkey);
			if (gist === null) {
				throw new Error("Gist not found or Invalid passkey passed !!")
			} else {
				return ctx.json(makeResponse(gist));
			}
		} catch (error) {
			return ctx.json(error, 500);
		}
	};

	public delete = async (
		ctx: Context
	) => {
		try {
			const { gistID } = ctx.req.param();
			const gist = await this.deleteGistS(gistID);
			if (gist === null) {
				throw new Error("Gist not found !!")
			} else {
				return ctx.json(
					makeResponse({
						message: 'Gist deleted successfully !!',
					}), 202
				);
			}
		} catch (error) {
			return ctx.json(error, 500);
		}
	};

	public update = async (
		ctx: Context
	) => {
		try {
			const { gistID } = ctx.req.param();
			const { content } = await ctx.req.json();
			const gist = await this.updateGistS(gistID, content);
			if (gist === null) {
				throw new Error("Gist not found !!")
			} else {
				return ctx.json(
					makeResponse({
						message: 'Gist updated successfully !!',
					}), 200
				);
			}
		} catch (error) {
			return ctx.json(error, 500);
		}
	};

	public getAll = async (
		ctx: Context
	) => {
		try {
			const { search, limit, page } = ctx.req.query() as {
				search: string;
				limit: string;
				page: string;
			};
			const { data, meta } = await this.listGistsS(
				search,
				parseInt(page),
				parseInt(limit)
			);
			return ctx.json(makeResponse(data, meta));
		} catch (error) {
			return ctx.json(error, 500);
		}
	};

	public getRaw = async (
		ctx: Context
	) => {
		try {
			const { gistID } = ctx.req.param();
			const { passkey } = ctx.req.query() as { passkey: string };
			const gist = await this.getGistS(gistID, passkey);
			if (gist === null) {
				return ctx.json(
					makeResponse({
						message: 'Gist not found or Invalid passkey passed !!',
					}), 404
				);
			} else {
				ctx.header('Content-Type', 'text/plain');
				return ctx.text(gist.content);
			}
		} catch (error) {
			return ctx.json(error, 500);
		}
	};
}
