import { NextFunction, Response } from 'express';
import { ModRequest } from '../types';

type IConfigStore = 'development' | 'production';

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
