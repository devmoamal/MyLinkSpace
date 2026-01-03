import z from "zod";
import { LINK_ICONS, LINK_TYPES } from "../../constants";
import { linkSchema } from "./link.shcema";

// --- Link Types ---  //
export type Link = z.infer<typeof linkSchema>;
export type LinkType = (typeof LINK_TYPES)[number];
export type LinkIconType = (typeof LINK_ICONS)[number];
