import { cn } from "@/lib/utils";
import type { PublicUser } from "@mylinkspace/shared";
import Body from "@/components/UserPage/Body";
import Footer from "@/components/UserPage/Footer";

type UserPageProps = {
  user: PublicUser;

  className?: string;
};

/**
 * User profile page.
 * Displays user info and their links.
 */
function UserPage({ user, className }: UserPageProps) {
  return (
    <div className={cn("bg-background min-h-screen flex flex-col", className)}>
      <div className="flex-1">
        <Body user={user} />
      </div>
      <Footer />
    </div>
  );
}

export default UserPage;
