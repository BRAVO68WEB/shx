import UploaderService from '../data/uploader.service';
import { gql } from 'graphql-request';
import { client } from '../helpers';
import { IListUploads, IUploaderService } from '../interfaces/upload.interface';
import { UserMeta } from '../types';
import ConfigService from './config.service';
import { Uploads } from '../graphql/types';

export default class Uploader implements IUploaderService {
	uploaderService: UploaderService;
	configService: ConfigService;

	constructor() {
		this.uploaderService = new UploaderService(process.env.R2_BUCKET_NAME);
		this.configService = new ConfigService();
	}

	public uploadS = async (file: any, meta: UserMeta): Promise<Uploads> => {
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
