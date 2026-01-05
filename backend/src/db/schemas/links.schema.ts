import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import { users } from "./users.schema";
import type { LinkIconType, LinkType } from "@mylinkspace/shared";

export const links = sqliteTable("links", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  userId: integer("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  title: text("title").notNull(),
  url: text("url").notNull(),
  type: text("type").$type<LinkType>().notNull(),
  icon: text("icon").$type<LinkIconType>().notNull(),

  position: integer("position").notNull().default(0),
  isActive: integer("is_active", { mode: "boolean" }).notNull().default(true),

  createdAt: integer("created_at", { mode: "timestamp_ms" })
    .notNull()
    .default(new Date()),
  updatedAt: integer("updated_at", { mode: "timestamp_ms" })
    .notNull()
    .default(new Date())
    .$onUpdate(() => new Date()),
});
