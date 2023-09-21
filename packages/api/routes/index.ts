import { Hono } from 'hono';

import apikey from './apikey.routes';
import config from './config.routes';
import gist from './gist.routes';
import info from './info.routes';
import settings from './settings.routes';
import upload from './upload.routes';
import url from './url.routes';

import pkg from '../package.json' assert { type: 'json' };
import { execSync } from 'child_process';
let gitHash = '';
if (!process.env.DOCKER_ENV)
	gitHash = execSync('git rev-parse HEAD').toString().trim();

const router = new Hono();

router.get('/', (ctx) => {
	return ctx.json({
		message: 'Welcome to the SHX API!',
		status: 'OK',
		version: pkg.version,
		source_code: pkg.repository,
		git_commit_id: gitHash,
	});
});

router.route('/apikey', apikey);
router.route('/config', config);
router.route('/gist', gist);
router.route('/info', info);
router.route('/settings', settings);
router.route('/upload', upload);
router.route('/url', url);

export default router;
