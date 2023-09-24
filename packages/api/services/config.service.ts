import { Context } from 'hono';
import {
	IConfigService,
	ConfigKeysTypes,
	Settings,
	ThemeType,
	LanguageType,
} from '../interfaces/config.interface';
import { Bindings, Variables } from '../types';
import { Env } from '../index';
export default class ConfigService implements IConfigService {
	

	public initConfig = async (): Promise<boolean> => {
		let config = [
			await Env.SHX_SETTINGS.get('theme'),
			await SHX_SETTINGS.get('language'),
			await SHX_SETTINGS.get('imageExtensions'),
			await SHX_SETTINGS.get('fileExtensions'),
		];

		config = await Promise.all(config);

		if (config && config.length > 0) {
			return true;
		} else {
			await this.setConfigS(ctx, 'theme', 'dark');
			await this.setConfigS(ctx, 'language', 'en');
			await this.setConfigS(ctx, 
				'imageExtensions',
				JSON.stringify(['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg', 'ico'])
			);
			await this.setConfigS(ctx, 
				'fileExtensions',
				JSON.stringify([
					'png',
					'jpg',
					'jpeg',
					'gif',
					'svg',
					'ico',
					'mp4',
					'mp3',
					'zip',
					'rar',
					'pdf',
					'key',
					'pptx',
					'ppt',
					'csv',
					'doc',
					'docx',
					'xls',
					'xlsx',
					'txt',
					'json',
					'html',
				])
			);
			console.log('⚽ Config initialized successfully');
			return false;
		}
	};

	public getAllConfigS = async (ctx: Context<{Bindings: Bindings, Variables: Variables}>): Promise<Settings> => {
		let config = [
			await ctx.env.SHX_SETTINGS.get('theme'),
			await ctx.env.SHX_SETTINGS.get('language'),
			await ctx.env.SHX_SETTINGS.get('imageExtensions'),
			await ctx.env.SHX_SETTINGS.get('fileExtensions'),
		];

		const [theme, language, imageExtensions, fileExtensions] = await Promise.all(config);
		const settings: Partial<Settings | any> = {
			theme: theme as ThemeType,
			language: language as LanguageType,
			imageExtensions,
			fileExtensions,
		}
		settings.imageExtensions = JSON.parse(settings['imageExtensions']);
		settings.fileExtensions = JSON.parse(settings['fileExtensions']);
		return settings as Settings;
	};

	public setConfigS = async (
		ctx: Context<{Bindings: Bindings, Variables: Variables}>,
		key: ConfigKeysTypes,
		value: string[] | string | boolean | number | ThemeType | LanguageType
	): Promise<void> => {
		if (key === 'imageExtensions' || key === 'fileExtensions')
			value = JSON.stringify(value);
		return await CacheClient.hset('config', key, value);
	};

	public getConfigS = async (
		ctx: Context<{Bindings: Bindings, Variables: Variables}>,
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
	> => {
		const setting = (await CacheClient.hget('config', key)) as any;
		if (key === 'imageExtensions' || key === 'fileExtensions')
			return JSON.parse(setting);
		return setting;
	};
}
