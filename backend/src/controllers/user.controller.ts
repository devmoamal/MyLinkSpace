import { UserService } from "@/services/user.service";
import { Response } from "@/utils/response";
import type {
  UpdateUserDTO,
  EmailExistanceDTO,
  UserIdDTO,
  UserUsernameDTO,
  CreateUserDTO,
} from "@mylinkspace/shared";
import type { Context } from "hono";

export class UserController {
  static async createUser(c: Context) {
    // Extract user data from hono context
    const { ...data } = c.get("body") as CreateUserDTO;

    // Create user using the service
    const user = await UserService.createUser(data);

    // Return success response
    return Response.success(c, { data: user });
  }

  static async getUserById(c: Context) {
    // Extract user ID from hono context
    const { id } = c.get("params") as UserIdDTO;

    // Fetch user using the service
    const user = await UserService.getUserById(id);

    // return success response
    return Response.success(c, { data: user });
  }

  static async getUserByUsername(c: Context) {
    // Extract user ID from hono context
    const { username } = c.get("params") as UserUsernameDTO;

    // Fetch user using the service
    const user = await UserService.getUserByUsername(username);

    // Return success response
    return Response.success(c, { data: user });
  }

  static async updateUser(c: Context) {
    // Extract user ID from hono context
    const { id } = c.get("params") as UserIdDTO;

    // Extract update data from hono context
    const { ...data } = c.get("body") as UpdateUserDTO;

    // Update user using the service
    const user = await UserService.updateUser(id, data);

    // Return success response
    return Response.success(c, { data: user });
  }

  static async checkEmailExistance(c: Context) {
    // Extract email from hono context
    const { email } = c.get("body") as EmailExistanceDTO;

    // Check email existence using the service
    const exists = await UserService.isEmailExist(email);

    // Return response
    return Response.success(c, { data: { exists } });
  }

  static async deleteUser(c: Context) {
    // Extract user ID from hono context
    const { id } = c.get("params") as UserIdDTO;

    // Delete user using the service
    const deleted = await UserService.deleteUser(id);

    // Return success response
    return Response.success(c, { data: null });
  }
}
