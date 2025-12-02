import { concreteEventTable } from "@/db/schema/concrete-event";

export type ConcreteEventSelectEntity = typeof concreteEventTable.$inferSelect;
export type ConcreteEventInsertEntity = Omit<typeof concreteEventTable.$inferSelect, 'id'>;
export type ConcreteEventUpdateEntity = Partial<ConcreteEventInsertEntity>;