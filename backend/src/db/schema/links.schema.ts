import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import { users } from ".";

export const links = sqliteTable("links", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  user_id: integer("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  title: text("title").notNull(),
  url: text("url").notNull(),
  type: text("type").notNull(),
  icon: text("icon").notNull(),

  position: integer("position").notNull().default(0),
  is_active: integer("is_active", { mode: "boolean" }).notNull().default(true),

  createdAt: integer("created_at", { mode: "timestamp" })
    .notNull()
    .defaultNow(),
  updatedAt: integer("updated_at", { mode: "timestamp" })
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
});
