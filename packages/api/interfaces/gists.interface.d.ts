import { NextFunction, Response, Request } from 'express';
import { ModRequest, UserMeta } from '../types';
import { Gists } from '../graphql/types';

export interface IGistController {
	create(
		req: ModRequest,
		res: Response,
		next: NextFunction
	): Promise<Response | void>;
	get(
		req: Request,
		res: Response,
		next: NextFunction
	): Promise<Response | void>;
}

export interface IGistService {
	createGistS(
		content: string,
		meta: UserMeta,
		privateMeta?: IPrivate,
		isOneTimeOnly?: boolean
	): Promise<Gists>;
	getGistS(gistKey: string, passkey?: string): Promise<Gists | null>;
	updateGistS(gistKey: string, content: string): Promise<number>;
	deleteGistS(gistKey: string): Promise<number>;
	listGistsS(
		searchString: string,
		pageNo: number,
		pageSize: number
	): Promise<IListGists>;
}

export interface IPrivate {
	isPrivate: boolean;
	passkey?: string;
}

export interface GistRep extends Gists {
	gist_url?: string;
}

export interface IListGists {
	data: Gists[];
	meta: {
		total: number;
		pageNo: number;
		pageSize: number;
		totalPages: number;
	};
}
