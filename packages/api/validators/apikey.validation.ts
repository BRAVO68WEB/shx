import { NextFunction, Response } from 'express';
import Joi from 'joi';
import { CustomError } from '../libs/error';
import { ErrorMsg } from '../interfaces/message.enums';
import { ModRequest } from '../types';

export const apiKeyLCValidation = async (
	req: ModRequest,
	res: Response,
	next: NextFunction
) => {
	try {
		const schema = Joi.object().keys({
			masterkey: Joi.string().required(),
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

export const apiKeyRevokeValidation = async (
	req: ModRequest,
	res: Response,
	next: NextFunction
) => {
	try {
		const schema = Joi.object().keys({
			masterkey: Joi.string().required(),
			apikeyID: Joi.string().required(),
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
