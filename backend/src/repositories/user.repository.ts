import { db } from "@/db";
import { users } from "@/db/schema/users.schema";
import type {
  UserInsertModel,
  UserUpdateModel,
  UserWithLinks,
} from "@/db/types";
import { logger } from "@/utils/logger";
import type { UserEmail, UserId, UserUsername } from "@mylinkspace/shared";
import { eq } from "drizzle-orm";

export class UserRepository {
  // Find user by ID
  static async findById(id: UserId): Promise<UserWithLinks | undefined> {
    return db.query.users.findFirst({
      where: eq(users.id, id),
      // Include related links
      with: {
        links: {},
      },
    });
  }

  // Find user by username
  static async findByUsername(
    username: UserUsername
  ): Promise<UserWithLinks | undefined> {
    return db.query.users.findFirst({
      where: eq(users.username, username),
      // Include related links
      with: {
        links: {},
      },
    });
  }

  // get user by email
  static async getUserByEmail(
    email: UserEmail
  ): Promise<UserWithLinks | undefined> {
    return db.query.users.findFirst({
      where: eq(users.email, email),
      // Include related links
      with: {
        links: {},
      },
    });
  }

  // Create a new user
  static async create(data: UserInsertModel) {
    const [user] = await db.insert(users).values(data).returning();
    return user;
  }

  // Update an existing user by ID and data need to update
  static async update(id: UserId, data: UserUpdateModel) {
    const [user] = await db
      .update(users)
      .set(data)
      .where(eq(users.id, id))
      .returning();
    return user;
  }

  // Delete a user by ID
  static async delete(id: UserId) {
    const [user] = await db.delete(users).where(eq(users.id, id)).returning();
    return user;
  }
}
