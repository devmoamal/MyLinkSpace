import PageContainer from "@/components/common/PageContainer";
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
    <PageContainer className={className}>
      <div className="flex flex-col min-h-screen">
        <div className="flex-1">
          <Body user={user} />
        </div>
        <Footer />
      </div>
    </PageContainer>
  );
}

export default UserPage;
