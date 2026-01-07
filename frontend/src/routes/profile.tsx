import { createFileRoute, redirect } from "@tanstack/react-router";
import ProfilePage from "@/pages/ProfilePage";
import useAuthStore from "@/stores/AuthStore";

export const Route = createFileRoute("/profile")({
  component: RouteComponent,
  beforeLoad: () => {
    const { isAuthenticated } = useAuthStore.getState();
    if (!isAuthenticated) {
      throw redirect({ to: "/login" });
    }
  },
});

function RouteComponent() {
  return <ProfilePage />;
}
