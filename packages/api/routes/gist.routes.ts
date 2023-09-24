import { Hono } from 'hono';
import { z } from 'zod';
import APIKeyAuth from '../middlewares/apikey_check';
import GistController from '../controllers/gists.controller';
import { zValidator } from '@hono/zod-validator';

const gistController = new GistController();
const apiKeyAuth = new APIKeyAuth();

const router = new Hono();

router.post(
	'/',
	apiKeyAuth.check,
	zValidator(
		'json', 
		z.object({
			content: z.string(),
			isOneTimeOnly: z.boolean().optional().default(false),
			passkey: z.string().optional(),
			isPrivate: z.boolean().optional().default(false),
		})
	),
	gistController.create
);

router.get('/:gistID', 
	zValidator(
		'json', 
		z.object({
			content: z.string(),
			isOneTimeOnly: z.boolean().optional().default(false),
			passkey: z.string().optional(),
			isPrivate: z.boolean().optional().default(false),
		})
	),
	gistController.get);

router.get('/:gistID/raw', 
	zValidator(
		'json', 
		z.object({
			content: z.string(),
			isOneTimeOnly: z.boolean().optional().default(false),
			passkey: z.string().optional(),
			isPrivate: z.boolean().optional().default(false),
		})
	),
	gistController.getRaw
);

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
	gistController.getAll
);

router.put(
	'/:gistID',
	apiKeyAuth.check,
	zValidator(
		'json', 
		z.object({
			content: z.string(),
		})
	),
	gistController.update
);

router.delete(
	'/:gistID',
	apiKeyAuth.check,
	gistController.delete
);

export default router;
