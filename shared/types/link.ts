import type { BaseEntity } from "../base";
import type { LinkIconType, LinkType } from "../types";

export type Link = {
  user_id: number;
  title: string;
  url: string;
  type: LinkType;
  icon: LinkIconType;
  position: number;
  is_active: boolean;
} & BaseEntity;

export type CreateLinkDTO = Omit<Link, keyof BaseEntity>;
export type UpdateLinkDTO = Partial<CreateLinkDTO>;
export type DeleteLinkDTO = Pick<Link, "id">;

export type PublicLink = Link;
