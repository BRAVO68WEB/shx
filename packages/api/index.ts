import 'dotenv/config';
import './configs';

import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { logger as rlogger } from 'hono/logger';
import { poweredBy } from 'hono/powered-by'

import { serve } from '@hono/node-server';

import { hgqlInit } from './helpers';
import { notFoundHandler, logger, LogStream } from './libs';
import pkg from './package.json' assert { type: 'json' };
import routes from './routes';

import CacheClient, { CacheEnvironment } from './helpers/cache.factory';
import URLStoreController from './controllers/urlstore.controller';
import ConfigService from './services/config.service';

export const app = new Hono({
	strict: false
});

app.use('*', rlogger())
app.use('*', poweredBy())

logger.info('🚀 @' + pkg.author.name + '/' + pkg.name, 'v' + pkg.version);

const isDev: boolean = process.env.NODE_ENV == 'production';
logger.info(isDev ? '🚀 Production Mode' : '🚀 Development Mode');

const urlStoreController = new URLStoreController();
const logStream = new LogStream();

logger.info(`🔑 Master Key ${process.env.MASTER_KEY}`);

hgqlInit();
CacheClient.init(process.env.CACHE_ENV as CacheEnvironment);

app.get('/health', (ctx) => {
	return ctx.json({
		app: pkg.name,
		uptime: process.uptime(),
		hrtime: process.hrtime(),
	});
});

logger.info('🦄 Base Route /');

app.route('/', routes);
app.get('/:urlKey', urlStoreController.get);

app.all('*', notFoundHandler);

logger.info(`🚂 Server running on port ${process.env.PORT}`);

const { initConfig } = new ConfigService();
await initConfig();

app.showRoutes()

serve({
	fetch: app.fetch,
	port: Number(process.env.PORT)
})

export { logger };
