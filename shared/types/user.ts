import type { BaseEntity } from "../base";
import type { Link } from ".";

export type User = {
  name: string;
  username: string;
  email: string;
  password: string;
  is_verified?: boolean;
  avatar_image_url?: string;
} & BaseEntity;

export type CreateUserDTO = Omit<User, keyof BaseEntity> & {
  confirm_password: string;
};
export type UpdateUserDTO = Partial<Omit<User, keyof BaseEntity | "password">>;
export type UpdateUserPasswordDTO = {
  current_password: string;
  new_password: string;
  confirm_new_password: string;
};
export type DeleteUserDTO = Pick<User, "id">;

export type PublicUser = Omit<User, "password"> & {
  links: Link[];
};
