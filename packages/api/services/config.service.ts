import CacheClient from '../helpers/cache.factory';
import {
	IConfigService,
	ConfigKeysTypes,
	Settings,
	ThemeType,
	LanguageType,
} from '../interfaces/config.interface';
import { logger } from '../libs';

export default class ConfigService implements IConfigService {
	public initConfig = async (): Promise<boolean> => {
		const config = await CacheClient.keys('config');
		if (config && config.length > 0) {
			logger.info('⚽ Config already initialized');
			return true;
		} else {
			await this.setConfigS('theme', 'dark');
			await this.setConfigS('language', 'en');
			await this.setConfigS(
				'imageExtensions',
				JSON.stringify(['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg', 'ico'])
			);
			await this.setConfigS(
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
			logger.info('⚽ Config initialized successfully');
			return false;
		}
	};

	public getAllConfigS = async (): Promise<Settings> => {
		const settings: Partial<Settings | any> = await CacheClient.hgetall(
			'config'
		);
		settings.imageExtensions = JSON.parse(settings['imageExtensions']);
		settings.fileExtensions = JSON.parse(settings['fileExtensions']);
		return settings as Settings;
	};

	public setConfigS = async (
		key: ConfigKeysTypes,
		value: string[] | string | boolean | number | ThemeType | LanguageType
	): Promise<void> => {
		if (key === 'imageExtensions' || key === 'fileExtensions')
			value = JSON.stringify(value);
		return await CacheClient.hset('config', key, value);
	};

	public getConfigS = async (
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
