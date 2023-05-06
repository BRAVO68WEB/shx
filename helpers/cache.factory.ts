import * as redis from 'redis';
import NodeCache from 'node-cache';
import { configKeys } from '..';

type CacheEnvironment = 'development' | 'production';
export default class CacheClient {
	private static _clientMode: CacheEnvironment;
	private static _redisClient: redis.RedisClientType;
	private static _nodeClient: NodeCache;

	static get client() {
		return this._clientMode === 'production'
			? this._redisClient
			: this._nodeClient;
	}

	static get env() {
		return this._clientMode;
	}

	static init(forceEnv?: CacheEnvironment) {
		const env =
			forceEnv ||
			configKeys.CACHE_ENV ||
			configKeys.NODE_ENV ||
			'development';

		if (!['development', 'production'].includes(env))
			throw new Error(
				"Invalid Caching Environment, expected - ['development', 'production'], received - " +
					env
			);

		this._clientMode = env as CacheEnvironment;

		const redisUrl = configKeys.REDIS_URL || '';

		if (env === 'production') {
			this._redisClient = redis.createClient({
				url: redisUrl,
				name: '<>',  // TODO: add redis name
			});
			this._redisClient.connect();
		}

		this._nodeClient = new NodeCache();
		console.log(`Caching Client initialized in '${env}' environment`);
	}

	static async set(key: string, value: any) {
		if (this._clientMode === 'production') {
			await this._redisClient.set(key, value);
		} else {
			this._nodeClient.set(key, value);
		}
	}

	static async get(key: string): Promise<string | null> {
		if (this._clientMode === 'production') {
			return await this._redisClient.get(key);
		} else {
			return (this._nodeClient.get(key) as string) || null;
		}
	}
}
