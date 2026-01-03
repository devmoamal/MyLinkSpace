import { z } from "zod";
import { publicUserSchema, userSchema } from "./user.schema";

// --- User types --- //

export type User = z.infer<typeof userSchema>;
export type PublicUser = z.infer<typeof publicUserSchema>;

// --- User field types --- //

export type UserId = User["id"];
export type UserUsername = User["username"];
export type UserEmail = User["email"];
