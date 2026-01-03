import { z } from "zod";
import type { LinkIconType, LinkType } from "./link.types";

// --- Link schema ---  //

// Base link schema without entity fields
export const linkSchema = z.object({
  id: z.number(),

  user_id: z.number(),
  title: z.string().min(3, "Title should be at least 3 character"),
  url: z.url("Must be a valid URL"),
  type: z.string() as z.ZodType<LinkType>, // Will be validated by constants
  icon: z.string() as z.ZodType<LinkIconType>, // Will be validated by constants
  position: z.number().min(0), // position should be non-negative
  is_active: z.boolean().default(true),

  createdAt: z.date(),
  updatedAt: z.date(),
});
