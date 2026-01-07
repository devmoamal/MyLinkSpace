import useAuthStore from "@/stores/AuthStore";

/**
 * Hook to access auth state and actions.
 * Provides user, token, and auth methods.
 */
function useAuth() {
  const user = useAuthStore((state) => state.user);
  const token = useAuthStore((state) => state.token);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const setAuth = useAuthStore((state) => state.setAuth);
  const clearAuth = useAuthStore((state) => state.clearAuth);

  return { user, token, isAuthenticated, setAuth, clearAuth };
}

export default useAuth;
