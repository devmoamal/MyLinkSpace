import UserPage from "@/pages/UserPage";
import { userApi } from "@/lib/user";
import { usernameParamValidation } from "@mylinkspace/shared";
import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/$username")({
  component: RouteComponent,
  loader: async ({ params }) => {
    try {
      // Validate username
      const validate = usernameParamValidation.parse(params);
      const { username } = validate;

      // Fetch user from API
      const response = await userApi.getUserByUsername(username);

      return { user: response.data.user };
    } catch {
      // Redirect to not found if user doesn't exist
      throw redirect({
        to: "/not-found",
        replace: true,
      });
    }
  },
});

function RouteComponent() {
  const { user } = Route.useLoaderData();
  return <UserPage user={user} />;
}
