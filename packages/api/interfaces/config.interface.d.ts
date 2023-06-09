import { NextFunction, Response } from 'express';
import { ModRequest } from '../types';

type IConfigStore = 'development' | 'production';

export interface IConfigKeys {
	PORT: string | number;
	NODE_ENV: string;
	HASURA_GRAPHQL_ADMIN_SECRET: string;
	HASURA_GRAPHQL_ENDPOINT: string;
	CACHE_ENV: string;
	REDIS_URL: string;
	R2_CLIENT_ID: string;
	R2_CLIENT_SECRET: string;
	R2_BUCKET_NAME: string;
	R2_BUCKET_REGION: string;
	R2_BUCKET_ENDPOINT: string;
	R2_BUCKET_URL: string;
	R2_BUCKET_FOLDER: string;
	MASTER_KEY: string;
}

export interface IConfigClass {
	getConfigStore(): Promise<Partial<IConfigKeys>>;
}

export interface IConfigController {
	getAllConfig(
		req: ModRequest,
		res: Response,
		next: NextFunction
	): Promise<Response | void>;
	setConfig(
		req: ModRequest,
		res: Response,
		next: NextFunction
	): Promise<Response | void>;
	getConfig(
		req: ModRequest,
		res: Response,
		next: NextFunction
	): Promise<Response | void>;
}

export interface IConfigService {
	initConfig(): Promise<boolean>;
	getAllConfigS(): Promise<Settings>;
	setConfigS(key: ConfigKeysTypes, value: string): Promise<void>;
	getConfigS(
		key: ConfigKeysTypes
	): Promise<
		| string[]
		| string
		| boolean
		| number
		| ThemeType
		| LanguageType
		| Settings
		| any
	>;
}

export type ConfigKeysTypes =
	| 'theme'
	| 'language'
	| 'imageExtensions'
	| 'fileExtensions';

export type ThemeType = 'light' | 'dark';
export type LanguageType = 'en';

export type Settings = {
	theme: ThemeType;
	language: LanguageType;
	imageExtensions: [string];
	fileExtensions: [string];
};
