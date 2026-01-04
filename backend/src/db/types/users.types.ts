import { users } from "../schema";
import type { LinkSelectModel } from "./links.types";
import type { InferInsertModel, InferSelectModel } from "drizzle-orm";

export type UserSelectModel = InferSelectModel<typeof users>;
export type UserInsertModel = InferInsertModel<typeof users>;
export type UserUpdateModel = Partial<InferInsertModel<typeof users>>;

export type UserWithLinks = UserSelectModel & { links: LinkSelectModel[] };
