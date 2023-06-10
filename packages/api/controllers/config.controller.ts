import { NextFunction, Response } from 'express';
import ConfigService from '../services/config.service';
import { ModRequest } from '../types';
import { makeResponse } from '../libs';
import {
	IConfigController,
	ConfigKeysTypes,
} from '../interfaces/config.interface';
import { CustomError } from '../libs/error';

export default class ConfigController
	extends ConfigService
	implements IConfigController
{
	public getAllConfig = async (
		req: ModRequest,
		res: Response,
		next: NextFunction
	): Promise<Response | void> => {
		let config;
		try {
			config = await this.getAllConfigS();
		} catch (error) {
			return next(error);
		}
		return res.status(200).json(makeResponse(config));
	};

	public setConfig = async (
		req: ModRequest,
		res: Response,
		next: NextFunction
	): Promise<Response | void> => {
		try {
			const { key, value } = req.body;
			if (!key || !value)
				throw new CustomError({
					statusCode: 400,
					message: 'Invalid Request',
				});
			await this.setConfigS(key, value);
			res.status(201).json(
				makeResponse({
					message: 'Config updated successfully',
				})
			);
		} catch (error) {
			next(error);
		}
	};

	public getConfig = async (
		req: ModRequest,
		res: Response,
		next: NextFunction
	): Promise<Response | void> => {
		try {
			const { key } = req.params as { key: ConfigKeysTypes };
			if (!key)
				throw new CustomError({
					statusCode: 400,
					message: 'Invalid Request',
				});
			const config = await this.getConfigS(key);
			res.status(200).json(makeResponse(config));
		} catch (error) {
			next(error);
		}
	};
}
