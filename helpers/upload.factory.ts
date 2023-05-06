import { S3Client } from '@aws-sdk/client-s3';
import multer from 'multer';
import multerS3 from 'multer-s3';
import path from 'path';
import napiNanoId from 'napi-nanoid';
import { configKeys } from '..'; 
interface UploadFactoryOptions {
	region: string;
	bucket: string;
	accessKey: string;
	secretKey: string;
}
interface UploaderConfig {
	folder: string;
	mimeFilters: string[];
}
export class UploadFactory {
	private options: UploadFactoryOptions & Partial<UploaderConfig>;
	private s3Client: S3Client;

	constructor(options?: Partial<UploadFactoryOptions>) {
		this.options = {
			bucket: options?.bucket || configKeys.AWS_S3_BUCKET || '',
			region: options?.region || configKeys.AWS_REGION || '',
			accessKey: options?.accessKey || configKeys.AWS_ACCESS_KEY_ID || '',
			secretKey: options?.secretKey || configKeys.AWS_SECRET_ACCESS_KEY || '',
		};

		this.s3Client = new S3Client({
			region: this.options.region,
			credentials: {
				accessKeyId: this.options.accessKey,
				secretAccessKey: this.options.secretKey,
			},
		});
	}

	public get serviceName(): string {
		return 'aws:' + this.options.bucket;
	}

	public getUploader(config?: Partial<UploadFactoryOptions & UploaderConfig>) {
		const finalOptions = {
			...this.options,
			...(config || {}),
		};

		return multer({
			fileFilter(_req, file, cb) {
				const res = finalOptions.mimeFilters
					? finalOptions.mimeFilters.includes(file.mimetype)
					: true;
				cb(null, res);
			},
			storage: multerS3({
				s3: this.s3Client,
				bucket: this.options.bucket,
				acl: 'public-read',
				contentType: multerS3.AUTO_CONTENT_TYPE,
				metadata: function (_req, file, cb) {
					const meta = {
						fieldName: file.fieldname,
						fileName: file.originalname,
						uploadOn: new Date().toISOString(),
					};
					cb(null, meta);
				},
				key: function (_req, file, cb) {
					const key: string[] = [];
					if (finalOptions.folder) key.push(finalOptions.folder);
					const value = napiNanoId.nanoid();
					const ext = path.extname(file.originalname);
					key.push(value + ext);

					cb(null, key.join('/'));
				},
			}),
		});
	}
}
