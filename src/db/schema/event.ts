import { real, sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { venueTable } from "./venue";
import { userTable } from "./user"
import { dayOfWeekEnum } from './enums/dayOfWeek';
import { inviteTypeEnum } from './enums/inviteType';
import { pricingTypeEnum } from './enums/pricingType';

export const eventTable = sqliteTable("events", {
  Id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  VenueId: text("venue_id")
    .notNull()
    .references(() => venueTable.Id, { onDelete: "cascade" }),
 OrganisatorId: text("organisator_id")
    .notNull()
    .references(() => userTable.id, { onDelete: "restrict" }),
  Name: text("name").notNull(),
  StartTime: text("start_time").notNull(),
  EndTime: text("end_time").notNull(),
  DayOfWeek: text("day_of_week", { enum: dayOfWeekEnum }).notNull(),
  InviteType: text("invite_type", { enum: inviteTypeEnum }).notNull(),
  PricingType: text("pricing_type", { enum: pricingTypeEnum }).notNull(),
  TotalPrice: real("total_price").notNull().default(0),
});