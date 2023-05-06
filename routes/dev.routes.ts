import { Router } from 'express';
import DevController from '../controllers/dev.controller';

const { devFunc } = new DevController();

const router = Router();

router.get('/', devFunc);

router.all('/err', async (req, res, next) => {
	try {
		throw new Error('This is an error');
	} catch (err) {
		next(err);
	}
});

export default router;
