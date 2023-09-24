import { Context } from 'hono';

type IConfigStore = 'development' | 'production';

export interface IConfigController {
	getAllConfig(
		ctx: Context
	);
	setConfig(
		ctx: Context
	);
	getConfig(
		ctx: Context
	);
}

export interface IConfigService {
	initConfig(T): Promise<boolean>;
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
