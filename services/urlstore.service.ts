import { gql } from 'graphql-request';
import { client } from '../helpers';

export default class URLStore {
	public async storeURLS(url: string, meta: any) {
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
}
