import { UserRepository } from "@/repositories/user.repository";
import { NotFoundError, UniqueError } from "@/utils/errors";
import { logger } from "@/utils/logger";
import type {
  CreateUserDTO,
  UpdateUserDTO,
  UserId,
  UserUsername,
} from "@mylinkspace/shared";

export class UserService {
  static async getUserById(id: UserId) {
    const user = await UserRepository.findById(id);

    // Check if user not exists throw not found error
    if (!user) throw new NotFoundError("User not found");
    return user;
  }

  static async getUserByUsername(username: UserUsername) {
    const user = await UserRepository.findByUsername(username);

    // Check if user not exists throw not found error
    if (!user) throw new NotFoundError("User not found");
    return user;
  }

  static async createUser(data: CreateUserDTO) {
    // Check if email exists
    const emailExisting = await this.isEmailExist(data.email);

    logger.error("Email existing:", emailExisting, data.email);

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
    return UserRepository.create(data);
  }

  static async updateUser(id: UserId, data: UpdateUserDTO) {
    return UserRepository.update(id, data);
  }

  static async isEmailExist(email: string): Promise<boolean> {
    const existing = await UserRepository.getUserByEmail(email);
    return !!existing;
  }

  static async deleteUser(id: UserId) {
    const user = await UserRepository.findById(id);
    // Check if user not exists throw not found error
    if (!user) throw new NotFoundError("User not found");
    return UserRepository.delete(id);
  }
}
