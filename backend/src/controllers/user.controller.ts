import { UserService } from "@/services/user.service";
import type { JwtPayload } from "@/types";
import { NotFoundError } from "@/utils/errors";
import { Response } from "@/utils/response";
import type {
  UpdateUserDTO,
  UserIdDTO,
  UserUsernameDTO,
  EmailExistenceQuery,
} from "@mylinkspace/shared";
import type { Context } from "hono";

export class UserController {
  static async getCurrentUser(c: Context) {
    // Extract user ID from auth middleware jwt
    const { id } = c.get("user") as JwtPayload;

    // Fetch user using the service
    const user = await UserService.getCurrentUserById(id);

    // If user not found throw not found error
    if (!user) throw new NotFoundError("User not found");

    // return success response
    return Response.success(c, { data: user });
  }

  static async getUserById(c: Context) {
    // Extract user ID from hono context
    const { id } = c.get("params") as UserIdDTO;

    // Fetch user using the service
    const user = await UserService.getUserById(id);

    // If user not found throw not found error
    if (!user) throw new NotFoundError("User not found");

    // return success response
    return Response.success(c, { data: user });
  }

  static async getUserByUsername(c: Context) {
    // Extract user ID from hono context
    const { username } = c.get("params") as UserUsernameDTO;

    // Fetch user using the service
    const user = await UserService.getUserByUsername(username);

    // If user not found throw not found error
    if (!user) throw new NotFoundError("User not found");

    // Return success response
    return Response.success(c, { data: { user } });
  }

  static async checkEmailExistance(c: Context) {
    // Extract email from hono context
    const { email } = c.get("body") as EmailExistenceQuery;
    // Check email existence using the service
    const exists = await UserService.isEmailExist(email);

    // Return response
    return Response.success(c, { data: { exists } });
  }

  static async updateCurrentUser(c: Context) {
    // Extract user ID from auth middleware jwt
    const { id } = c.get("user") as JwtPayload;

    // Extract update data from hono context
    const { ...data } = c.get("body") as UpdateUserDTO;

    // Update user using the service
    const user = await UserService.updateUser(id, data);

    // Return success response
    return Response.success(c, { data: { user } });
  }

  static async deleteCurrentUser(c: Context) {
    // Extract user ID from auth middleware jwt
    const { id } = c.get("user") as JwtPayload;

    // Delete user using the service
    await UserService.deleteUser(id);

    // Return success response
    return Response.success(c, {});
  }
}
