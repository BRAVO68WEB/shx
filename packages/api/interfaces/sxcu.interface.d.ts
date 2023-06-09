import { NextFunction, Response } from 'express';
import { ModRequest, SXCUFile } from '../types';

export interface ISXCUController {
	file(
		req: ModRequest,
		res: Response,
		next: NextFunction
	): Promise<Response | void>;
	url(
		req: ModRequest,
		res: Response,
		next: NextFunction
	): Promise<Response | void>;
	image(
		req: ModRequest,
		res: Response,
		next: NextFunction
	): Promise<Response | void>;
	text(
		req: ModRequest,
		res: Response,
		next: NextFunction
	): Promise<Response | void>;
}

export interface ISXCUService {
	createUploadImageSxcu(apiKey: string, url: string): Promise<SXCUFile>;
	createUploadFileSxcu(apiKey: string, url: string): Promise<SXCUFile>;
	createURLShrinkSxcu(apiKey: string, url: string): Promise<SXCUFile>;
	createPasteSxcu(apiKey: string, url: string): Promise<SXCUFile>;
}
