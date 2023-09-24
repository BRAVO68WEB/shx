import { Context } from 'hono';
import { UserMeta } from '../types';
import { Uploads } from '../graphql/types';

export interface IUploaderController {
	upload(
		ctx: Context
	);
	getFile(
		ctx: Context
	);
	getAllFiles(
		ctx: Context
	);
	deleteFile(
		ctx: Context
	);
}

export interface IUploaderService {
	uploadS(file: any, meta: UserMeta): Promise<Uploads>;
	deleteFileS(fileID: string, delToken: string): Promise<Uploads>;
	listFilesS(
		searchQuery: any,
		limit: number,
		offset: number
	): Promise<IListUploads>;
	getFileS(fileID: string): Promise<Uploads>;
}

export interface IListUploads {
	data: Uploads[];
	meta: {
		total: number;
		pageNo: number;
		pageSize: number;
		totalPages: number;
	};
}

export interface UploaderConfig {
	mimeFilters: string[];
}

export interface IUploadFactory {
	getUploader(type: UploaderConfig): void;
}

export interface IUploadStrategy {
	uploadFile(
		entity: string,
		id: string,
		file: Buffer,
		fileType: string,
		acl?: string
	): Promise<UploaderRep>;
	deleteFile(entity: string, id: string): Promise<UploaderRep>;
}

export interface UploadRep extends Uploads {
	url?: string;
}

export interface UploaderRep {
	url: string;
	bucket_name: string;
	folder: string;
}
