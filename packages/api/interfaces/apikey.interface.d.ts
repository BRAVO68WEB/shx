import { NextFunction, Response } from 'express';
import { ModRequest } from '../types';
import { Apikeys } from '../graphql/types';
import { encapDataKey } from '../libs';

export interface IAPIKeyController {
	list(
		req: ModRequest,
		res: Response,
		next: NextFunction
	): Promise<Response | void>;
	generate(
		req: ModRequest,
		res: Response,
		next: NextFunction
	): Promise<Response | void>;
	revoke(
		req: ModRequest,
		res: Response,
		next: NextFunction
	): Promise<Response | void>;
	verify(
		req: ModRequest,
		res: Response,
		next: NextFunction
	): Promise<Response | void>;
}

export interface IAPIKeyService {
	listS(masterkey: string): Promise<encapDataKey[]>;
	generateS(masterkey: string): Promise<Apikeys>;
	deleteS(apikey: string, masterkey: string): Promise<number>;
	checkS(apikey: string): Promise<Apikeys | null>;
	verifyS(apikey: string): Promise<boolean>;
}

export interface IAPIKeyAuth {
	check(req: ModRequest, res: Response, next: NextFunction): Promise<void>;
}
