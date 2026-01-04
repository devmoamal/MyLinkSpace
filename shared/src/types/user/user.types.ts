import z from "zod";
import { baseUserSchema, publicUserSchema } from "./user.schema";
// --- User types --- //

export type User = z.infer<typeof baseUserSchema>;
export type PublicUser = z.infer<typeof publicUserSchema>;

// --- User field types --- //

export type UserId = PublicUser["id"];
export type UserUsername = User["username"];
export type UserEmail = User["email"];
