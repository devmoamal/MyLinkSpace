import { apiClient } from "@/lib/api";
import type { PublicUser } from "@mylinkspace/shared";

type UserResponse = {
  success: boolean;
  data: {
    user: PublicUser;
  };
};

/**
 * User API service.
 * Handles fetching user data.
 */
export const userApi = {
  /**
   * Get user by username
   */
  async getUserByUsername(username: string): Promise<UserResponse> {
    // Remove @ if present
    const cleanUsername = username.startsWith("@")
      ? username.slice(1)
      : username;
    return apiClient.get<UserResponse>(`/users/@${cleanUsername}`);
  },

  /**
   * Get current user (requires auth)
   */
  async getCurrentUser(token: string): Promise<UserResponse> {
    return apiClient.get<UserResponse>("/users/me", token);
  },
};
