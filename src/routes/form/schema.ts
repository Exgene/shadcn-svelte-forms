import { z } from 'zod';

export const formSchema = z.object({
	username: z
		.string()
		.min(2)
		.max(10)
		.regex(/[a-zA-Z]/),
	email: z.string().email(),
	values: z.string().min(3).max(8)
});

export type FormSchema = typeof formSchema;
