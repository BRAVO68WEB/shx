import { Request } from 'express';
export interface PaginationType {
	page: number;
	limit: number;
	sort_order?: 'asc' | 'desc';
	sort_by?: string;
	filters?: { [k: string]: any };
}

export interface ModRequest extends Request {
	file: any;
	files: any;
	user: UserMeta;
	image: any;
}

export interface UserMeta {
	apiKeyID: string;
	ip: string;
	apiKey: string;
}

export interface SXCUFile {
	Version: string;
	Name: string;
	DestinationType: string;
	RequestMethod: string;
	RequestURL: string;
	Parameters?: {
		[key: string]: string;
	};
	Headers: {
		[key: string]: string;
	};
	Body: string;
	Arguments?: {
		[key: string]: string;
	};
	FileFormName?: string;
	URL: string;
	ThumbnailURL?: string;
	DeletionURL?: string;
	ErrorMessage: string;
}

export interface FileData extends Express.Multer.File {
	newName: string;
}
