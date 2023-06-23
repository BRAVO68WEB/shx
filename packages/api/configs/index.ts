import { z } from 'zod';

declare global {
	// eslint-disable-next-line @typescript-eslint/no-namespace
	namespace NodeJS {
		// eslint-disable-next-line
		interface ProcessEnv extends z.infer<typeof ZodEnvironmentVariables> {}
	}
}

const ZodEnvironmentVariables = z.object({
	PORT: z.string(),
	NODE_ENV: z.string(),
	HASURA_GRAPHQL_ADMIN_SECRET: z.string(),
	HASURA_GRAPHQL_ENDPOINT: z.string(),
	CACHE_ENV: z.string(),
	REDIS_URL: z.string(),
	R2_CLIENT_ID: z.string(),
	R2_CLIENT_SECRET: z.string(),
	R2_BUCKET_NAME: z.string(),
	R2_BUCKET_REGION: z.string(),
	R2_BUCKET_ENDPOINT: z.string(),
	R2_BUCKET_URL: z.string(),
	R2_BUCKET_FOLDER: z.string(),
	MASTER_KEY: z.string(),
});

ZodEnvironmentVariables.parse(process.env);

console.log('✅ Environment variables verified!');
