import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
	schema: ({ image }) => z.object({
		title: z.string(),
		description: z.string(),
		pubDate: z.coerce.date(),
		updatedDate: z.coerce.date().optional(),
		heroImage: image().optional(),
		author: z.string().default('Reynaldi Wong'),
        category: z.string().optional(),
	}),
});

export const collections = { blog };
