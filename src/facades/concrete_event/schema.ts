import z from 'zod';
import { EventInvitationListDto } from '../event_invitation/schema';

export const concreteEventUpdateSchema = z
	.object({
		eventId: z.string().uuid('Invalid event ID'),
		price: z.preprocess(value => {
			if (value === '') return null;
			if (typeof value === 'string') return Number(value);
			return value;
		}, z.number().gte(0).nullable()),
		startDate: z.string(),
		endDate: z.string()
	})
	.refine(data => new Date(data.endDate) >= new Date(data.startDate), {
		message: 'End date cannot be earlier than start date',
		path: ['endDate']
	});

export type ConcreteEventUpdateDto = z.infer<typeof concreteEventUpdateSchema>;

export type ConcreteEventDetailDto = ConcreteEventUpdateDto & {
	id: string;
	invitedUsers: EventInvitationListDto[];
	eventName: string | undefined;
	eventPricingType: string | undefined;
};

export type ConcreteEventListDto = Omit<ConcreteEventDetailDto, 'invitedUsers'>;
