import { Context } from 'hono';
import { UserMeta } from '../types';
import { Shorturls } from '../graphql/types';

export interface IURLStoreController {
	create(
		ctx: Context
	);
	get(
		ctx: Context
	);
	delete(
		ctx: Context
	);
	update(
		ctx: Context
	);
	getAll(
		ctx: Context
	);
	fetch(
		ctx: Context
	);
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
