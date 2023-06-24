import { gql } from 'graphql-request';
import { client } from '../helpers';
import { IAPIKeyService, IListAPIKeys } from '../interfaces/apikey.interface';
import { encapDataKeys, encapDataKey } from '../libs';
import { Apikeys, Apikeys_Mutation_Response } from '../graphql/types';
export default class APIKeyService implements IAPIKeyService {
	public async checkS(apikey: string): Promise<Apikeys | null> {
		const query = gql`
			query checkAPIKey($apikey: String!) {
				apikeys(where: { key: { _eq: $apikey } }) {
					key
					keyID
					last_used
				}
			}
		`;
		const variables = {
			apikey,
		};
		const result: { apikeys: Apikeys[] } = await client.request(
			query,
			variables
		);
		if (result.apikeys.length === 0) {
			return null;
		} else {
			const updateLastUsedquery = gql`
				mutation updateLastUsed($apikeyID: uuid!) {
					update_apikeys_by_pk(
						pk_columns: { keyID: $apikeyID }
						_set: { last_used: "now()" }
					) {
						key
						keyID
						last_used
					}
				}
			`;

			const updateLastUsedVariables = {
				apikeyID: result.apikeys[0].keyID,
			};

			const updateLastUsedResult: { update_apikeys_by_pk: Apikeys } =
				await client.request(updateLastUsedquery, updateLastUsedVariables);

			return updateLastUsedResult.update_apikeys_by_pk;
		}
	}

	public async generateS(masterKey: string): Promise<Apikeys> {
		if (masterKey !== process.env.MASTER_KEY)
			throw new Error('Invalid master key');
		const query = gql`
			mutation generateAPIKey {
				insert_apikeys_one(object: {}) {
					key
					keyID
				}
			}
		`;
		const result: { insert_apikeys_one: Apikeys } = await client.request(query);
		return result.insert_apikeys_one;
	}

	public async deleteS(apikeyID: string, masterKey: string): Promise<number> {
		if (masterKey !== process.env.MASTER_KEY)
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
		const result: {
			delete_apikeys: Apikeys_Mutation_Response;
		} = await client.request(query, variables);
		return result.delete_apikeys.affected_rows;
	}

	public async listS(masterKey: string): Promise<IListAPIKeys> {
		if (masterKey !== process.env.MASTER_KEY)
			throw new Error('Invalid master key');
		const query = gql`
			query listAPIKeys {
				apikeys {
					key
					keyID
					last_used
				}

				apikeys_aggregate {
					aggregate {
						count
					}
				}
			}
		`;
		const result: {
			apikeys: Apikeys[];
			apikeys_aggregate: {
				aggregate: {
					count: number;
				};
			};
		} = await client.request(query);
		return {
			data: encapDataKeys(result.apikeys),
			meta: {
				total: result.apikeys_aggregate.aggregate.count,
			},
		};
	}

	public async verifyS(apikey: string): Promise<boolean> {
		const query = gql`
			query verifyAPIKey($apikey: String!) {
				apikeys(where: { key: { _eq: $apikey } }) {
					key
					keyID
					last_used
				}
			}
		`;
		const variables = {
			apikey,
		};
		const result: {
			apikeys: Apikeys[];
		} = await client.request(query, variables);
		if (result.apikeys.length === 0) {
			return false;
		} else {
			return true;
		}
	}
}
