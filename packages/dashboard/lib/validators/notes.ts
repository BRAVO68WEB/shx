import { z } from 'zod';

export const addNoteSchema = z.object({
	content: z.string().min(1),
	passkey: z.string(),
	isOneTimeOnly: z.boolean(),
});

export type AddNoteType = z.infer<typeof addNoteSchema>;
