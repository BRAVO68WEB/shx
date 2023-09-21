import { Context } from 'hono';
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
		ctx: Context
	) => {
		try {
			const client_url = ctx.req.url.split(ctx.req.path)[0];
			const { url } = await ctx.req.json();
			let urlstore: URLStoreRep = await this.storeURLS(url, await ctx.get("user"));
			urlstore = {
				...urlstore,
				url: `${client_url}/${urlstore.short_key}`,
			};
			return ctx.json(makeResponse(urlstore), 201);
		} catch (error) {
			return ctx.json(error)
		}
	};

	public get = async (
		ctx: Context
	) => {
		try {
			const { urlKey } = ctx.req.param();
			const urlstore = await this.getURLS(urlKey);
			if (!urlstore) {
				return ctx
					.json(makeResponse({ message: 'URL not found !!' }), 404);
			}
			return ctx.redirect(urlstore.original_url, 304);
		} catch (error) {
			return ctx.json(error);
		}
	};

	public delete = async (
		ctx: Context
	) => {
		try {
			const { urlID } = ctx.req.param();
			const urlstore = await this.deleteURLS(urlID);
			if (!urlstore) {
				return ctx
					.json(makeResponse({ message: 'URL not found !!' }), 404);
			}
			return ctx.json(makeResponse({ message: 'URL deleted !!' }), 202);
		} catch (error) {
			return ctx.json(error);
		}
	};

	public update = async (
		ctx: Context
	) => {
		try {
			const { urlID } = ctx.req.param();
			const { original_url, short_key } = await ctx.req.json();
			const urlstore = await this.updateURLS(urlID, {
				original_url,
				short_key,
			});
			if (!urlstore) {
				return ctx
					.json(makeResponse({ message: 'URL not found !!' }), 404);
			}
			return ctx.json(makeResponse({ message: 'URL updated !!' }));
		} catch (error) {
			return ctx.json(error);
		}
	};

	public getAll = async (
		ctx: Context
	) => {
		try {
			const { query, limit, page } = ctx.req.query();
			const { data, meta } = await this.getAllURLS(
				query,
				parseInt(limit),
				parseInt(page)
			);
			return ctx.json(makeResponse(data, meta));
		} catch (error) {
			return ctx.json(error);
		}
	};

	public fetch = async (
		ctx: Context
	) => {
		try {
			const { urlID } = ctx.req.param();
			const urlstore = await this.getaURLS(urlID);
			if (!urlstore) {
				return ctx
					.json(makeResponse({ message: 'URL not found !!' }), 404);
			}
			return ctx.json(makeResponse(urlstore));
		} catch (error) {
			return ctx.json(error);
		}
	};
}
