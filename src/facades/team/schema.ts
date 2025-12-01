import { z } from 'zod';
import { UserListDto } from '../user/schema';

export const teamUpdateCreateSchema = z.object({
	name: z
		.string()
		.min(1, 'Name is required')
		.max(100, 'Name must be at most 100 characters'),
	desc: z
		.string()
		.max(500, 'Description must be at most 500 characters')
		.optional(),
	imageUrl: z.string().url('Invalid URL').optional(),
	organizerId: z.string().uuid('Invalid organizer ID')
});

export type TeamUpdateCreateDto = z.infer<typeof teamUpdateCreateSchema>;

export type TeamDetailDto = TeamUpdateCreateDto & {
	id: string;
	name: string;
	desc?: string;
	imageUrl?: string;
	organizerId: string;
	organizer: UserListDto;
	members: UserListDto[];
};

export type TeamListDto = Omit<TeamDetailDto, 'organizer' | 'members'>;
