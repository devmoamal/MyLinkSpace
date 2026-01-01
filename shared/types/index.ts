import { LINK_ICONS, LINK_TYPES } from "../constants";

export type LinkIconType = (typeof LINK_ICONS)[number];
export type LinkType = (typeof LINK_TYPES)[number];

export type * from "./link";
export type * from "./user";
