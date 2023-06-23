import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import ratelimiter from 'express-rate-limit';

import { hgqlInit } from './helpers';
import { errorHandler, notFoundHandler } from './libs';
import pkg from './package.json' assert { type: 'json' };
import './configs';
import CacheClient, { CacheEnvironment } from './helpers/cache.factory';
import URLStoreController from './controllers/urlstore.controller';
import ConfigService from './services/config.service';
import { logger, LogStream } from './libs';

export const app: express.Application = express();
logger.info('🚀 @' + pkg.author.name + '/' + pkg.name, 'v' + pkg.version);

const isDev: boolean = process.env.NODE_ENV == 'production';
logger.info(isDev ? '🚀 Production Mode' : '🚀 Development Mode');
const urlStoreController = new URLStoreController();
const logStream = new LogStream();

logger.info(`🔑 Master Key ${process.env.MASTER_KEY}`);

import routes from './routes';

hgqlInit();
CacheClient.init(process.env.CACHE_ENV as CacheEnvironment);

app.use(cors());
app.use(helmet());
app.use(
	morgan('combined', {
		stream: logStream,
	})
);
app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use(
	ratelimiter({
		windowMs: 15 * 60 * 1000,
		max: 100,
	})
);
app.set('trust proxy', 1);

app.use('/health', (req, res) => {
	return res.status(200).json({
		app: pkg.name,
		request_ip: req.ip,
		uptime: process.uptime(),
		hrtime: process.hrtime(),
	});
});

logger.info('🦄 Base Route /');

app.use('/', routes);
app.get('/:urlKey', urlStoreController.get);

app.use(notFoundHandler);
app.use(errorHandler);

app.listen(process.env.PORT, async () => {
	logger.info(`🚂 Server running on port ${process.env.PORT}`);
	const { initConfig } = new ConfigService();
	await initConfig();
});

export { logger };
