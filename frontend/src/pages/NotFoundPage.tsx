import PageContainer from "@/components/common/PageContainer";
import { Link } from "@tanstack/react-router";
import Button from "@/components/common/Button";
import { Home, Search } from "lucide-react";

type NotFoundPageProps = {
  className?: string;
};

/**
 * 404 Not Found page.
 * Shows when user navigates to non-existent route.
 */
function NotFoundPage({ className }: NotFoundPageProps) {
  return (
    <PageContainer centered className={className}>
      <div className="max-w-md mx-auto text-center space-y-8">
        {/* 404 Icon */}
        <div className="relative">
          <div className="text-9xl font-bold text-primary/10">404</div>
          <div className="absolute inset-0 flex items-center justify-center">
            <Search size={80} className="text-muted-foreground" />
          </div>
        </div>

        {/* Text */}
        <div className="space-y-3">
          <h1 className="text-4xl font-bold text-text">Page Not Found</h1>
          <p className="text-lg text-muted-foreground">
            The page you're looking for doesn't exist or has been moved.
          </p>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link to="/">
            <Button className="flex items-center gap-2">
              <Home size={18} />
              Go Home
            </Button>
          </Link>
        </div>
      </div>
    </PageContainer>
  );
}

export default NotFoundPage;
