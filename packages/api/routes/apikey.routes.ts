import { Hono } from 'hono';
import { z } from 'zod';
import { zValidator } from '@hono/zod-validator'
import APIKeyController from '../controllers/apikey.controller';

const apiKeyController = new APIKeyController();

const router = new Hono();

router.get('/', zValidator(
	'query',
	z.object({
		masterkey: z.string()
	})
), apiKeyController.list);

router.post('/', zValidator(
	'query',
	z.object({
		masterkey: z.string()
	})
), apiKeyController.generate);

router.delete(
	'/',
	zValidator(
		'query',
		z.object({
			masterkey: z.string(),
			apikeyID: z.string(),
		})
	),
	apiKeyController.revoke
);

router.get('/verify/:apikey', apiKeyController.verify);

export default router;
