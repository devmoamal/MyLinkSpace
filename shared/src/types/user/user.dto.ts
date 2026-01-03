import { z } from "zod";
import {
  createUserSchema,
  emailValidation,
  idValidation,
  passwordChangeSchema,
  usernameValidation,
} from "./user.schema";

// --- User DTOs param --- //
export type UserIdDTO = z.infer<typeof idValidation>;
export type UserUsernameDTO = z.infer<typeof usernameValidation>;

// --- User DTOs body --- //

export type CreateUserDTO = z.infer<typeof createUserSchema>;
export type UpdateUserDTO = z.infer<typeof createUserSchema>;
export type PasswordChangeDTO = z.infer<typeof passwordChangeSchema>;
export type EmailExistanceDTO = z.infer<typeof emailValidation>;
