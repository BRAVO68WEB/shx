import { Router } from 'express';
import SXCUController from '../controllers/sxcu.controller';

const sxcuController = new SXCUController();

const router = Router();

router.get('/file.sxcu', sxcuController.file as any);

router.get('/image.sxcu', sxcuController.image as any);

router.get('/url.sxcu', sxcuController.url as any);

router.get('/gist.sxcu', sxcuController.text as any);

export default router;
