import { z } from 'zod';
import { TeamListDto } from '../team/schema';
import { emptyToUndefined } from '@/lib/utils';

export const userUpdateCreateSchema = z
	.object({
		name: z
			.string()
			.min(1, 'Name is required')
			.max(80, 'Name must be at most 80 characters'),
		nickname: z
			.string()
			.min(1, 'Nickname is required')
			.max(40, 'Nickname must be at most 40 characters'),
		email: z.string().email('Invalid email address'),
		phoneNumber: z.string().optional(),
		imageUrl: z.preprocess(
			emptyToUndefined,
			z.string().url('Invalid URL').optional()
		)
	})
	.refine(
		data => {
			if (!data.phoneNumber || data.phoneNumber.length == 0) return true;

			const phoneRegex = /^\+?[1-9][\d+ ?]*$/;
			if (!phoneRegex.test(data.phoneNumber)) return false;
			if (data.phoneNumber.replace(/\D/g, '').length < 9) return false;

			return true;
		},
		{
			message:
				'Invalid phone number format. It should be in format: +<prefix> <number>',
			path: ['phoneNumber']
		}
	);

export type UserUpdateCreateDto = z.infer<typeof userUpdateCreateSchema>;

export type UserDetailDto = {
	id: string;
	name: string;
	nickname: string;
	email: string;
	phoneNumber?: string;
	imageUrl?: string;
	adminedTeams: TeamListDto[];
	memberTeams: TeamListDto[];
};

export type UserListDto = Omit<UserDetailDto, 'adminedTeams' | 'memberTeams'>;
