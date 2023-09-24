export interface PaginationType {
	page: number;
	limit: number;
	sort_order?: 'asc' | 'desc';
	sort_by?: string;
	filters?: { [k: string]: any };
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


export type Bindings = {
	SHX_BUCKET: R2Bucket,
	SHX_SETTINGS: KVNamespace,
}

export type Variables = {
	user: any
}