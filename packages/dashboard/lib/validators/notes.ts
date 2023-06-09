import { z } from 'zod';

export const addNoteSchema = z.object({
	text: z.string().min(1),
	password: z.string(),
	burn: z.boolean(),
});

export type AddNoteType = z.infer<typeof addNoteSchema>;
