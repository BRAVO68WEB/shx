import {
	S3Client,
	PutObjectCommand,
	S3ClientConfig,
	DeleteObjectCommand,
} from '@aws-sdk/client-s3';
import { IUploadStrategy, UploaderRep } from '../interfaces/upload.interface';

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
			region: process.env.R2_BUCKET_REGION || '',
			endpoint: process.env.R2_BUCKET_ENDPOINT || '',
			forcePathStyle: true,
			credentials: {
				accessKeyId: process.env.R2_CLIENT_ID || '',
				secretAccessKey: process.env.R2_CLIENT_SECRET || '',
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
	): Promise<UploaderRep> {
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
			url: process.env.R2_BUCKET_URL as string,
			bucket_name: process.env.R2_BUCKET_NAME as string,
			folder: process.env.R2_BUCKET_FOLDER as string,
		};
	}

	async deleteFile(entity: string, id: string): Promise<UploaderRep> {
		const key = [entity, id].join('/');
		const deleteParams = {
			Bucket: UploadStrategy._s3Opts.bucket,
			Key: key,
		};
		await UploadStrategy._s3Client.send(new DeleteObjectCommand(deleteParams));

		return {
			url: process.env.R2_BUCKET_URL as string,
			bucket_name: process.env.R2_BUCKET_NAME as string,
			folder: process.env.R2_BUCKET_FOLDER as string,
		};
	}
}
