import type {
  EventSelectEntity,
  EventInsertEntity,
} from "@/repositories/event/schema";
import { db, eventTable } from "@/db";
import { eq } from "drizzle-orm";

export const eventRepository = {
  async createEvent(eventEntity: EventInsertEntity) {
    const created = await db
      .insert(eventTable)
      .values(eventEntity)
      .returning();

    return created[0] as EventSelectEntity;
  },

  async getEventById(eventId: string) {
    const event = await db
      .select()
      .from(eventTable)
      .where(eq(eventTable.Id, eventId))
      .limit(1);

    return event[0] as EventSelectEntity | undefined;
  },

  async getAllEvents() {
    const events = await db.select().from(eventTable);
    return events as EventSelectEntity[];
  },

  async updateEventById(
    eventId: string,
    eventEntity: Partial<EventInsertEntity>
  ) {
    const updated = await db
      .update(eventTable)
      .set(eventEntity)
      .where(eq(eventTable.Id, eventId))
      .returning();

    return updated[0] as EventSelectEntity | undefined;
  },

  async deleteEventById(eventId: string) {
    const deleted = await db
      .delete(eventTable)
      .where(eq(eventTable.Id, eventId))
      .returning();

    return deleted[0] as EventSelectEntity | undefined;
  },

  // BONUS: eventy i s venue + organiser (když chceš používat relations)
  async getAllEventsWithRelations() {
    const events = await db.query.eventTable.findMany({
      with: {
        venue: true,
        organiser: true,
      },
    });

    return events;
  },
};
