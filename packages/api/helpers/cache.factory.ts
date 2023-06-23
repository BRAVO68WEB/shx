import * as redis from 'redis';
import NodeCache from 'node-cache';
import { logger } from '../libs';

export type CacheEnvironment = 'inmemory' | 'redis';
export default class CacheClient {
	private static _clientMode: CacheEnvironment;
	private static _redisClient: redis.RedisClientType;
	private static _nodeClient: NodeCache;

	static get client() {
		return this._clientMode === 'redis' ? this._redisClient : this._nodeClient;
	}

	static get env() {
		return this._clientMode;
	}

	static init(forceEnv?: CacheEnvironment) {
		const env = forceEnv || process.env.CACHE_ENV || 'inmemory';

		if (!['inmemory', 'redis'].includes(env))
			throw new Error(
				"Invalid Caching Environment, expected - ['inmemory', 'redis'], received - " +
					env
			);

		this._clientMode = env as CacheEnvironment;

		const redisUrl = process.env.REDIS_URL || '';

		if (env === 'redis') {
			this._redisClient = redis.createClient({
				url: redisUrl,
				name: '<>',
			});
			this._redisClient.connect();
		}

		this._nodeClient = new NodeCache();
		logger.info(`🪣 Caching Client initialized in '${env}' mode`);
	}

	static async set(key: string, value: any) {
		if (this._clientMode === 'redis') {
			await this._redisClient.set(key, value);
		} else {
			this._nodeClient.set(key, value);
		}
	}

	static async get(key: string): Promise<string | null> {
		if (this._clientMode === 'redis') {
			return await this._redisClient.get(key);
		} else {
			return (this._nodeClient.get(key) as string) || null;
		}
	}

	static async keys(keysample: string): Promise<string[]> {
		if (this._clientMode === 'redis') {
			return await this._redisClient.keys(keysample);
		} else {
			return this._nodeClient.keys().filter(key => key.includes(keysample));
		}
	}

	static async delete(key: string) {
		if (this._clientMode === 'redis') {
			await this._redisClient.del(key);
		} else {
			this._nodeClient.del(key);
		}
	}

	static async hset(key: string, field: string, value: any) {
		if (this._clientMode === 'redis') {
			await this._redisClient.HSET(key, field, value);
		} else {
			this._nodeClient.set(key + '.' + field, value);
		}
	}

	static async hget(key: string, field: string) {
		if (this._clientMode === 'redis') {
			return await this._redisClient.HGET(key, field);
		} else {
			return (this._nodeClient.get(key + '.' + field) as string) || null;
		}
	}

	static async hgetall(key: string) {
		if (this._clientMode === 'redis') {
			return await this._redisClient.HGETALL(key);
		} else {
			const keys = this._nodeClient.keys();
			const filteredKeys = keys.filter(key => key.includes(key));
			const values = filteredKeys.map(key => {
				const value: any = this._nodeClient.get(key);
				if (
					typeof value === 'string' &&
					value.startsWith('"[') &&
					value.endsWith(']"')
				)
					return { [key.split('.')[1]]: JSON.parse(value) };
				else if (
					typeof value === 'string' &&
					value.startsWith('"') &&
					value.endsWith('"')
				)
					return { [key.split('.')[1]]: value.slice(1, -1) };
				else if (
					typeof value === 'string' &&
					value.startsWith('"{') &&
					value.endsWith('}"')
				)
					return { [key.split('.')[1]]: JSON.parse(value.slice(1, -1)) };
				return { [key.split('.')[1]]: value };
			});
			return Object.assign({}, ...values);
		}
	}
}
