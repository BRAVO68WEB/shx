import { NextFunction, Response, Request } from 'express';
import Joi from 'joi';
import { CustomError } from '../libs/error';
import { ErrorMsg } from '../interfaces/message.enums';

export const urlCreateValidation = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const schema = Joi.object().keys({
			url: Joi.string().required(),
		});
		req.body = await schema.validateAsync(req.body);
		next();
	} catch (err) {
		res.status(400).send(
			new CustomError({
				data: err,
				message: ErrorMsg.VALIDATION,
				statusCode: 400,
			})
		);
		return;
	}
};

export const urlUpdateValidation = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const schema = Joi.object().keys({
			original_url: Joi.string().required(),
			short_key: Joi.string().required(),
		});
		req.body = await schema.validateAsync(req.body);
		next();
	} catch (err) {
		res.status(400).send(
			new CustomError({
				data: err,
				message: ErrorMsg.VALIDATION,
				statusCode: 400,
			})
		);
		return;
	}
};

export const urlGelAllValidation = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const schema = Joi.object().keys({
			query: Joi.string().optional(),
			page: Joi.number().optional().default(1),
			limit: Joi.number().optional().default(10),
		});
		req.query = await schema.validateAsync(req.query);
		next();
	} catch (err) {
		res.status(400).send(
			new CustomError({
				data: err,
				message: ErrorMsg.VALIDATION,
				statusCode: 400,
			})
		);
		return;
	}
};
