import type { User } from "@mylinkspace/shared";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type AuthStoreState = {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  setAuth: (user: User, token: string) => void;
  clearAuth: () => void;
};

/**
 * Auth store with localStorage persistence.
 * Stores user data and JWT token.
 */
const useAuthStore = create<AuthStoreState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      setAuth: (user, token) => set({ user, token, isAuthenticated: true }),
      clearAuth: () => set({ user: null, token: null, isAuthenticated: false }),
    }),
    {
      name: "auth",
    }
  )
);

export default useAuthStore;
