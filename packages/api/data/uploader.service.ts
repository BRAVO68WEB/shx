import {
	S3Client,
	PutObjectCommand,
	S3ClientConfig,
	DeleteObjectCommand,
} from '@aws-sdk/client-s3';
import { configKeys } from '..';
import { IUploadStrategy } from '../interfaces/upload.interface';

export default class UploadStrategy implements IUploadStrategy {
	private static _s3Client;
	private static _s3Opts;
	private static _clientType;

	constructor(bucket) {
		const options = {
			bucket,
		};
		UploadStrategy._s3Opts = options;

		const s3ClientOpts: S3ClientConfig = {
			region: configKeys.R2_BUCKET_REGION || '',
			endpoint: configKeys.R2_BUCKET_ENDPOINT || '',
			forcePathStyle: true,
			credentials: {
				accessKeyId: configKeys.R2_CLIENT_ID || '',
				secretAccessKey: configKeys.R2_CLIENT_SECRET || '',
			},
		};
		const client = new S3Client(s3ClientOpts);
		UploadStrategy._s3Client = client;
	}

	async uploadFile(
		entity: string,
		id: string,
		file: Buffer,
		fileType: string,
		acl?: string
	): Promise<any> {
		const key = [entity, id].join('/');
		const uploadParams = {
			Bucket: UploadStrategy._s3Opts.bucket,
			ACL: acl,
			ContentType: fileType,
			Body: file,
			Key: key,
		};
		await UploadStrategy._s3Client.send(new PutObjectCommand(uploadParams));
		return {
			url: configKeys.R2_BUCKET_URL,
			bucket_name: configKeys.R2_BUCKET_NAME,
			folder: configKeys.R2_BUCKET_FOLDER,
		};
	}

	async deleteFile(entity: string, id: string): Promise<any> {
		const key = [entity, id].join('/');
		const deleteParams = {
			Bucket: UploadStrategy._s3Opts.bucket,
			Key: key,
		};
		await UploadStrategy._s3Client.send(new DeleteObjectCommand(deleteParams));

		return {
			url: configKeys.R2_BUCKET_URL,
			bucket_name: configKeys.R2_BUCKET_NAME,
			folder: configKeys.R2_BUCKET_FOLDER,
		};
	}
}
