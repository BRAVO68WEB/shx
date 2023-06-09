import { z } from 'zod';

declare global {
	// eslint-disable-next-line @typescript-eslint/no-namespace
	namespace NodeJS {
		// eslint-disable-next-line
		interface ProcessEnv extends z.infer<typeof ZodEnvironmentVariables> {}
	}
}

const ZodEnvironmentVariables = z.object({
	TOKEN: z.string(),
	CLIENT_ID: z.string(),
	DEV_GUILD_ID: z.string(),
	SHX_API_TOKEN: z.string(),
	SHX_API_URL: z.string(),
	PERMISSION_INTEGER: z.string(),
	SHX_DASH_URL: z.string(),
	DISCORD_OWNER_ID: z.string(),
});

ZodEnvironmentVariables.parse(process.env);

console.log('✅ Environment variables verified!');
