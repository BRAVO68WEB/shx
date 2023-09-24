import { Context } from 'hono';
import Uploader from '../services/upload.service';
import { makeResponse } from '../libs';
import { IUploaderController, UploadRep } from '../interfaces/upload.interface';
import { Bindings, Variables } from '../types';
export default class UploadController
	extends Uploader
	implements IUploaderController
{
	public upload = async (
		ctx: Context<{ Bindings: Bindings, Variables: Variables }>
	) => {
		try {
			const { file } = await ctx.req.parseBody() as {
				file: File;
			}
			if (!file) {
				throw new Error('Please upload a file');
			}
			const file_name = Date.now() + "-" + file.name;
			const shx_upload = await ctx.env.SHX_BUCKET.put(file_name, ctx.req.body);
			console.log(shx_upload);
			let data: UploadRep = await this.uploadS(file_name, await ctx.get("user"));
			data = {
				...data,
				url: data.upload_url,
			};
			return ctx.json(makeResponse(data));
		} catch (error) {
			console.log(error)
			return ctx.json(error)
		}
	};

	public getFile = async (
		ctx: Context
	) => {
		try {
			const { fileID } = ctx.req.param();
			if (!fileID) {
				throw new Error('Please provide a fileID');
			}
			const data = await this.getFileS(fileID);
			return ctx.json(makeResponse(data));
		} catch (error) {
			return ctx.json(error)
		}
	};

	public getAllFiles = async (
		ctx: Context
	) => {
		try {
			const {
				limit,
				page,
				query = '',
			} = ctx.req.query();
			const { data, meta } = await this.listFilesS(
				query,
				parseInt(limit),
				parseInt(page)
			);
			return ctx.json(makeResponse(data, meta));
		} catch (error) {
			return ctx.json(error)
		}
	};

	public deleteFile = async (
		ctx: Context
	) => {
		try {
			const { fileID } = ctx.req.param();
			const { token } = ctx.req.query();
			if (!fileID) {
				throw new Error('Please provide a fileID');
			}
			const data = await this.deleteFileS(fileID, token);
			return ctx.json(makeResponse(data));
		} catch (error) {
			return ctx.json(error)
		}
	};
}
