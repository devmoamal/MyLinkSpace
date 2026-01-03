import { z } from "zod";
import { linkSchema } from "../link/link.shcema";

// --- User schemas --- //

// Base user schema without entity fields
export const userSchema = z.object({
  id: z.number(),

  name: z.string().min(3, "Name must be at least 3 characters"),
  username: z.string().min(3, "Username must be at least 3 characters"),
  email: z.email("Must be a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  avatar_image_url: z.url("Must be a valid URL").nullable().optional(),
  is_verified: z.boolean().default(false),
  links: z.array(linkSchema),
  createdAt: z.date(),
  updatedAt: z.date(),
});

// Public user schema (omits sensitive fields)
export const publicUserSchema = userSchema.omit({
  password: true,
});

// Create user schema (omits id and timestamps)
export const createUserSchema = userSchema.omit({
  id: true,
  links: true,
  createdAt: true,
  updatedAt: true,
});

// Register user schema (includes password confirmation)
export const registerUserSchema = createUserSchema
  .extend({
    confirm_password: z.string().nonempty("Please confirm your password"),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: "Passwords don't match",
  });

// Update user schema (omits password, id, and timestamps)
export const updateUserSchema = userSchema
  .omit({
    password: true,
    id: true,
    createdAt: true,
    updatedAt: true,
  })
  .partial();

// Password change schema
export const passwordChangeSchema = z
  .object({
    current_password: z
      .string()
      .min(6, "Current password must be at least 6 characters"),
    new_password: z
      .string()
      .min(6, "New password must be at least 6 characters"),
    confirm_new_password: z.string().nonempty("Please confirm your password"),
  })
  .refine((data) => data.new_password === data.confirm_new_password, {
    message: "Passwords don't match",
    path: ["confirm_new_password"],
  });

// --- User validation schemas --- //

export const idValidation = z.object({
  id: z.coerce
    .number()
    .int("Id must be integer")
    .positive("Id must be positive"),
});

export const usernameValidation = z.object({
  username: z.string().min(3, "Username must be at least 3 characters"),
});

export const emailValidation = z.object({
  email: z.email("Must be a valid email"),
});
