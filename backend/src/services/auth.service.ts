import { UserRepository } from "@/repositories/user.repository";
import { hashPassword } from "@/utils/crypto";
import { AuthorizationError, ServerError, UniqueError } from "@/utils/errors";
import {
  baseUserSchema,
  type LoginDTO,
  type RegisterDTO,
} from "@mylinkspace/shared";
import { UserService } from "./user.service";
import { logger } from "@/utils/logger";

export class AuthService {
  static async login(data: LoginDTO) {
    // Hash password using crypto
    const hashedPassword = await hashPassword(data.password);

    // Fetch user by email
    const user = await UserRepository.getUserByEmail(data.email);

    // If user not found or password not match throw error
    if (!user || user.password !== hashedPassword.toString())
      throw new AuthorizationError("Invalid email or password");

    return baseUserSchema.parse(user);
  }

  static async register(data: RegisterDTO) {
    // Check if email exists
    const emailExisting = await UserService.isEmailExist(data.email);

    // If exists, throw validation error
    if (emailExisting)
      throw new UniqueError("Email already in use", {
        email: ["Email is already registered"],
      });

    // Check if username exists
    const usernameExisting = await UserService.getUserByUsername(data.username);

    // If exists, throw validation error
    if (usernameExisting)
      throw new UniqueError("Username already in use", {
        username: ["Username is already registered"],
      });

    // Hash password using crypto
    try {
      data.password = (await hashPassword(data.password)).toString();
    } catch (e) {
      logger.error("Failed to hash password");
      throw new ServerError("Failed to while creating user");
    }

    // Create user
    const creating = await UserRepository.create(data);

    // If user not created for any reason throw error
    if (!creating)
      throw new ServerError("Faild to create user. Please try again later.");

    // Parse user to
    return baseUserSchema.parse(creating);
  }
}
