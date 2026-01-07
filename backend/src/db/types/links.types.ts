import { links } from "../schema";
import type { InferInsertModel, InferSelectModel } from "drizzle-orm";

export type LinkSelectModel = InferSelectModel<typeof links>;
export type LinkInsertModel = InferInsertModel<typeof links>;
export type LinkUpdateModel = Partial<LinkInsertModel>;
