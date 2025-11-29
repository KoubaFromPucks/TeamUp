import type {
  VenueSelectEntity,
  VenueInsertEntity,
} from "@/repositories/venue/schema";
import { db, venueTable } from "@/db";
import { eq } from "drizzle-orm";

export const venueRepository = {
  async createVenue(venueEntity: VenueInsertEntity) {
    const created = await db
      .insert(venueTable)
      .values(venueEntity)
      .returning();

    return created[0] as VenueSelectEntity;
  },

  async getVenueById(venueId: string) {
    const venue = await db
      .select()
      .from(venueTable)
      .where(eq(venueTable.Id, venueId))
      .limit(1);

    return venue[0] as VenueSelectEntity | undefined;
  },

  async getAllVenues() {
    const venues = await db.select().from(venueTable);
    return venues as VenueSelectEntity[];
  },

  async updateVenueById(
    venueId: string,
    venueEntity: Partial<VenueInsertEntity>
  ) {
    const updated = await db
      .update(venueTable)
      .set(venueEntity)
      .where(eq(venueTable.Id, venueId))
      .returning();

    return updated[0] as VenueSelectEntity | undefined;
  },

  async deleteVenueById(venueId: string) {
    const deleted = await db
      .delete(venueTable)
      .where(eq(venueTable.Id, venueId))
      .returning();

    return deleted[0] as VenueSelectEntity | undefined;
  },
};
