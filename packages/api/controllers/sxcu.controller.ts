import { Context } from 'hono';
import { ModRequest } from '../types';
import SxcuService from '../services/sxcu.service';
import { ISXCUController } from '../interfaces/sxcu.interface';

export default class SxcuController
	extends SxcuService
	implements ISXCUController
{
	public image = async (
		ctx: Context
	) => {
		try {
			const client_url = ctx.req.url.split(ctx.req.path)[0];
			const { apikey } = ctx.req.query() as {
				apikey: string;
			};
			const fileData = await this.createUploadImageSxcu(
				apikey,
				client_url
			);
			ctx.header(
				"content-type", "application/octet-stream"
			);
			ctx.header(
				"content-disposition", `attachment; filename=${fileData.Name}.sxcu`
			);
			return ctx.body(fileData as any);
		} catch (error) {
			return ctx.json({
				error,
			})
		}
	};

	public file = async (
		ctx: Context
	) => {
		try {
			const client_url = ctx.req.url.split(ctx.req.path)[0];
			const { apikey } = ctx.req.query() as {
				apikey: string;
			};
			const fileData = await this.createUploadFileSxcu(
				apikey,
				client_url
			);
			ctx.header(
				"content-type", "application/octet-stream"
			);
			ctx.header(
				"content-disposition", `attachment; filename=${fileData.Name}.sxcu`
			);
			return ctx.body(fileData as any)
		} catch (error) {
			return ctx.json({
				error,
			})
		}
	};

	public url = async (
		ctx: Context
	) => {
		try {
			const client_url = ctx.req.url.split(ctx.req.path)[0];
			const { apikey } = ctx.req.query() as {
				apikey: string;
			};
			const fileData = await this.createURLShrinkSxcu(
				apikey,
				client_url
			);
			ctx.header(
				"content-type", "application/octet-stream"
			);
			ctx.header(
				"content-disposition", `attachment; filename=${fileData.Name}.sxcu`
			);
			return ctx.body(fileData as any)
		} catch (error) {
			return ctx.json({
				error,
			})
		}
	};

	public text = async (
		ctx: Context
	) => {
		try {
			const client_url = ctx.req.url.split(ctx.req.path)[0];
			const { apikey } = ctx.req.query() as {
				apikey: string;
			};
			const fileData = await this.createPasteSxcu(
				apikey,
				client_url
			);
			ctx.header(
				"content-type", "application/octet-stream"
			);
			ctx.header(
				"content-disposition", `attachment; filename=${fileData.Name}.sxcu`
			);
			return ctx.body(fileData as any)
		} catch (error) {
			return ctx.json({
				error,
			})
		}
	};
}
