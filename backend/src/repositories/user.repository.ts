import { db } from "@/db";
import { users } from "@/db/schema/users.schema";
import type {
  CreateUserDTO,
  PublicUser,
  UpdateUserDTO,
  UserEmail,
  UserId,
  UserUsername,
} from "@mylinkspace/shared";
import { eq } from "drizzle-orm";

export class UserRepository {
  // Find user by ID
  static async findById(id: UserId) {
    return db.query.users.findFirst({
      where: eq(users.id, id),
      columns: {
        password: false,
      },
      // Include related links
      with: {
        links: {},
      },
    });
  }

  // Find user by username
  static async findByUsername(username: UserUsername) {
    return db.query.users.findFirst({
      where: eq(users.username, username),
      columns: {
        password: false,
      },
      // Include related links
      with: {
        links: {},
      },
    });
  }

  // get user by email
  static async getUserByEmail(email: UserEmail) {
    return db.query.users.findFirst({
      where: eq(users.email, email),
      columns: {
        password: false,
      },
      // Include related links
      with: {
        links: {},
      },
    });
  }

  // Create a new user
  static async create(data: CreateUserDTO) {
    const [user] = await db.insert(users).values(data).returning();
    return user;
  }

  // Update an existing user
  static async update(id: UserId, data: UpdateUserDTO) {
    const [user] = await db
      .update(users)
      .set(data)
      .where(eq(users.id, id))
      .returning();
    return user;
  }

  // Delete a user
  static async delete(id: UserId) {
    return db.delete(users).where(eq(users.id, id));
  }
}
