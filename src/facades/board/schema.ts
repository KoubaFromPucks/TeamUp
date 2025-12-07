import z from 'zod';

export const boardItemCreateUpdateSchema = z.object({
	concreteEventId: z.string().uuid('Invalid concrete event ID'),
	authorId: z.string().uuid('Invalid author ID'),
	title: z.string().min(1, 'Title is required').max(200, 'Title is too long'),
	content: z.string().min(1, 'Content is required'),
	isPinned: z.boolean().default(false)
});

export const boardItemUpdateOnlySchema = z.object({
	title: z
		.string()
		.min(1, 'Title is required')
		.max(200, 'Title is too long')
		.optional(),
	content: z.string().min(1, 'Content is required').optional(),
	isPinned: z.boolean().optional()
});

export type BoardItemCreateUpdateDto = z.infer<
	typeof boardItemCreateUpdateSchema
>;

export type BoardItemUpdateOnlyDto = z.infer<typeof boardItemUpdateOnlySchema>;

export type BoardItemDetailDto = BoardItemCreateUpdateDto & {
	id: string;
	createdAt: string;
	updatedAt: string | null;
};

export type BoardItemListDto = BoardItemDetailDto;
