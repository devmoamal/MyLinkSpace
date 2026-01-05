import { relations } from "drizzle-orm";
import { users } from "./schemas/users.schema";
import { links } from "./schemas/links.schema";

export * from "./schemas/users.schema";
export * from "./schemas/links.schema";

export const usersRelations = relations(users, ({ many }) => ({
  links: many(links),
}));

export const linksRelations = relations(links, ({ one }) => ({
  user: one(users, {
    fields: [links.user_id],
    references: [users.id],
  }),
}));
