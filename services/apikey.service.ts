import { gql } from 'graphql-request';
import { client } from '../helpers';
import { configKeys } from '..';

export default class APIKeyService {
	public async checkS(apikey: string) {
		const query = gql`
			query checkAPIKey($apikey: String!) {
				apikeys(where: { key: { _eq: $apikey } }) {
					key
					keyID
				}
			}
		`;
		const variables = {
			apikey,
		};
		const result: any = await client.request(query, variables);
		if (result.apikeys.length === 0) {
			return null;
		} else {
			return result.apikeys[0];
		}
	}

	public async generateS(masterKey: string) {
		if (masterKey !== configKeys.MASTER_KEY)
			throw new Error('Invalid master key');
		const query = gql`
			mutation generateAPIKey {
				insert_apikeys_one(object: {}) {
					key
					keyID
				}
			}
		`;
		const result: any = await client.request(query);
		return result.insert_apikeys_one;
	}

	public async deleteS(apikey: string, masterKey: string) {
		if (masterKey !== configKeys.MASTER_KEY)
			throw new Error('Invalid master key');
		const query = gql`
			mutation deleteAPIKey($apikey: String!) {
				delete_apikeys(where: { key: { _eq: $apikey } }) {
					affected_rows
				}
			}
		`;
		const variables = {
			apikey,
		};
		const result: any = await client.request(query, variables);
		return result.delete_apikeys.affected_rows;
	}

	public async listS(masterKey: string) {
		console.log(masterKey);
		if (masterKey !== configKeys.MASTER_KEY)
			throw new Error('Invalid master key');
		const query = gql`
			query listAPIKeys {
				apikeys {
					key
					keyID
				}
			}
		`;
		const result: any = await client.request(query);
		return result.apikeys;
	}
}
