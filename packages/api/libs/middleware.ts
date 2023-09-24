import { Context } from 'hono';
import { NotFoundError } from './error';

export const notFoundHandler = async (
	ctx: Context,
) => {
	return ctx.json({
		error: new NotFoundError(),
	})
};
