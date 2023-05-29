import { gql } from 'graphql-request';
import { client } from '../helpers';
import { UserMeta } from '../types';
import { IURLStoreService } from '../interfaces/urlstore.interface';

export default class URLStore implements IURLStoreService {
	public async storeURLS(url: string, meta: UserMeta) {
		const query = gql`
			mutation insertURL($object: shorturls_insert_input!) {
				insert_shorturls_one(object: $object) {
					short_key
					original_url
				}
			}
		`;
		const variables = {
			object: {
				original_url: url,
				creator_ip: meta.ip,
				apikeyUsed: meta.apiKeyID,
			},
		};
		const result: any = await client.request(query, variables);
		return result.insert_shorturls_one;
	}

	public async getURLS(short_key: string) {
		const query = gql`
			query getURL($short_key: String!) {
				shorturls(where: { short_key: { _eq: $short_key } }) {
					original_url
				}
			}
		`;
		const variables = {
			short_key,
		};
		const result: any = await client.request(query, variables);
		return result.shorturls[0];
	}

	public async deleteURLS(urlID: string) {
		const query = gql`
			mutation deleteURL($urlID: uuid!) {
				delete_shorturls(where: { urlID: { _eq: $urlID } }) {
					affected_rows
				}
			}
		`;
		const variables = {
			urlID,
		};
		const result: any = await client.request(query, variables);
		return result.delete_shorturls.affected_rows;
	}

	public async getAllURLS(searchQuery = '', limit = 10, offset = 0) {
		const query = gql`
			query getAllURLS($searchQuery: String!, $limit: Int!, $offset: Int!) {
				shorturls(
					where: {
						_or: [
							{ short_key: { _iregex: $searchQuery } }
							{ original_url: { _iregex: $searchQuery } }
						]
					}
					limit: $limit
					offset: $offset
				) {
					clicks
					original_url
					short_key
					urlID
				}
			}
		`;
		const variables = {
			searchQuery,
			limit,
			offset,
		};
		const result: any = await client.request(query, variables);
		return result.shorturls;
	}

	public async getaURLS(urlID: string) {
		const query = gql`
			query getaURLS($urlID: uuid!) {
				shorturls(where: { urlID: { _eq: $urlID } }) {
					clicks
					original_url
					short_key
					urlID
				}
			}
		`;
		const variables = {
			urlID,
		};
		const result: any = await client.request(query, variables);
		return result.shorturls[0];
	}

	public async updateURLS(urlID: string, updateObject: any) {
		const query = gql`
			mutation updateURLS($urlID: uuid!, $updateObject: shorturls_set_input!) {
				update_shorturls(
					where: { urlID: { _eq: $urlID } }
					_set: $updateObject
				) {
					affected_rows
				}
			}
		`;
		const variables = {
			urlID,
			updateObject,
		};
		const result: any = await client.request(query, variables);
		return result.update_shorturls.affected_rows;
	}
}
