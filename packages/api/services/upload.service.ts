import UploaderService from '../data/uploader.service';
import { gql } from 'graphql-request';
import { client } from '../helpers';
import sharp from 'sharp';
import { IListUploads, IUploaderService } from '../interfaces/upload.interface';
import { UserMeta } from '../types';
import axios from 'axios';
import fs from 'fs';
import { nanoid } from 'napi-nanoid';
import sanitize from 'sanitize-filename';
import ConfigService from './config.service';
import { CustomError } from '../libs/error';
import { logger } from '../libs';
import { Uploads } from '../graphql/types';

export default class Uploader implements IUploaderService {
	uploaderService: UploaderService;
	configService: ConfigService;

	constructor() {
		this.uploaderService = new UploaderService(process.env.R2_BUCKET_NAME);
		this.configService = new ConfigService();
	}

	public uploadS = async (file: any, meta: UserMeta): Promise<Uploads> => {
		await this.uploaderService.uploadFile(
			process.env.R2_BUCKET_FOLDER as string,
			file.newName,
			file.buffer,
			file.mimetype,
			'public-read'
		);
		const query = gql`
			mutation uploadFile($file: uploads_insert_input!) {
				insert_uploads_one(object: $file) {
					fileID
					uploaded_at
					filename
					upload_url
					deleteToken
				}
			}
		`;
		const urlObj = {
			url:
				process.env.R2_BUCKET_URL +
				'/' +
				process.env.R2_BUCKET_NAME +
				'/' +
				process.env.R2_BUCKET_FOLDER +
				'/' +
				file.newName,
		};
		const variables = {
			file: {
				upload_url: urlObj.url,
				filename: file.originalname,
				uploader_ip: meta.ip,
				apikeyUsed: meta.apiKeyID,
			},
		};
		const data: {
			insert_uploads_one: Uploads;
		} = await client.request(query, variables);
		return data.insert_uploads_one;
	};

	public uploadImageS = async (file: any, meta: UserMeta): Promise<Uploads> => {
		const image = sharp(file.buffer);
		await image.toFormat('jpeg');
		const buffer = await image.toBuffer();
		await this.uploaderService.uploadFile(
			process.env.R2_BUCKET_FOLDER as string,
			file.newName,
			buffer,
			file.mimetype,
			'public-read'
		);
		const query = gql`
			mutation uploadFile($file: uploads_insert_input!) {
				insert_uploads_one(object: $file) {
					fileID
					uploaded_at
					filename
					upload_url
					deleteToken
				}
			}
		`;
		const urlObj = {
			url:
				process.env.R2_BUCKET_URL +
				'/' +
				process.env.R2_BUCKET_NAME +
				'/' +
				process.env.R2_BUCKET_FOLDER +
				'/' +
				file.newName,
		};
		const variables = {
			file: {
				upload_url: urlObj.url,
				filename: file.originalname,
				uploader_ip: meta.ip,
				apikeyUsed: meta.apiKeyID,
			},
		};
		const data: {
			insert_uploads_one: Uploads;
		} = await client.request(query, variables);
		return data.insert_uploads_one;
	};

	public uploadImageViaURLS = async (
		url: string,
		meta: UserMeta
	): Promise<Uploads> => {
		let filename = await this.downloadImage(url);
		filename = sanitize(filename);
		const rawImage = fs.readFileSync(`uploads/${filename}`);
		const image = sharp(rawImage);
		await image.toFormat('jpeg');
		const buffer = await image.toBuffer();
		await this.uploaderService.uploadFile(
			process.env.R2_BUCKET_FOLDER as string,
			filename,
			buffer,
			'image/jpeg',
			'public-read'
		);

		const query = gql`
			mutation uploadFile($file: uploads_insert_input!) {
				insert_uploads_one(object: $file) {
					fileID
					uploaded_at
					filename
					upload_url
					deleteToken
				}
			}
		`;

		const urlObj = {
			url:
				process.env.R2_BUCKET_URL +
				'/' +
				process.env.R2_BUCKET_NAME +
				'/' +
				process.env.R2_BUCKET_FOLDER +
				'/' +
				filename,
		};

		const variables = {
			file: {
				upload_url: urlObj.url,
				filename: filename,
				uploader_ip: meta.ip,
				apikeyUsed: meta.apiKeyID,
			},
		};

		const data: {
			insert_uploads_one: Uploads;
		} = await client.request(query, variables);
		return data.insert_uploads_one;
	};

	public downloadImage = async (url: string): Promise<string> => {
		let filename = nanoid() + url.split('/').pop();
		filename = sanitize(filename);
		const whitelistedExtensions = await this.configService.getConfigS(
			'imageExtensions'
		);
		if (!whitelistedExtensions.includes(filename.split('.').pop() as string)) {
			throw new CustomError({
				message: 'Image extension not whitelisted',
				statusCode: 400,
			});
		}
		await axios({
			url,
			method: 'GET',
			responseType: 'arraybuffer',
		})
			.then(res => {
				return sharp(res.data).toFile(`uploads/${filename}`);
			})
			.catch(err => {
				logger.info(`Couldn't process: ${err}`);
			});

		return filename;
	};

	public uploadFileViaURLS = async (
		url: string,
		meta: UserMeta
	): Promise<Uploads> => {
		let filename = await this.downloadFile(url);
		filename = sanitize(filename);
		await this.uploaderService.uploadFile(
			process.env.R2_BUCKET_FOLDER as string,
			filename,
			fs.readFileSync(`uploads/${filename}`),
			'application/octet-stream',
			'public-read'
		);

		const query = gql`
			mutation uploadFile($file: uploads_insert_input!) {
				insert_uploads_one(object: $file) {
					fileID
					uploaded_at
					filename
					upload_url
					deleteToken
				}
			}
		`;

		const urlObj = {
			url:
				process.env.R2_BUCKET_URL +
				'/' +
				process.env.R2_BUCKET_NAME +
				'/' +
				process.env.R2_BUCKET_FOLDER +
				'/' +
				filename,
		};

		const variables = {
			file: {
				upload_url: urlObj.url,
				filename: filename,
				uploader_ip: meta.ip,
				apikeyUsed: meta.apiKeyID,
			},
		};

		const data: {
			insert_uploads_one: Uploads;
		} = await client.request(query, variables);
		return data.insert_uploads_one;
	};

	public downloadFile = async (url: string): Promise<string> => {
		let filename = nanoid() + url.split('/').pop();
		filename = sanitize(filename);
		const whitelistedExtensions = await this.configService.getConfigS(
			'fileExtensions'
		);
		if (!whitelistedExtensions.includes(filename.split('.').pop() as string)) {
			throw new CustomError({
				message: 'File extension not whitelisted',
				statusCode: 400,
			});
		}
		await axios({
			url,
			method: 'GET',
			responseType: 'arraybuffer',
		})
			.then(res => {
				return fs.writeFileSync(`uploads/${filename}`, res.data);
			})
			.catch(err => {
				logger.info(`Couldn't process: ${err}`);
			});

		return filename;
	};

	public deleteFileS = async (
		fileID: string,
		delToken: string
	): Promise<Uploads> => {
		const findQuery = gql`
			query findFile($fileID: uuid!) {
				uploads_by_pk(fileID: $fileID) {
					fileID
					filename
					upload_url
					deleteToken
				}
			}
		`;

		const findVariables = {
			fileID: fileID,
		};

		const findData: {
			uploads_by_pk: Uploads;
		} = await client.request(findQuery, findVariables);

		if (!findData.uploads_by_pk) {
			throw new Error('File not found');
		}

		if (!(findData.uploads_by_pk.deleteToken == delToken)) {
			throw new Error('Invalid delete token');
		}

		const delquery = gql`
			mutation deleteFile($fileID: uuid!) {
				delete_uploads_by_pk(fileID: $fileID) {
					fileID
					upload_url
				}
			}
		`;

		const variables = {
			fileID: fileID,
		};

		const data: {
			delete_uploads_by_pk: Uploads;
		} = await client.request(delquery, variables);

		const filename = data.delete_uploads_by_pk.upload_url
			.split('/')
			.pop() as string;

		await this.uploaderService.deleteFile(
			process.env.R2_BUCKET_FOLDER as string,
			filename
		);

		return data.delete_uploads_by_pk;
	};

	public listFilesS = async (
		searchQuery: any,
		limit = 1,
		offset = 10
	): Promise<IListUploads> => {
		const query = gql`
			query listFiles($searchQuery: String!, $limit: Int!, $offset: Int!) {
				uploads(
					where: {
						_or: [
							{ filename: { _iregex: $searchQuery } }
							{ upload_url: { _iregex: $searchQuery } }
						]
					}
					limit: $limit
					offset: $offset
					order_by: { uploaded_at: desc }
				) {
					fileID
					uploaded_at
					filename
					upload_url
					deleteToken
				}
				uploads_aggregate(
					where: {
						_or: [
							{ filename: { _iregex: $searchQuery } }
							{ upload_url: { _iregex: $searchQuery } }
						]
					}
				) {
					aggregate {
						count
					}
				}
			}
		`;

		const variables = {
			searchQuery,
			limit: limit,
			offset: (offset - 1) * limit,
		};

		const data: {
			uploads: Uploads[];
			uploads_aggregate: {
				aggregate: {
					count: number;
				};
			};
		} = await client.request(query, variables);

		return {
			data: data.uploads,
			meta: {
				total: data.uploads_aggregate.aggregate.count,
				pageNo: offset,
				pageSize: limit,
				totalPages: Math.ceil(data.uploads_aggregate.aggregate.count / limit),
			},
		};
	};

	public getFileS = async (fileID: string): Promise<Uploads> => {
		const query = gql`
			query getFile($fileID: uuid!) {
				uploads_by_pk(fileID: $fileID) {
					fileID
					uploaded_at
					filename
					upload_url
					deleteToken
				}
			}
		`;

		const variables = {
			fileID: fileID,
		};

		const data: {
			uploads_by_pk: Uploads;
		} = await client.request(query, variables);

		return data.uploads_by_pk;
	};
}
