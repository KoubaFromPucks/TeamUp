import z from 'zod';
import { BoardItemListDto } from '../board/schema';
import { ConcreteEventListDto } from '../concrete_event/schema';

export const dayOfWeekEnum = [
	'Mon',
	'Tue',
	'Wed',
	'Thu',
	'Fri',
	'Sat',
	'Sun'
] as const;
export const inviteTypeEnum = ['public', 'private', 'invite_only'] as const;
export const pricingTypeEnum = [
	'pre_paid',
	'pay_as_you_go',
	'pay_later'
] as const;

export const eventUpdateSchema = z.object({
	venueId: z.string().uuid('Invalid venue ID'),
	organisatorId: z.string().min(1, 'Invalid organisator ID'),

	name: z.string().min(1, 'Name is required'),

	startTime: z.string().min(1, 'Start time is required'),
	endTime: z.string().min(1, 'End time is required'),

	dayOfWeek: z.enum(dayOfWeekEnum),
	inviteType: z.enum(inviteTypeEnum),
	pricingType: z.enum(pricingTypeEnum),

	totalPrice: z.number().gte(0).nullable()
});

export type EventUpdateDto = z.infer<typeof eventUpdateSchema>;

export type EventListDto = {
	id: string;
	name: string;
	dayOfWeek: (typeof dayOfWeekEnum)[number];
	startTime: string;
	endTime: string;
	inviteType: (typeof inviteTypeEnum)[number];
	venueName?: string | null;
};

export type EventDetailDto = EventUpdateDto & {
	id: string;
	boardItems: BoardItemListDto[];
	concreteEvents: ConcreteEventListDto[];
};
