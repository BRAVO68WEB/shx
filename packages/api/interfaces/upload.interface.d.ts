import { NextFunction, Response } from 'express';
import { ModRequest, UserMeta } from '../types';

export interface IUploaderController {
	upload(req: ModRequest, res: Response, next: NextFunction): Promise<void>;
	uploadImage(
		req: ModRequest,
		res: Response,
		next: NextFunction
	): Promise<void>;
	uploadImageFromURL(
		req: ModRequest,
		res: Response,
		next: NextFunction
	): Promise<void>;
	uploadFileFromURL(
		req: ModRequest,
		res: Response,
		next: NextFunction
	): Promise<void>;
}

export interface IUploaderService {
	uploadImageS(file: any, meta: UserMeta): Promise<void>;
	uploadS(file: any, meta: UserMeta): Promise<void>;
	uploadImageViaURLS(url: string, meta: UserMeta): Promise<void>;
	uploadFileViaURLS(url: string, meta: UserMeta): Promise<void>;
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
	): Promise<void>;
}
