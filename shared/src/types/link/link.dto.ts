import { z } from "zod";
import {
  createLinkSchema,
  linkIdValidation,
  updateLinkSchema,
} from "./link.shcema";

// --- Params / query DTOs --- //
export type LinkIdDTO = z.infer<typeof linkIdValidation>;

// --- Body DTOs --- //
export type CreateLinkDTO = z.infer<typeof createLinkSchema>;
export type UpdateLinkDTO = z.infer<typeof updateLinkSchema>;
