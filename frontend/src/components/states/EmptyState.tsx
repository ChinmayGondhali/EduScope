import { SearchX } from "lucide-react";
import { cn } from "@/lib/utils";

interface EmptyStateProps {
  title?: string;
  message?: string;
  action?: React.ReactNode;
  className?: string;
}

export function EmptyState({
  title = "No results found",
  message = "We couldn't find what you're looking for. Try adjusting your filters.",
  action,
  className
}: EmptyStateProps) {
  return (
    <div className={cn(
      "flex flex-col items-center justify-center p-12 min-h-[300px] text-center border-2 border-dashed rounded-lg bg-muted/20",
      className
    )}>
      <SearchX className="h-16 w-16 text-muted-foreground mb-4" />
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground mb-8 max-w-sm">{message}</p>
      {action && <div>{action}</div>}
    </div>
  );
}
