import { db, eventCoorganiserTable } from "@/db"
import { eq } from "drizzle-orm"
import { EventCoorganiserSelectEntity } from "./schema";

export const eventCoorganiserRepository = {
    async getEventCoorganisersByEventId(eventId: string){
        const entities = await db
            .select()
            .from(eventCoorganiserTable)
            .where(eq(eventCoorganiserTable.eventId, eventId));
        return entities as EventCoorganiserSelectEntity[];

    }
}