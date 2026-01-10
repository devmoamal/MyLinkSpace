import { z } from "zod";
import { LINK_ICONS, LINK_TYPES } from "../../constants";

// --- Link schema ---  //

// Base link schema without entity fields

export const baseLinkSchema = z.object({
  id: z.number(),
  user_id: z.number(),
  title: z.string().min(3, "Title should be at least 3 character"),
  url: z.url("Must be a valid URL"),
  type: z.enum(LINK_TYPES), // Will be validated by constants
  icon: z.enum(LINK_ICONS), // Will be validated by constants
  position: z.number().optional(), // position should be non-negative
  is_active: z.boolean(),
  created_at: z.date(),
  updated_at: z.date(),
});

// --- Schemas --- //

export const linkSchema = baseLinkSchema.extend({
  id: z.number(),

  created_at: z.date(),
  updated_at: z.date(),
});

export const createLinkSchema = baseLinkSchema.omit({
  id: true,
  user_id: true,
  is_active: true,
  created_at: true,
  updated_at: true,
});

export const updateLinkSchema = baseLinkSchema.partial().omit({
  id: true,
  user_id: true,
  created_at: true,
  updated_at: true,
});

// --- Validators --- //

export const linkIdValidation = z.object({
  id: z.coerce.number().int().positive(),
});
