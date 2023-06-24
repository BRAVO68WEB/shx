import { NextFunction, Response, Request } from 'express';
import { ModRequest, UserMeta } from '../types';
import { Shorturls } from '../graphql/types';

export interface IURLStoreController {
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
	delete(
		req: Request,
		res: Response,
		next: NextFunction
	): Promise<Response | void>;
	update(
		req: Request,
		res: Response,
		next: NextFunction
	): Promise<Response | void>;
	getAll(
		req: Request,
		res: Response,
		next: NextFunction
	): Promise<Response | void>;
	fetch(
		req: Request,
		res: Response,
		next: NextFunction
	): Promise<Response | void>;
}

export interface IURLStoreService {
	storeURLS(url: string, meta: UserMeta): Promise<Shorturls>;
	getURLS(urlKey: string): Promise<Shorturls>;
	deleteURLS(urlID: string): Promise<number>;
	getAllURLS(
		searchQuery: string,
		limit: number,
		offset: number
	): Promise<IListURLS>;
	getaURLS(urlID: string): Promise<Shorturls>;
	updateURLS(urlKey: string, updateObject: any): Promise<number>;
}

export interface IListURLS {
	data: Shorturls[];
	meta: {
		total: number;
		pageNo: number;
		pageSize: number;
		totalPages: number;
	};
}

export interface URLStoreRep extends Shorturls {
	url?: string;
}
