import { apiClient } from "@/lib/api";
import type { User } from "@mylinkspace/shared";

type LoginData = {
  email: string;
  password: string;
};

type RegisterData = {
  name: string;
  username: string;
  email: string;
  password: string;
};

type AuthResponse = {
  ok: boolean;
  data: {
    user: User;
    token: string;
  };
};

/**
 * Auth API service.
 * Handles login and registration.
 */
export const authApi = {
  /**
   * Login user
   */
  async login(data: LoginData): Promise<AuthResponse> {
    return apiClient.post<AuthResponse>("/auth/login", data);
  },

  /**
   * Register new user
   */
  async register(data: RegisterData): Promise<AuthResponse> {
    return apiClient.post<AuthResponse>("/auth/register", data);
  },
};
