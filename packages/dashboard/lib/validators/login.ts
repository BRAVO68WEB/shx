import { z } from 'zod';

export const LoginSchema = z.object({
	masterkey: z.string().max(256),
	instanceUrl: z.string().url(),
});

export type LoginType = z.infer<typeof LoginSchema>;
