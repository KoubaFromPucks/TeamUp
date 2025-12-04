import { real, sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { venueTable } from './venue';
import { user as userTable } from './better-auth';
import { dayOfWeekEnum } from './enums/dayOfWeek';
import { inviteTypeEnum } from './enums/inviteType';
import { pricingTypeEnum } from './enums/pricingType';

export const eventTable = sqliteTable('events', {
	id: text('id')
		.primaryKey()
		.$defaultFn(() => crypto.randomUUID()),
	venueId: text('venue_id')
		.notNull()
		.references(() => venueTable.id, { onDelete: 'cascade' }),
	organisatorId: text('organisator_id')
		.notNull()
		.references(() => userTable.id, { onDelete: 'restrict' }),
	name: text('name').notNull(),
	startTime: text('start_time').notNull(),
	endTime: text('end_time').notNull(),
	dayOfWeek: text('day_of_week', { enum: dayOfWeekEnum }).notNull(),
	inviteType: text('invite_type', { enum: inviteTypeEnum }).notNull(),
	pricingType: text('pricing_type', { enum: pricingTypeEnum }).notNull(),
	totalPrice: real('total_price').notNull().default(0)
});
