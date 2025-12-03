import z from 'zod';
import { UserListDto } from '../user/schema';

export const eventInvitationUpdateSchema = z.object({
	state: z.enum(['Accepted', 'Declined', 'Not sure', 'Pending']),
	concreteEventId: z.string().uuid('Invalid concrete event ID'),
	userId: z.string().uuid('Invalid user ID')
});

export type EventInvitationUpdateDto = z.infer<
	typeof eventInvitationUpdateSchema
>;

export type EventInvitationDetailDto = EventInvitationUpdateDto & {
	id: string;
	user: UserListDto | undefined;
};

export type EventInvitationListDto = EventInvitationDetailDto;
