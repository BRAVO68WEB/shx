import UploaderService from '../data/uploader.service';
import { configKeys } from '..';
import { gql } from 'graphql-request';
import { client } from '../helpers';
import sharp from 'sharp';
import { IUploaderService } from '../interfaces/upload.interface';
import { UserMeta } from '../types';
import axios from 'axios';
import fs from 'fs';
import { nanoid } from 'napi-nanoid';

export default class Uploader implements IUploaderService {
	uploaderService: UploaderService;

	constructor() {
		this.uploaderService = new UploaderService(configKeys.R2_BUCKET_NAME);
	}

	public uploadS = async (file: any, meta: UserMeta) => {
		await this.uploaderService.uploadFile(
			configKeys.R2_BUCKET_FOLDER!,
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
				configKeys.R2_BUCKET_URL +
				'/' +
				configKeys.R2_BUCKET_NAME +
				'/' +
				configKeys.R2_BUCKET_FOLDER +
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
		const data: any = await client.request(query, variables);
		return data.insert_uploads_one;
	};

	public uploadImageS = async (file: any, meta: UserMeta) => {
		const image: any = sharp(file.buffer);
		await image.toFormat('jpeg');
		const buffer: any = await image.toBuffer();
		await this.uploaderService.uploadFile(
			configKeys.R2_BUCKET_FOLDER!,
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
				configKeys.R2_BUCKET_URL +
				'/' +
				configKeys.R2_BUCKET_NAME +
				'/' +
				configKeys.R2_BUCKET_FOLDER +
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
		const data: any = await client.request(query, variables);
		return data.insert_uploads_one;
	};

	public uploadImageViaURLS = async (url: string, meta: UserMeta) => {
		const filename = await this.downloadImage(url);

		const rawImage = fs.readFileSync(`uploads/${filename}`);
		const image: any = sharp(rawImage);
		await image.toFormat('jpeg');
		const buffer: any = await image.toBuffer();
		await this.uploaderService.uploadFile(
			configKeys.R2_BUCKET_FOLDER!,
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
				configKeys.R2_BUCKET_URL +
				'/' +
				configKeys.R2_BUCKET_NAME +
				'/' +
				configKeys.R2_BUCKET_FOLDER +
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

		const data: any = await client.request(query, variables);
		return data.insert_uploads_one;
	};

	private downloadImage = async (url: string) => {
		const filename = nanoid() + url.split('/').pop()!;
		await axios({
			url,
			method: 'GET',
			responseType: 'arraybuffer',
		})
			.then(res => {
				return sharp(res.data).toFile(`uploads/${filename}`);
			})
			.then(() => {
				console.log(`Image downloaded!`);
			})
			.catch(err => {
				console.log(`Couldn't process: ${err}`);
			});

		return filename;
	};

	public uploadFileViaURLS = async (url: string, meta: UserMeta) => {
		const filename = await this.downloadFile(url);
		await this.uploaderService.uploadFile(
			configKeys.R2_BUCKET_FOLDER!,
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
				configKeys.R2_BUCKET_URL +
				'/' +
				configKeys.R2_BUCKET_NAME +
				'/' +
				configKeys.R2_BUCKET_FOLDER +
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

		const data: any = await client.request(query, variables);
		return data.insert_uploads_one;
	};

	private downloadFile = async (url: string) => {
		const filename = nanoid() + url.split('/').pop()!;
		await axios({
			url,
			method: 'GET',
			responseType: 'arraybuffer',
		})
			.then(res => {
				return fs.writeFileSync(`uploads/${filename}`, res.data);
			})
			.then(() => {
				console.log(`File downloaded!`);
			})
			.catch(err => {
				console.log(`Couldn't process: ${err}`);
			});

		return filename;
	};

	public deleteFileS = async (fileID: string, delToken: string) => {
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

		const findData: any = await client.request(findQuery, findVariables);

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

		const data: any = await client.request(delquery, variables);

		const filename = data.delete_uploads_by_pk.upload_url.split('/').pop()!;

		await this.uploaderService.deleteFile(
			configKeys.R2_BUCKET_FOLDER!,
			filename
		);

		return data.delete_uploads_by_pk;
	};

	public listFilesS = async (
		searchQuery: any,
		limit: number,
		offset: number
	) => {
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
			searchQuery: `%${searchQuery}%`,
			limit: limit,
			offset: offset,
		};

		const data: any = await client.request(query, variables);

		return data.uploads;
	};

	public getFileS = async (fileID: string) => {
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

		const data: any = await client.request(query, variables);

		return data.uploads_by_pk;
	};
}
