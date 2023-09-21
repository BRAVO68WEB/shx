import { Context } from 'hono';
import Uploader from '../services/upload.service';
import { makeResponse } from '../libs';
import { IUploaderController, UploadRep } from '../interfaces/upload.interface';

export default class UploadController
	extends Uploader
	implements IUploaderController
{
	public upload = async (
		ctx: Context
	) => {
		try {
			const { file } = await ctx.req.parseBody();
			if (!file) {
				throw new Error('Please upload a file');
			}
			let data: UploadRep = await this.uploadS(file, await await ctx.get("user"));
			data = {
				...data,
				url: data.upload_url,
			};
			return ctx.json(makeResponse(data));
		} catch (error) {
			return ctx.json(error)
		}
	};

	public uploadImage = async (
		ctx: Context
	) => {
		try {
			const { file } = await ctx.req.parseBody();
			if (!file) {
				throw new Error('Please upload a image');
			}
			let data: UploadRep = await this.uploadImageS(file, await ctx.get("user"));
			data = {
				...data,
				url: data.upload_url,
			};
			return ctx.json(makeResponse(data));
		} catch (error) {
			return ctx.json(error)
		}
	};

	public uploadImageFromURL = async (
		ctx: Context
	) => {
		try {
			const { url } = await ctx.req.json();
			if (!url) {
				throw new Error('Please provide a url');
			}
			let data: UploadRep = await this.uploadImageViaURLS(url, await ctx.get("user"));
			data = {
				...data,
				url: data.upload_url,
			};
			return ctx.json(makeResponse(data));
		} catch (error) {
			return ctx.json(error)
		}
	};

	public uploadFileFromURL = async (
		ctx: Context
	) => {
		try {
			const { url } = await ctx.req.json();
			if (!url) {
				throw new Error('Please provide a url');
			}
			let data: UploadRep = await this.uploadFileViaURLS(url, await ctx.get("user"));
			data = {
				...data,
				url: data.upload_url,
			};
			return ctx.json(makeResponse(data));
		} catch (error) {
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
