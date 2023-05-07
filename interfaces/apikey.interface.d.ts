import { NextFunction, Response } from 'express';
import { ModRequest } from '../types';

export interface IAPIKeyController {
	list(req: ModRequest, res: Response, next: NextFunction): Promise<void>;
	generate(req: ModRequest, res: Response, next: NextFunction): Promise<void>;
	revoke(req: ModRequest, res: Response, next: NextFunction): Promise<void>;
}

export interface IAPIKeyService {
	listS(masterkey: string): Promise<void>;
	generateS(masterkey: string): Promise<void>;
	deleteS(apikey: string, masterkey: string): Promise<void>;
	checkS(apikey: string): Promise<void>;
}

export interface IAPIKeyAuth {
	check(req: ModRequest, res: Response, next: NextFunction): Promise<void>;
}
