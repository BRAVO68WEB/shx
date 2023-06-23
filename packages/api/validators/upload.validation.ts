import { NextFunction, Response } from 'express';
import Joi from 'joi';
import { CustomError } from '../libs/error';
import { ErrorMsg } from '../interfaces/message.enums';
import { ModRequest } from '../types';

export const deleteFileValidation = async (
	req: ModRequest,
	res: Response,
	next: NextFunction
) => {
	try {
		const schema = Joi.object().keys({
			token: Joi.string().required(),
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

export const urlUploadValidation = async (
	req: ModRequest,
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
