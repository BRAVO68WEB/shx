import { GraphQLClient } from 'graphql-request';
import { configKeys } from '..';
import axios from 'axios';
import { logger } from '../libs';

export let client = new GraphQLClient('');

export const hgqlInit = async () => {
	logger.info('🚀 GraphQL Client Initialized');

	let HASURA_URL: string = configKeys.HASURA_GRAPHQL_ENDPOINT || '';
	HASURA_URL += HASURA_URL.endsWith('/') ? 'v1/graphql' : '/v1/graphql';
	const HASURA_ADMIN: string = configKeys.HASURA_GRAPHQL_ADMIN_SECRET || '';

	client = new GraphQLClient(HASURA_URL, {
		headers: {
			'x-hasura-admin-secret': HASURA_ADMIN,
		},
	});

	if (process.env.DOCKER_ENV) {
		const data = JSON.stringify({
			type: 'bulk',
			source: 'default',
			resource_version: 1,
			args: [
				{
					type: 'pg_track_table',
					args: {
						table: {
							name: 'apikeys',
							schema: 'public',
						},
						source: 'default',
					},
				},
				{
					type: 'pg_track_table',
					args: {
						table: {
							name: 'gists',
							schema: 'public',
						},
						source: 'default',
					},
				},
				{
					type: 'pg_track_table',
					args: {
						table: {
							name: 'shorturls',
							schema: 'public',
						},
						source: 'default',
					},
				},
				{
					type: 'pg_track_table',
					args: {
						table: {
							name: 'uploads',
							schema: 'public',
						},
						source: 'default',
					},
				},
			],
		});

		const data2 = JSON.stringify({
			type: 'bulk',
			source: 'default',
			resource_version: 2,
			args: [
				{
					type: 'pg_create_array_relationship',
					args: {
						name: 'gists',
						table: {
							name: 'apikeys',
							schema: 'public',
						},
						using: {
							foreign_key_constraint_on: {
								table: {
									name: 'gists',
									schema: 'public',
								},
								column: 'apikeyUsed',
							},
						},
						source: 'default',
					},
				},
				{
					type: 'pg_create_array_relationship',
					args: {
						name: 'shorturls',
						table: {
							name: 'apikeys',
							schema: 'public',
						},
						using: {
							foreign_key_constraint_on: {
								table: {
									name: 'shorturls',
									schema: 'public',
								},
								column: 'apikeyUsed',
							},
						},
						source: 'default',
					},
				},
				{
					type: 'pg_create_array_relationship',
					args: {
						name: 'uploads',
						table: {
							name: 'apikeys',
							schema: 'public',
						},
						using: {
							foreign_key_constraint_on: {
								table: {
									name: 'uploads',
									schema: 'public',
								},
								column: 'apikeyUsed',
							},
						},
						source: 'default',
					},
				},
				{
					type: 'pg_create_object_relationship',
					args: {
						name: 'apikey',
						table: {
							name: 'gists',
							schema: 'public',
						},
						using: {
							foreign_key_constraint_on: 'apikeyUsed',
						},
						source: 'default',
					},
				},
				{
					type: 'pg_create_object_relationship',
					args: {
						name: 'apikey',
						table: {
							name: 'shorturls',
							schema: 'public',
						},
						using: {
							foreign_key_constraint_on: 'apikeyUsed',
						},
						source: 'default',
					},
				},
				{
					type: 'pg_create_object_relationship',
					args: {
						name: 'apikey',
						table: {
							name: 'uploads',
							schema: 'public',
						},
						using: {
							foreign_key_constraint_on: 'apikeyUsed',
						},
						source: 'default',
					},
				},
			],
		});

		const config = {
			method: 'post',
			url: configKeys.HASURA_GRAPHQL_ENDPOINT + '/v1/metadata',
			headers: {
				'x-hasura-admin-secret': configKeys.HASURA_GRAPHQL_ADMIN_SECRET,
			},
		};

		try {
			await axios({
				...config,
				data: data,
			}).then(res => {
				logger.info(
					'🪄 Hasura Tables Metadata Tracked for ' + res.data.length + ' tables'
				);
			});
			await axios({
				...config,
				data: data2,
			}).then(res => {
				logger.info(
					'🪄 Hasura Relationships Metadata Tracked for ' +
						res.data.length +
						' relationships'
				);
			});
		} catch (err: any) {
			if (err.response?.data?.code == 'already-tracked') {
				logger.info('🃏 Hasura Metadata Already Tracked');
			} else {
				logger.info('🚨 Hasura Metadata Tracking Failed');

				setTimeout(() => {
					hgqlInit();
				}, 10000);
			}
		}
	}
};
