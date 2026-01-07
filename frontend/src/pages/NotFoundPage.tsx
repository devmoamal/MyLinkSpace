import { cn } from "@/lib/utils";

type NotFoundPageProps = {
  className?: string;
};

function NotFoundPage({ className }: NotFoundPageProps) {
  return <div className={cn("", className)}>404 Not Found</div>;
}

export default NotFoundPage;
