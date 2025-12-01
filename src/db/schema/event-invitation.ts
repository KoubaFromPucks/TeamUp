import { sqliteTable, text } from "drizzle-orm/sqlite-core";
import { concreteEventTable } from "./concrete-event";
import { userTable } from "..";
import { inviteStateEnum } from "./enums/inviteState";

export const eventInvitationTable = sqliteTable(
    'event_invitation',
    {
        id: text('id')
            .primaryKey()
            .$defaultFn(() => crypto.randomUUID()),
        state: text('state', {enum: inviteStateEnum})
            .notNull(),
        concreteEventId: text('concrete_event_id')
            .notNull()
            .references(() => concreteEventTable.id),
        userId: text('user_id')
            .notNull()
            .references(() => userTable.id)
    }
);

export type DrizzleEventInvitation = typeof eventInvitationTable.$inferSelect;