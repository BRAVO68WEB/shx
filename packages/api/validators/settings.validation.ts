import { NextFunction, Response } from 'express';
import Joi from 'joi';
import { CustomError } from '../libs/error';
import { ErrorMsg } from '../interfaces/message.enums';
import { ModRequest } from '../types';

export const setConfigValidation = async (
	req: ModRequest,
	res: Response,
	next: NextFunction
) => {
	try {
		const schema = Joi.object().keys({
			key: Joi.string().required(),
			value: Joi.string().required(),
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
