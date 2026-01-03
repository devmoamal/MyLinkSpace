import { relations } from "drizzle-orm";
import { users } from "./schema/users.schema";
import { links } from "./schema/links.schema";

export * from "./schema/users.schema";
export * from "./schema/links.schema";

export const usersRelations = relations(users, ({ many }) => ({
  links: many(links),
}));

export const linksRelations = relations(links, ({ one }) => ({
  user: one(users, {
    fields: [links.user_id],
    references: [users.id],
  }),
}));
