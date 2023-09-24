import { Hono } from 'hono';
import APIKeyAuth from '../middlewares/apikey_check';
import ConfigController from '../controllers/config.controller';
import { z } from 'zod';
import { zValidator } from '@hono/zod-validator';
import { Bindings, Variables } from '../types';

const configController = new ConfigController();
const apiKeyAuth = new APIKeyAuth();

const router = new Hono<{Bindings: Bindings, Variables: Variables}>();

router.get('/', apiKeyAuth.check, configController.getAllConfig);

router.post(
	'/',
	apiKeyAuth.check,
	zValidator(
		'json',
		z.object({
			key: z.string(),
			value: z.string(),
		})
	),
	configController.setConfig
);

router.get('/:key', apiKeyAuth.check, configController.getConfig);

export default router;
