import { z } from "zod";
import { linkSchema } from "../link";

// --- Sentivet Fileds --- //

export const sensitiveFields = z.object({
  password: z.string().min(6, "Password must be at least 6 characters"),
});

// --- Base schema (shared DTO base) --- //

export const baseUserSchema = z.object({
  id: z.number(),
  name: z.string().trim().min(1, "Name must be at least 1 character"),
  username: z.string().trim().min(3, "Username must be at least 3 characters"),
  bio: z
    .string()
    .max(1000, "Bio must be at most 1000 characters")
    .optional()
    .nullable(),
  email: z.email("Must be a valid email"),
  avatar_image_url: z.url().nullable().optional(),
  is_live: z.boolean(),
  is_verified: z.boolean(),
});

// --- Public user schema --- //

export const publicUserSchema = baseUserSchema
  .omit({
    email: true,
  })
  .extend({
    links: z.array(
      linkSchema.omit({
        id: true,
        user_id: true,
        is_active: true,
        created_at: true,
        updated_at: true,
      })
    ),
  });

// --- Login User --- //

export const loginSchema = z
  .object({
    email: z.email(),
  })
  .extend(sensitiveFields.shape);

// --- Create user --- //

export const registerSchema = baseUserSchema
  .omit({
    id: true,
    bio: true,
    is_live: true,
    is_verified: true,
    avatar_image_url: true,
  })
  .extend(sensitiveFields.shape);

// --- Update user --- //

export const updateUserSchema = baseUserSchema
  .omit({
    id: true,
  })
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

export const usernameParamValidation = z.object({
  username: z
    .string()
    .min(1)
    .transform((val) => (val.startsWith("@") ? val.slice(1) : val))
    .refine((val) => /^[a-zA-Z0-9_]+$/.test(val), {
      message: "Invalid username format",
    }),
});

export const usernameValidation = z.object({
  username: z.string().trim().min(3),
});

export const emailValidation = z.object({
  email: z.email(),
});
