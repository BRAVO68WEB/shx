import { NextFunction, Request, Response } from 'express';
import Joi from 'joi';
import { CustomError, NotFoundError } from './error';
import { pick } from './utilities';
import { configKeys } from ".."

export const errorHandler = async (
	err: any,
	_req: Request,
	res: Response,
	// eslint-disable-next-line
	_next: NextFunction
) => {
	if ('statusCode' in err) {
		return res.status(err.statusCode).json({
			message: err.message,
			error: true,
			data: null,
		});
	}
	return res.status(500).json({
		message: err.message,
		error: true,
		data: null,
		error_stack: configKeys.NODE_ENV === 'production' ? undefined : err.stack,
	});
};

export const notFoundHandler = async (
	_req: Request,
	_res: Response,
	next: NextFunction
) => {
	return next(new NotFoundError());
};

export const validate =
	(schema: any) => (req: Request, _res: Response, next: NextFunction) => {
		if (Object.keys(req.body).length !== 0 && !req.is('application/json')) {
			return next(new Error('Supports JSON request body only'));
		}

		const validSchema = pick(schema, ['params', 'query', 'body']);

		const object = pick(req, Object.keys(validSchema));

		const { value, error } = Joi.compile(validSchema)
			.prefs({ errors: { label: 'key' } })
			.validate(object);
		if (error) {
			const errorMessage = error.details
				.map(details => details.message)
				.join(', ');
			return next(
				new CustomError({
					message: errorMessage,
					statusCode: 400,
				})
			);
		}
		
		Object.assign(req, value);

		return next();
	};
