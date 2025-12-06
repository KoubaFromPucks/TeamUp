import { sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { concreteEventTable } from "./concrete-event";
import { user as userTable } from "./better-auth";

export const boardItemTable = sqliteTable(
    'board_items',
    {
        id: text('id')
            .primaryKey()
            .$defaultFn(() => crypto.randomUUID()),
        concreteEventId: text('concrete_event_id')
            .notNull()
            .references(() => concreteEventTable.id, { onDelete: 'cascade' }),
        authorId: text('author_id')
            .notNull()
            .references(() => userTable.id, { onDelete: 'restrict' }),
        title: text('title').notNull(),
        content: text('content').notNull(),
        isPinned: integer('is_pinned', { mode: 'boolean' }).notNull().default(false),
        createdAt: text('created_at').notNull().default(sql`CURRENT_TIMESTAMP`),
        updatedAt: text('updated_at')
    }
);
