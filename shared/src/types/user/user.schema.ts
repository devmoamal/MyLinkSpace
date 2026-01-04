import { z } from "zod";
import { linkSchema } from "../link";

// --- Base schema (shared DTO base) --- //

export const baseUserSchema = z.object({
  name: z.string().trim().min(1, "Name must be at least 1 character"),
  username: z.string().trim().min(3, "Username must be at least 3 characters"),
  email: z.email("Must be a valid email"),
  avatar_image_url: z.url().nullable().optional(),
});

// --- Public user schema --- //
export const publicUserSchema = z.object({
  id: z.number(),
  name: z.string(),
  username: z.string(),
  avatar_image_url: z.url().nullable().optional(),
  is_verified: z.boolean(),
  links: z.array(linkSchema),
});

// --- Create user --- //

export const createUserSchema = baseUserSchema.extend({
  password: z.string().min(6, "Password must be at least 6 characters"),
});
// --- Update user --- //

export const updateUserSchema = baseUserSchema
  .partial()
  .refine((data) => Object.keys(data).length > 0, {
    message: "At least one field must be provided",
  });

// --- Password change --- //

export const passwordChangeSchema = z
  .object({
    current_password: z.string().min(6),
    new_password: z.string().min(6),
    confirm_new_password: z.string(),
  })
  .refine((data) => data.new_password === data.confirm_new_password, {
    message: "Passwords don't match",
    path: ["confirm_new_password"],
  });

// --- Validation schemas (params / queries) --- //

export const idValidation = z.object({
  id: z.coerce.number().int().positive(),
});

export const usernameValidation = z.object({
  username: z.string().trim().min(3),
});

export const emailValidation = z.object({
  email: z.string().trim().email(),
});
