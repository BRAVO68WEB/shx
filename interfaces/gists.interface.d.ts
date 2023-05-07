import { NextFunction, Response, Request } from 'express';
import { ModRequest, UserMeta } from '../types';

export interface IGistController {
	create(req: ModRequest, res: Response, next: NextFunction): Promise<void>;
	get(req: Request, res: Response, next: NextFunction): Promise<void>;
}

export interface IGistService {
	createGistS(
		content: string,
		meta: UserMeta,
		privateMeta?: IPrivate,
		isOneTimeOnly?: boolean
	): Promise<void>;
	getGistS(gistKey: string, passkey?: string): Promise<void>;
}

export interface IPrivate {
	isPrivate: boolean;
	passkey?: string;
}
