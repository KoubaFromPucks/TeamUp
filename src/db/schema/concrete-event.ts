import { sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { eventTable } from "./event";

export const concreteEventTable = sqliteTable(
    'concrete_event',
    {
        id: text('id')
            .primaryKey()
            .$defaultFn(() => crypto.randomUUID()),
        eventId: text('event_id')
            .notNull()
            .references(() => eventTable.id),
        price: integer('price'),
        startDate: text('start_date').notNull().default(sql`CURRENT_TIMESTAMP`),
        endDate: text('end_date').notNull().default(sql`CURRENT_TIMESTAMP`)
    }
);