import { sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const concreteEventTable = sqliteTable(
    'concrete_event',
    {
        /*TODO eventId */
        id: text('id')
            .primaryKey()
            .$defaultFn(() => crypto.randomUUID()),
        price: integer('price'),
        startDate: text('start_date').notNull().default(sql`CURRENT_TIMESTAMP`),
        endDate: text('end_date').notNull().default(sql`CURRENT_TIMESTAMP`)
    }
);

export type DrizzleConcreteEvent = typeof concreteEventTable.$inferSelect;