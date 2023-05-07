import UploaderService from '../data/uploader.service';
import { configKeys } from '..';
import { gql } from 'graphql-request';
import { client } from '../helpers';
import sharp from 'sharp';
import { IUploaderService } from '../interfaces/upload.interface';
import { UserMeta } from '../types';

const uploaderService = new UploaderService(configKeys.R2_BUCKET_NAME);

export default class Uploader implements IUploaderService {
	public uploadS = async (file: any, meta: UserMeta) => {
		await uploaderService.uploadFile(
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
		await uploaderService.uploadFile(
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
}
