import { Response } from 'express';
import { ClientError } from 'graphql-request';
import { CustomError } from './error';
import { ValidationError } from 'joi';

const customErrorHandler = async (res: Response, error: any) => {
	if (error instanceof ValidationError) {
		return res.status(400).json({
			success: false,
			message: 'Data validation failed',
			details: error.details,
		});
	}
	if (error instanceof CustomError) {
		return res
			.status(error.statusCode)
			.send({ success: false, message: error.message, data: error.data });
	}
	if (error instanceof ClientError) {
		const { errors = [] } = error.response;
		const [err] = errors;
		if (err?.message) {
			return res.status(422).send({ success: false, message: err.message });
		}
	}
	res.status(500).send({ success: false, message: 'Internal ServerError.' });
};

export default customErrorHandler;
