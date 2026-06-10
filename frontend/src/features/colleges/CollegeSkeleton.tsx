import { Skeleton } from "@/components/ui/Skeleton";

export function CollegeSkeleton() {
  return (
    <div className="bg-card border rounded-2xl overflow-hidden shadow-sm animate-pulse">
      <Skeleton className="aspect-[16/10] w-full" />
      <div className="p-6 space-y-6">
        <div className="space-y-3">
          <Skeleton className="h-3 w-24" />
          <Skeleton className="h-6 w-full" />
          <Skeleton className="h-6 w-2/3" />
        </div>
        
        <div className="grid grid-cols-2 gap-6 bg-muted/20 p-4 rounded-xl">
          <div className="space-y-2">
            <Skeleton className="h-2 w-12" />
            <Skeleton className="h-4 w-16" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-2 w-12" />
            <Skeleton className="h-4 w-16" />
          </div>
        </div>
        
        <div className="flex gap-2">
          <Skeleton className="h-5 w-16" />
          <Skeleton className="h-5 w-16" />
          <Skeleton className="h-5 w-16" />
        </div>
        
        <div className="flex gap-3 pt-2">
          <Skeleton className="h-11 flex-1 rounded-lg" />
          <Skeleton className="h-11 flex-1 rounded-lg" />
        </div>
      </div>
    </div>
  );
}
