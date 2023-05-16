import { Router } from 'express';
import APIKeyAuth from '../middlewares/apikey_check';
import GistController from '../controllers/gists.controller';

const gistController = new GistController();
const apiKeyAuth = new APIKeyAuth();

const router = Router();

router.post('/', apiKeyAuth.check as any, gistController.create as any);

router.get('/:gistKey', gistController.get as any);

export default router;
