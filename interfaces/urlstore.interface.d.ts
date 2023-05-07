import { NextFunction, Response, Request } from 'express';
import { ModRequest, UserMeta } from '../types';

export interface IURLStoreController {
	create(req: ModRequest, res: Response, next: NextFunction): Promise<void>;
	get(req: Request, res: Response, next: NextFunction): Promise<void>;
}

export interface IURLStoreService {
	storeURLS(url: string, meta: UserMeta): Promise<void>;
	getURLS(urlKey: string): Promise<void>;
}
