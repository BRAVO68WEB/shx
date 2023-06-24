import { gql } from 'graphql-request';
import { client } from '../helpers';
import {
	IGistService,
	IListGists,
	IPrivate,
} from '../interfaces/gists.interface';
import { UserMeta } from '../types';
import { Gists, Gists_Mutation_Response } from '../graphql/types';

export default class GistService implements IGistService {
	public async getGistS(
		gistKey: string,
		passkey?: string
	): Promise<Gists | null> {
		const query = gql`
			query getGist($gistKey: String!) {
				gists(where: { gist_url_key: { _eq: $gistKey } }) {
					gistID
					content
					gist_url_key
					created_on
					isPrivate
					isOneTimeOnly
					views
				}
			}
		`;
		const variables = {
			gistKey,
		};
		const result: {
			gists: Gists[];
		} = await client.request(query, variables);
		if (result.gists.length === 0) {
			return null;
		} else {
			const gistData = result.gists[0];
			if (gistData.isOneTimeOnly) {
				const delQuery = gql`
					mutation deleteGist($gistKey: String!) {
						delete_gists(where: { gist_url_key: { _eq: $gistKey } }) {
							affected_rows
						}
					}
				`;
				const delVariables = {
					gistKey,
				};
				await client.request(delQuery, delVariables);
			} else {
				const updtViewQuery = gql`
					mutation updayeGist($gistKey: String!) {
						update_gists(
							where: { gist_url_key: { _eq: $gistKey } }
							_inc: { views: 1 }
						) {
							affected_rows
						}
					}
				`;
				const updtViewVariables = {
					gistKey,
				};
				await client.request(updtViewQuery, updtViewVariables);
			}
			if (gistData.passkey == passkey && gistData.isPrivate) {
				return null;
			} else {
				return gistData;
			}
		}
	}

	public async createGistS(
		content: string,
		meta: UserMeta,
		privateMeta: IPrivate,
		isOneTimeOnly = false
	): Promise<Gists> {
		const query = gql`
			mutation createGist($object: gists_insert_input!) {
				insert_gists_one(object: $object) {
					gistID
					content
					gist_url_key
					created_on
				}
			}
		`;
		const variables: any = {
			object: {
				apikeyUsed: meta.apiKeyID,
				content,
				creator_ip: meta.ip,
			},
		};

		variables.object = {
			...variables.object,
			isOneTimeOnly,
			content,
			isPrivate: privateMeta?.isPrivate ?? false,
			passkey: privateMeta.isPrivate ? privateMeta.passkey : null,
		};

		const result: {
			insert_gists_one: Gists;
		} = await client.request(query, variables);
		return result.insert_gists_one;
	}

	public async deleteGistS(gistID: string): Promise<number> {
		const query = gql`
			mutation deleteGist($gistID: uuid!) {
				delete_gists(where: { gistID: { _eq: $gistID } }) {
					affected_rows
				}
			}
		`;
		const variables = {
			gistID,
		};
		const result: {
			delete_gists: Gists_Mutation_Response;
		} = await client.request(query, variables);
		return result.delete_gists.affected_rows;
	}

	public async listGistsS(
		searchString = '',
		pageNo = 1,
		pageSize = 10
	): Promise<IListGists> {
		const query = gql`
			query listGists($searchString: String!, $pageNo: Int!, $pageSize: Int!) {
				gists(
					where: {
						_or: [
							{ content: { _iregex: $searchString } }
							{ gist_url_key: { _iregex: $searchString } }
						]
					}
					limit: $pageSize
					offset: $pageNo
				) {
					gistID
					content
					gist_url_key
					created_on
					isPrivate
					isOneTimeOnly
					views
				}

				gists_aggregate(
					where: {
						_or: [
							{ content: { _iregex: $searchString } }
							{ gist_url_key: { _iregex: $searchString } }
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
			searchString,
			pageNo: (pageNo - 1) * pageSize,
			pageSize,
		};
		const result: {
			gists: Gists[];
			gists_aggregate: {
				aggregate: {
					count: number;
				};
			};
		} = await client.request(query, variables);
		result.gists = result.gists.map(gist => {
			if (gist.isPrivate) {
				gist.content = 'Locked 🔒';
			}
			return gist;
		});
		return {
			data: result.gists,
			meta: {
				pageNo,
				pageSize,
				total: result.gists_aggregate.aggregate.count,
				totalPages: Math.ceil(
					result.gists_aggregate.aggregate.count / pageSize
				),
			},
		};
	}

	public async updateGistS(gistID: string, content: string): Promise<number> {
		const query = gql`
			mutation updateGist($gistID: uuid!, $content: String!) {
				update_gists(
					where: { gistID: { _eq: $gistID } }
					_set: { content: $content }
				) {
					affected_rows
				}
			}
		`;
		const variables = {
			gistID,
			content,
		};
		const result: {
			update_gists: Gists_Mutation_Response;
		} = await client.request(query, variables);
		return result.update_gists.affected_rows;
	}
}
