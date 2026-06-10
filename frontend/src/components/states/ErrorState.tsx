import { AlertCircle, RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";

interface ErrorStateProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
  className?: string;
}

export function ErrorState({
  title = "Something went wrong",
  message = "We encountered an error while loading this content.",
  onRetry,
  className
}: ErrorStateProps) {
  return (
    <div className={cn(
      "flex flex-col items-center justify-center p-8 min-h-[200px] text-center border-2 border-dashed border-destructive/20 rounded-lg bg-destructive/5",
      className
    )}>
      <AlertCircle className="h-12 w-12 text-destructive mb-4" />
      <h3 className="text-lg font-semibold text-destructive mb-2">{title}</h3>
      <p className="text-muted-foreground mb-6 max-w-md">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="flex items-center gap-2 rounded-md bg-destructive px-4 py-2 text-sm font-medium text-destructive-foreground hover:bg-destructive/90 transition-colors"
        >
          <RotateCcw className="h-4 w-4" />
          Try Again
        </button>
      )}
    </div>
  );
}
