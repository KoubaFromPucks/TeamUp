import { sqliteTable, text, real } from "drizzle-orm/sqlite-core";

export const venueTable = sqliteTable("venues", {
  Id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  Name: text("name").notNull(),
  Address: text("address").notNull(),
  GPS: text("gps"),
  Description: text("description"),
  PricePerHour: real("price_per_hour").notNull().default(0),
});