import fs from 'fs';
import { parse as parseFile } from 'envfile';
import {
	IConfigClass,
	IConfigStore,
	IConfigKeys,
} from '../interfaces/config.interface';

// TODO: Use zod to validate the config

export default class ConfigStoreFactory implements IConfigClass {
	public configStoreType: IConfigStore;

	constructor(isProd = false) {
		if (isProd) {
			this.configStoreType = 'production';
		} else {
			this.configStoreType = 'development';
		}
	}

	public async getConfigStore(): Promise<Partial<IConfigKeys>> {
		if (this.configStoreType === 'development') {
			const envContent = await fs.readFileSync(`./.env`, 'utf8');
			const env: Partial<IConfigKeys> = await parseFile(envContent);
			return env;
		} else {
			let reqEnvContent: any = await fs.readFileSync('./.env.example', 'utf8');
			reqEnvContent = reqEnvContent.replaceAll('=', '');
			reqEnvContent = reqEnvContent.split('\n');
			const missingKeys: string[] = [];
			const env: Partial<IConfigKeys> = {};
			for (const line of reqEnvContent) {
				if (!process.env[line]) {
					missingKeys.push(line);
				} else env[line] = process.env[line];
			}
			if (missingKeys.length > 0) {
				throw new Error(`Missing keys: ${missingKeys}`);
			}
			return env;
		}
	}
}
