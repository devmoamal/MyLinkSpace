import { apiClient } from "@/lib/api";
import type { PublicUser, User } from "@mylinkspace/shared";

type UserResponse = {
  ok: boolean;
  data: {
    user: PublicUser;
  };
};

type CurrentUserResponse = {
  ok: boolean;
  data: {
    user: User;
  };
};

type UpdateUserData = {
  name?: string;
  username?: string;
  email?: string;
  bio?: string;
  is_live?: boolean;
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
  async getCurrentUser(token: string): Promise<CurrentUserResponse> {
    return apiClient.get<CurrentUserResponse>("/users/me", token);
  },

  /**
   * Update current user (requires auth)
   */
  async updateCurrentUser(
    data: UpdateUserData,
    token: string
  ): Promise<CurrentUserResponse> {
    return apiClient.put<CurrentUserResponse>("/users/me", data, token);
  },
};
