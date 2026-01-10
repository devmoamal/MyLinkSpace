import { cn } from "@/lib/utils";

type PageContainerProps = {
  children: React.ReactNode;
  className?: string;
  centered?: boolean;
};

/**
 * Reusable page container with consistent layout.
 * Provides full-height background and optional centering.
 */
function PageContainer({
  children,
  className,
  centered = false,
}: PageContainerProps) {
  return (
    <div
      className={cn(
        "min-h-screen bg-background px-4",
        centered && "flex items-center justify-center",
        className
      )}
    >
      {children}
    </div>
  );
}

export default PageContainer;
