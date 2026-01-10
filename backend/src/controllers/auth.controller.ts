import type { LoginDTO, RegisterDTO } from "@mylinkspace/shared";
import type { Context } from "hono";
import { Response } from "@/utils/response";
import { AuthService } from "@/services/auth.service";
import { signToken } from "@/utils/jwt";

export class AuthController {
  static async login(c: Context) {
    // Extract user data from hono context
    const { ...data } = c.get("body") as LoginDTO;

    // Login using the service
    const user = await AuthService.login(data);

    const token = signToken({ id: user.id, username: user.username });

    // Return success response
    return Response.success(c, { data: { token, user } });
  }

  static async register(c: Context) {
    // Extract user data from hono context
    const { ...data } = c.get("body") as RegisterDTO;

    // Create user using the service
    const user = await AuthService.register(data);

    const token = signToken({ id: user.id, username: user.username });

    // Return success response
    return Response.success(c, { data: { token, user } });
  }
}
