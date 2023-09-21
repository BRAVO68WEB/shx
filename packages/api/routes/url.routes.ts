import { Hono } from 'hono';
import URLStoreController from '../controllers/urlstore.controller';
import APIKeyAuth from '../middlewares/apikey_check';
import { zValidator } from "@hono/zod-validator"
import { z } from 'zod';

const urlStoreController = new URLStoreController();
const apiKeyAuth = new APIKeyAuth();

const router = new Hono();

router.post(
	'/',
	apiKeyAuth.check,
	zValidator(
		'json', 
		z.object({
			url: z.string(),
		})
	),
	urlStoreController.create
);

router.get('/:urlID', apiKeyAuth.check, urlStoreController.fetch);

router.get(
	'/',
	apiKeyAuth.check,
	zValidator(
		'query', 
		z.object({
			search: z.string().optional(),
			page: z.number().optional().default(1),
			limit: z.number().optional().default(10),
		})
	),
	urlStoreController.getAll
);

router.put(
	'/:urlID',
	apiKeyAuth.check,
	zValidator(
		'json', 
		z.object({
			short_key: z.string().optional(),
			original_url: z.string().optional(),
		})
	),
	urlStoreController.update
);

router.delete(
	'/:urlID',
	apiKeyAuth.check,
	urlStoreController.delete
);

export default router;
