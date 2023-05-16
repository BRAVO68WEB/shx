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
