import path from 'path';
import { readdirSync } from 'fs';
import { fileURLToPath } from 'url';
import pkg from '../package.json' assert { type: 'json' };
import { execSync } from 'child_process';
let gitHash = '';
if (!process.env.DOCKER_ENV)
	gitHash = execSync('git rev-parse HEAD').toString().trim();

const __filename = fileURLToPath(import.meta.url);

import { Router } from 'express';

const router = Router();

const isCompiled = path.extname(__filename) === '.js';
const thisFileName = path.basename(__filename);

const loadRoutes = async (dirPath: string, prefix = '/') => {
	readdirSync(dirPath, {
		withFileTypes: true,
	}).forEach(async f => {
		if (f.isFile()) {
			if (f.name == thisFileName) return;

			const isRouteMod = f.name.endsWith(`.routes.${isCompiled ? 'js' : 'ts'}`);
			if (isRouteMod) {
				const route = f.name.replace(`.routes.${isCompiled ? 'js' : 'ts'}`, '');
				const modRoute = path.join(prefix, route);
				console.log('🛰️', 'Loaded', modRoute);

				const mod = await import(path.join(baseDir, prefix + f.name));
				router.use(modRoute, mod.default);
			}
		} else if (f.isDirectory()) {
			await loadRoutes(
				path.resolve(dirPath, f.name),
				path.join(prefix, f.name, '/')
			);
		}
	});
};

let baseDir = path.dirname(__filename);
baseDir = path.resolve(baseDir);

loadRoutes(baseDir);

router.get('/', (req, res) => {
	return res.status(200).json({
		message: 'Welcome to the SHX API!',
		status: 'OK',
		version: pkg.version,
		source_code: pkg.repository,
		git_commit_id: gitHash,
	});
});

export default router;
