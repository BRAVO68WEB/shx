import { z } from 'zod';

export const LoginSchema = z.object({
	masterkey: z.string().max(256),
});

export type LoginType = z.infer<typeof LoginSchema>;
