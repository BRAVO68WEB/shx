import { Context } from 'hono';
import { SXCUFile } from '../types';

export interface ISXCUController {
	file(
		ctx: Context
	);
	url(
		ctx: Context
	);
	image(
		ctx: Context
	);
	text(
		ctx: Context
	);
}

export interface ISXCUService {
	createUploadImageSxcu(apiKey: string, url: string): Promise<SXCUFile>;
	createUploadFileSxcu(apiKey: string, url: string): Promise<SXCUFile>;
	createURLShrinkSxcu(apiKey: string, url: string): Promise<SXCUFile>;
	createPasteSxcu(apiKey: string, url: string): Promise<SXCUFile>;
}
