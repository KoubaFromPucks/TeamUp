import { sqliteTable, text } from "drizzle-orm/sqlite-core";
import { concreteEventTable } from "./concrete-event";

export const eventInvitationTable = sqliteTable(
    'event_invitation',
    {
        id: text('id')
            .primaryKey()
            .$defaultFn(() => crypto.randomUUID()),
        state: text('state')
            .notNull(),
        concreteEventId: text('concrete_event_id')
            .notNull()
            .references(() => concreteEventTable.id),
            /*TODO userId */
    }
);

export type DrizzleEventInvitation = typeof eventInvitationTable.$inferSelect;