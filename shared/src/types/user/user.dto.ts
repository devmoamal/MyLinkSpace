import { z } from "zod";
import {
  registerSchema,
  updateUserSchema,
  passwordChangeSchema,
  idValidation,
  usernameValidation,
  emailValidation,
  loginSchema,
} from "./user.schema";

// --- Params / query DTOs --- //

export type UserIdDTO = z.infer<typeof idValidation>;
export type UserUsernameDTO = z.infer<typeof usernameValidation>;
export type EmailExistenceQuery = z.infer<typeof emailValidation>;

// --- Body DTOs --- //
export type LoginDTO = z.infer<typeof loginSchema>;
export type RegisterDTO = z.infer<typeof registerSchema>;

export type UpdateUserDTO = z.infer<typeof updateUserSchema>;
export type PasswordChangeDTO = z.infer<typeof passwordChangeSchema>;
