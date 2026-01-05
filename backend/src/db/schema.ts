import { relations } from "drizzle-orm";
import { users } from "./schemas/users.schema";
import { links } from "./schemas/links.schema";

// --- Export Relations --- //

export const userRelations = relations(users, ({ many }) => ({
  links: many(links),
}));

export const linksRelations = relations(links, ({ one }) => ({
  users: one(users, {
    fields: [links.userId],
    references: [users.id],
  }),
}));

// --- Export schemas --- //

export * from "./schemas/users.schema";
export * from "./schemas/links.schema";
