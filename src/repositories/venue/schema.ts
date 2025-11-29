import { venueTable } from "@/db/schema/venue";

export type VenueSelectEntity = typeof venueTable.$inferSelect;
export type VenueInsertEntity = Omit<typeof venueTable.$inferInsert, "Id">;
