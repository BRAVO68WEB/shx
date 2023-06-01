import { Response } from 'express';
import { ClientError } from 'graphql-request';
import { CustomError } from './error';
import { ValidationError } from 'joi';
import { logger } from './utilities';

const customErrorHandler = async (res: Response, error: any) => {
	if (error instanceof ValidationError) {
		logger.error(error);
		return res.status(400).json({
			success: false,
			message: 'Data validation failed',
			details: error.details,
		});
	}
	if (error instanceof CustomError) {
		logger.error(error);
		return res
			.status(error.statusCode)
			.send({ success: false, message: error.message, data: error.data });
	}
	if (error instanceof ClientError) {
		logger.error(error);
		const { errors = [] } = error.response;
		const [err] = errors;
		if (err?.message) {
			return res.status(422).send({ success: false, message: err.message });
		}
	}
	if (error instanceof Error) {
		logger.error(error);
		return res.status(500).send({ success: false, message: error.message });
	}
	logger.error(error);
	res.status(500).send({ success: false, message: 'Internal ServerError.' });
};

export default customErrorHandler;
