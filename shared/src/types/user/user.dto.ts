import { z } from "zod";
import {
  createUserSchema,
  updateUserSchema,
  passwordChangeSchema,
  idValidation,
  usernameValidation,
  emailValidation,
} from "./user.schema";

// --- Params / query DTOs --- //

export type UserIdDTO = z.infer<typeof idValidation>;
export type UserUsernameDTO = z.infer<typeof usernameValidation>;
export type EmailExistenceQuery = z.infer<typeof emailValidation>;

// --- Body DTOs --- //

export type CreateUserDTO = z.infer<typeof createUserSchema>;
export type UpdateUserDTO = z.infer<typeof updateUserSchema>;
export type PasswordChangeDTO = z.infer<typeof passwordChangeSchema>;
