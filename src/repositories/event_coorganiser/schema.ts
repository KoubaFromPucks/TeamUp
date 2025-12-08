import { eventCoorganiserTable } from "@/db";

export type EventCoorganiserSelectEntity = typeof eventCoorganiserTable.$inferSelect;
export type EventCoorganiserInsertEntity = Omit<EventCoorganiserSelectEntity, 'id'>;