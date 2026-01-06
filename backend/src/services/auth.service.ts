import { UserRepository } from "@/repositories/user.repository";
import { hashPassword, verifyPassword } from "@/utils/crypto";
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
    // Fetch user by email
    const user = await UserRepository.getUserByEmail(data.email);

    // If user not found throw error
    if (!user) throw new AuthorizationError("Invalid email or password");

    // Verify password using crypto util
    const isPasswordValid = await verifyPassword(data.password, user.password);

    // If password not match throw error
    if (!isPasswordValid)
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

    // Hash password using crypto util
    let hashedPassword;
    try {
      hashedPassword = await hashPassword(data.password);
    } catch (error) {
      logger.error("Password hashing failed", { error, email: data.email });
      throw new ServerError("An internal error occurred during registration");
    }

    // User Creation
    const newUser = await UserRepository.create({
      ...data,
      password: hashedPassword.toString(),
    });

    // If user not created for any reason throw error
    if (!newUser)
      throw new ServerError("Faild to create user. Please try again later.");

    // Parse user to
    return baseUserSchema.parse(newUser);
  }
}
