import { Context, Next } from 'hono';
import { Apikeys } from '../graphql/types';
import { encapDataKey } from '../libs';

export interface IAPIKeyController {
	list(
		ctx: Context
	);
	generate(
		ctx: Context
	);
	revoke(
		ctx: Context
	);
	verify(
		ctx: Context
	);
}

export interface IAPIKeyService {
	listS(masterkey: string): Promise<IListAPIKeys>;
	generateS(masterkey: string): Promise<Apikeys>;
	deleteS(apikey: string, masterkey: string): Promise<number>;
	checkS(apikey: string): Promise<Apikeys | null>;
	verifyS(apikey: string): Promise<boolean>;
}

export interface IListAPIKeys {
	data: encapDataKey[];
	meta: {
		total: number;
	};
}

export interface IAPIKeyAuth {
	check(ctx: Context, next: Next);
}
