import { gql } from 'graphql-request';
import { client } from '../helpers';
import { configKeys } from '..';
import { IAPIKeyService } from '../interfaces/apikey.interface';
import { encapDataKeys } from '../libs';

export default class APIKeyService implements IAPIKeyService {
	public async checkS(apikey: string): Promise<any> {
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

	public async generateS(masterKey: string): Promise<any> {
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

	public async deleteS(apikeyID: string, masterKey: string): Promise<any> {
		if (masterKey !== configKeys.MASTER_KEY)
			throw new Error('Invalid master key');
		const query = gql`
			mutation deleteAPIKey($apikeyID: uuid!) {
				delete_apikeys(where: { keyID: { _eq: $apikeyID } }) {
					affected_rows
				}
			}
		`;
		const variables = {
			apikeyID,
		};
		const result: any = await client.request(query, variables);
		return result.delete_apikeys.affected_rows;
	}

	public async listS(masterKey: string): Promise<any> {
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
		return encapDataKeys(result.apikeys);
	}

	public async verifyS(apikey: string): Promise<any> {
		const query = gql`
			query verifyAPIKey($apikey: String!) {
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
			return false;
		} else {
			return true;
		}
	}
}
