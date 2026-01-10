import { db } from "@/db";
import { users } from "@/db/schemas/users.schema";
import type {
  UserInsertModel,
  UserUpdateModel,
  UserWithLinks,
} from "@/db/types";
import type { UserEmail, UserId, UserUsername } from "@mylinkspace/shared";
import { eq } from "drizzle-orm";

export class UserRepository {
  // Create a new user
  static async create(data: UserInsertModel) {
    const [user] = await db.insert(users).values(data).returning();
    return user;
  }

  // Find user by ID
  static async findById(id: UserId): Promise<UserWithLinks | undefined> {
    return db.query.users.findFirst({
      where: eq(users.id, id),
      // Include related links
      with: {
        links: {
          orderBy: (links, { asc }) => [asc(links.position)],
        },
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
        links: {
          orderBy: (links, { asc }) => [asc(links.position)],
          where: (links, { eq }) => eq(links.is_active, true),
        },
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
