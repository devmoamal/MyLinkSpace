import { db } from "@/db";
import { links } from "@/db/schema";
import type {
  LinkInsertModel,
  LinkSelectModel,
  LinkUpdateModel,
} from "@/db/types";
import type { LinkId, UserId } from "@mylinkspace/shared";
import { eq } from "drizzle-orm";

export class LinkRepository {
  // Create a new link
  static async create(data: LinkInsertModel) {
    const [link] = await db.insert(links).values(data).returning();
    return link;
  }

  // Find link by ID
  static async getLinkById(id: LinkId): Promise<LinkSelectModel | undefined> {
    return db.select().from(links).where(eq(links.id, id)).get();
  }

  // Find links by user ID
  static async getLinksByUserId(userId: UserId): Promise<LinkSelectModel[]> {
    const _links = await db
      .select()
      .from(links)
      .where(eq(links.user_id, userId));
    return _links;
  }

  // Update an existing link by ID and data need to update
  static async update(id: LinkId, data: LinkUpdateModel) {
    const [link] = await db
      .update(links)
      .set(data)
      .where(eq(links.id, id))
      .returning();
    return link;
  }

  // Delete a link by ID
  static async delete(id: LinkId) {
    const [link] = await db.delete(links).where(eq(links.id, id)).returning();
    return link;
  }
}
