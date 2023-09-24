import { Hono } from 'hono';
import SXCUController from '../controllers/sxcu.controller';

const sxcuController = new SXCUController();

const router = new Hono();

router.get('/file.sxcu', sxcuController.file);

router.get('/image.sxcu', sxcuController.image);

router.get('/url.sxcu', sxcuController.url);

router.get('/gist.sxcu', sxcuController.text);

export default router;
