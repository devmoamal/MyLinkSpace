import { UserRepository } from "@/repositories/user.repository";
import { hashPassword } from "@/utils/crypto";
import {
  AuthorizationError,
  NotFoundError,
  ServerError,
  UniqueError,
} from "@/utils/errors";
import { logger } from "@/utils/logger";
import {
  baseUserSchema,
  publicUserSchema,
  type LoginDTO,
  type PublicUser,
  type RegisterDTO,
  type UpdateUserDTO,
  type UserEmail,
  type UserId,
  type UserUsername,
} from "@mylinkspace/shared";

export class UserService {
  static async getCurrentUserById(id: UserId) {
    const user = await UserRepository.findById(id);

    // Check if user not exists throw not found error
    if (!user) return undefined;

    return baseUserSchema.parse(user);
  }

  static async getUserById(id: UserId): Promise<PublicUser | undefined> {
    const user = await UserRepository.findById(id);

    // Check if user not exists throw not found error
    if (!user) return undefined;

    return publicUserSchema.parse(user);
  }

  static async getUserByUsername(
    username: UserUsername
  ): Promise<PublicUser | undefined> {
    const user = await UserRepository.findByUsername(username);

    // Check if user not exists throw not found error
    if (!user) return undefined;

    // Parse user into PublicUser type
    return publicUserSchema.parse(user);
  }

  static async updateUser(id: UserId, data: UpdateUserDTO) {
    // Update data
    const updating = await UserRepository.update(id, data);

    // If user data not updated for any reason throw error
    if (!updating)
      throw new ServerError("Faild to update. Please try again later.");

    return baseUserSchema.parse(updating);
  }

  static async isEmailExist(email: UserEmail): Promise<boolean> {
    const existing = await UserRepository.getUserByEmail(email);
    return !!existing;
  }

  static async deleteUser(id: UserId) {
    const user = await UserRepository.findById(id);

    // Check if user not exists throw not found error
    if (!user) throw new NotFoundError("User not found");

    // Delete user
    const deleting = await UserRepository.delete(id);

    // If user not deleted for any reason throw error
    if (!deleting)
      throw new ServerError("Faild to delete user. Please try again later.");

    return !!deleting;
  }
}
