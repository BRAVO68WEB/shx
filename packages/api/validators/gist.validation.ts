import { NextFunction, Response, Request } from 'express';
import Joi from 'joi';
import { CustomError } from '../libs/error';
import { ErrorMsg } from '../interfaces/message.enums';
import { ModRequest } from '../types';

export const gistCreationValidation = async (
	req: ModRequest,
	res: Response,
	next: NextFunction
) => {
	try {
		const schema = Joi.object().keys({
			content: Joi.string().required(),
			isOneTimeOnly: Joi.boolean().optional().default(false),
			passkey: Joi.string().optional(),
			isPrivate: Joi.boolean().optional().default(false),
		});
		req.body = await schema.validateAsync(req.body);
		next();
	} catch (err) {
		res.send(
			new CustomError({
				data: err,
				message: ErrorMsg.VALIDATION,
				statusCode: 400,
			})
		);
		return;
	}
};

export const gistUpdateValidation = async (
	req: ModRequest,
	res: Response,
	next: NextFunction
) => {
	try {
		const schema = Joi.object().keys({
			content: Joi.string().required(),
		});
		req.body = await schema.validateAsync(req.body);
		next();
	} catch (err) {
		res.send(
			new CustomError({
				data: err,
				message: ErrorMsg.VALIDATION,
				statusCode: 400,
			})
		);
		return;
	}
};

export const gistListValidation = async (
	req: ModRequest,
	res: Response,
	next: NextFunction
) => {
	try {
		const schema = Joi.object().keys({
			search: Joi.string().optional(),
			page: Joi.number().optional().default(1),
			limit: Joi.number().optional().default(10),
		});
		req.query = await schema.validateAsync(req.query);
		next();
	} catch (err) {
		res.send(
			new CustomError({
				data: err,
				message: ErrorMsg.VALIDATION,
				statusCode: 400,
			})
		);
		return;
	}
};

export const gistGetValidation = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const schema = Joi.object().keys({
			passkey: Joi.string().optional(),
		});
		req.query = await schema.validateAsync(req.query);
		next();
	} catch (err) {
		res.send(
			new CustomError({
				data: err,
				message: ErrorMsg.VALIDATION,
				statusCode: 400,
			})
		);
		return;
	}
};
