import CacheClient from '../helpers/cache.factory';
import {
	IConfigService,
	ConfigKeysTypes,
} from '../interfaces/config.interface';

export default class ConfigService implements IConfigService {
	public initConfig = async (): Promise<boolean> => {
		const config = await CacheClient.keys('config');
		if (config && config.length > 0) {
			console.log('⚽ Config already initialized');
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
			console.log('⚽ Config initialized successfully');
			return false;
		}
	};

	public getAllConfigS = async (): Promise<any> => {
		const settings = await CacheClient.hgetall('config');
		settings.imageExtensions = JSON.parse(settings['imageExtensions']);
		settings.fileExtensions = JSON.parse(settings['fileExtensions']);
		return settings;
	};

	public setConfigS = async (
		key: ConfigKeysTypes,
		value: any
	): Promise<any> => {
		if (key === 'imageExtensions' || key === 'fileExtensions')
			value = JSON.stringify(value);
		return await CacheClient.hset('config', key, value);
	};

	public getConfigS = async (key: ConfigKeysTypes): Promise<any> => {
		const setting = (await CacheClient.hget('config', key)) as string;
		if (key === 'imageExtensions' || key === 'fileExtensions')
			return JSON.parse(setting);
		return setting;
	};
}
