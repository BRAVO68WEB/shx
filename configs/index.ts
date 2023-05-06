import fs from 'fs';
import { parse as parseFile } from 'envfile';

type IconfigStore = 'development' | 'production';

export interface IConfigKeys {
	PORT: string | number;
	NODE_ENV: string;
	HASURA_GRAPHQL_ADMIN_SECRET: string;
	HASURA_GRAPHQL_ENDPOINT: string;
	AWS_S3_BUCKET: string;
	AWS_REGION: string;
	AWS_ACCESS_KEY_ID: string;
	AWS_SECRET_ACCESS_KEY: string;
	MAIL_HOST: string;
	MAIL_PORT: number;
	MAIL_USER: string;
	MAIL_PASS: string;
	MAIL_LOGGER: boolean;
	MAIL_FROM_EMAIL: string;
	MAIL_FROM_NAME: string;	
	CACHE_ENV: string;
	REDIS_URL: string;
}

export default class ConfigStoreFactory {
	public configStoreType: IconfigStore;

	constructor(isProd = false) {
		if (isProd) {
			this.configStoreType = 'production';
		} else {
			this.configStoreType = 'development';
		}
	}

	public async getConfigStore() {
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
