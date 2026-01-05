import { UserRepository } from "@/repositories/user.repository";
import { NotFoundError, ServerError, UniqueError } from "@/utils/errors";
import { logger } from "@/utils/logger";
import {
  baseUserSchema,
  publicUserSchema,
  type CreateUserDTO,
  type PublicUser,
  type UpdateUserDTO,
  type User,
  type UserEmail,
  type UserId,
  type UserUsername,
} from "@mylinkspace/shared";

export class UserService {
  static async getUserById(id: UserId): Promise<PublicUser> {
    const user = await UserRepository.findById(id);

    // Check if user not exists throw not found error
    if (!user) throw new NotFoundError("User not found");
    return publicUserSchema.parse(user);
  }

  static async getUserByUsername(username: UserUsername): Promise<PublicUser> {
    const user = await UserRepository.findByUsername(username);

    // Check if user not exists throw not found error
    if (!user) throw new NotFoundError("User not found");

    // Parse user into PublicUser type
    return publicUserSchema.parse(user);
  }

  static async createUser(data: CreateUserDTO) {
    // Check if email exists
    const emailExisting = await this.isEmailExist(data.email);

    // If exists, throw validation error
    if (emailExisting)
      throw new UniqueError("Email already in use", {
        email: ["Email is already registered"],
      });

    // Check if username exists
    const usernameExisting = await UserRepository.findByUsername(data.username);

    // If exists, throw validation error
    if (usernameExisting)
      throw new UniqueError("Username already in use", {
        username: ["Username is already registered"],
      });

    // Create user
    const creating = await UserRepository.create(data);

    // If user not created for any reason throw error
    if (!creating) {
      logger.error("error on creating ", creating);
      throw new ServerError("Faild to create user. Please try again later.");
    }
    // Parse user to
    return baseUserSchema.parse(creating);
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
