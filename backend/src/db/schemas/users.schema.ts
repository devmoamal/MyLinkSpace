import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

export const users = sqliteTable("users", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  username: text("username").notNull().unique(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  avatar: text("avatar"), // Avatar image URL
  is_verified: integer("is_verified", { mode: "boolean" })
    .default(false)
    .notNull(),
  created_at: integer("created_at", { mode: "timestamp" })
    .notNull()
    .default(new Date()),
  updated_at: integer("updated_at", { mode: "timestamp" })
    .notNull()
    .default(new Date())
    .$onUpdate(() => new Date()),
});
