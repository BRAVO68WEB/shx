import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import ratelimiter from 'express-rate-limit';

import { hgqlInit } from './helpers';
import { errorHandler, notFoundHandler } from './libs';
import pkg from './package.json' assert { type: 'json' };
import configStore from './configs';
import CacheClient, { CacheEnvironment } from './helpers/cache.factory';
import URLStoreController from './controllers/urlstore.controller';

export const app: express.Application = express();

console.log('🚀', '@' + pkg.author.name + '/' + pkg.name, 'v' + pkg.version);

const isDev: boolean = process.env.NODE_ENV == 'production';
console.log(isDev ? '🚀 Production Mode' : '🚀 Development Mode');
const configs = new configStore(isDev);
const configKeys = await configs.getConfigStore();
const urlStoreController = new URLStoreController();

console.log('🔑', 'Master Key', configKeys.MASTER_KEY);

import routes from './routes';

hgqlInit();
CacheClient.init(configKeys.CACHE_ENV as CacheEnvironment);

app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use(
	ratelimiter({
		windowMs: 15 * 60 * 1000, // 15 minutes
		max: 100, // limit each IP to 100 requests per windowMs
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

console.log('☄', 'Base Route', '/');

app.use('/', routes);
app.get('/:urlKey', urlStoreController.get);

app.use(notFoundHandler);
app.use(errorHandler);

app.listen(configKeys.PORT, async () => {
	console.log(`\nServer running on port ${configKeys.PORT}`);
});

export { configKeys };
