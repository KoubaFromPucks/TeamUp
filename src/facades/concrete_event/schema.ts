import z from 'zod';
import { EventInvitationListDto } from '../event_invitation/schema';

export const concreteEventUpdateSchema = z.object({
	eventId: z.string().uuid('Invalid event ID'),
	price: z.number().gte(0).nullable(),
	startDate: z.string(),
	endDate: z.string()
});

export type ConcreteEventUpdateDto = z.infer<typeof concreteEventUpdateSchema>;

export type ConcreteEventDetailDto = ConcreteEventUpdateDto & {
	id: string;
	invitedUsers: EventInvitationListDto[];
	eventName: string | undefined;
};

export type ConcreteEventListDto = Omit<ConcreteEventDetailDto, 'invitedUsers'>;
