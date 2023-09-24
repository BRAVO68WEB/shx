import './configs';

import { Hono } from 'hono';
import { logger as rlogger } from 'hono/logger';
import { poweredBy } from 'hono/powered-by'

import { hgqlInit } from './helpers';
import { notFoundHandler } from './libs';
import pkg from './package.json' assert { type: 'json' };
import routes from './routes';

import URLStoreController from './controllers/urlstore.controller';
import ConfigService from './services/config.service';
import { Bindings, Variables } from './types';

export type Env = {
	ENVIRONMENT: 'development' | 'production';
	SHX_BUCKET: R2Bucket;
	SHX_SETTINGS: KVNamespace;
	R2_BUCKET_ENDPOINT: string;
	R2_CLIENT_ID: string;
	R2_CLIENT_SECRET: string;
	R2_BUCKET_NAME: number;
	R2_BUCKET_FOLDER: string;
	R2_BUCKET_URL: string;
	R2_BUCKET_REGION: string;
	HASURA_GRAPHQL_ADMIN_SECRET: string;
	HASURA_GRAPHQL_ENDPOINT: string;
	DATABASE_URL: string;
	MASTER_KEY: string;
};
  

export const app = new Hono<{Bindings: Bindings, Variables: Variables}>({
	strict: false
});

app.use('*', rlogger())
app.use('*', poweredBy())

console.log('🚀 @' + pkg.author.name + '/' + pkg.name, 'v' + pkg.version);

const isDev: boolean = process.env.NODE_ENV == 'production';
console.log(isDev ? '🚀 Production Mode' : '🚀 Development Mode');

const urlStoreController = new URLStoreController();

console.log(`🔑 Master Key ${process.env.MASTER_KEY}`);

hgqlInit();

app.get('/health', (ctx) => {
	return ctx.json({
		app: pkg.name,
		uptime: process.uptime(),
		hrtime: process.hrtime(),
	});
});

console.log('🦄 Base Route /');

app.route('/', routes);
app.get('/:urlKey', urlStoreController.get);

app.all('*', notFoundHandler);

console.log(`🚂 Server running on port ${process.env.PORT}`);

const { initConfig } = new ConfigService();
await initConfig();

app.showRoutes()

export default app
