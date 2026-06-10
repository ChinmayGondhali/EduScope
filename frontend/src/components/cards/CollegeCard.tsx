import Link from "next/link";
import { Star, MapPin, Bookmark, ArrowLeftRight, TrendingUp } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { College } from "@/types";
import { cn } from "@/lib/utils";

interface CollegeCardProps {
  college: College;
  isSaved?: boolean;
  isComparing?: boolean;
  onSave?: (id: string) => void;
  onCompare?: (id: string) => void;
  className?: string;
}

export function CollegeCard({ 
  college, 
  isSaved = false, 
  isComparing = false,
  onSave, 
  onCompare,
  className 
}: CollegeCardProps) {
  return (
    <div className={cn(
      "group bg-card border rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-500 flex flex-col h-full",
      className
    )}>
      <div className="relative aspect-[16/10] overflow-hidden">
        <img 
          src={college.image_url} 
          alt={college.name} 
          className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        <div className="absolute top-4 right-4 flex gap-2">
          <button 
            onClick={() => onSave?.(college.id)}
            aria-label={isSaved ? "Remove from saved" : "Save college"}
            className={cn(
              "p-2.5 rounded-full backdrop-blur-md shadow-lg transition-all active:scale-90",
              isSaved ? "bg-primary text-primary-foreground" : "bg-white/90 text-foreground hover:bg-white"
            )}
          >
            <Bookmark className={cn("h-4.5 w-4.5", isSaved && "fill-current")} />
          </button>
        </div>
        
        <div className="absolute bottom-4 left-4 flex gap-2 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
          <Badge variant="secondary" className="bg-white/90 backdrop-blur-md text-foreground border-none font-bold">
            <Star className="h-3.5 w-3.5 text-yellow-500 fill-yellow-500 mr-1.5" />
            {college.rating}
          </Badge>
        </div>
      </div>
      
      <div className="p-6 flex flex-col flex-1">
        <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-primary mb-3">
          <MapPin className="h-3.5 w-3.5" />
          {college.location}
        </div>
        <h3 className="font-extrabold text-xl mb-4 line-clamp-2 leading-tight h-14 group-hover:text-primary transition-colors">{college.name}</h3>
        
        <div className="grid grid-cols-2 gap-6 mb-6 mt-auto bg-muted/30 p-4 rounded-xl">
          <div className="flex flex-col gap-1">
            <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-bold">Annual Fees</span>
            <span className="text-base font-black">₹{college.fees >= 100000 ? `${(college.fees/100000).toFixed(1)}L` : college.fees.toLocaleString()}</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-bold">Placement</span>
            <div className="flex items-center gap-1.5">
              <TrendingUp className="h-4 w-4 text-green-500" />
              <span className="text-base font-black">{college.placement_rate}%</span>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-8 h-6 overflow-hidden">
          {college.courses?.slice(0, 2).map((course) => (
            <Badge key={course.id} variant="outline" className="text-[10px] px-2.5 py-0.5 border-primary/20 bg-primary/5 text-primary font-bold">
              {course.course_name}
            </Badge>
          ))}
        </div>

        <div className="flex gap-3 mt-auto">
          <Button 
            variant={isComparing ? "secondary" : "outline"} 
            size="sm"
            onClick={() => onCompare?.(college.id)}
            className={cn(
              "flex-1 text-xs gap-2 h-11 transition-all",
              isComparing 
                ? "bg-primary/10 border-primary/30 text-primary hover:bg-primary/20" 
                : "border-primary/20 hover:bg-primary/5"
            )}
          >
            <ArrowLeftRight className={cn("h-4 w-4", isComparing && "animate-pulse")} />
            {isComparing ? "Selected" : "Compare"}
          </Button>
          <Link href={`/college/${college.id}`} className="flex-1">
            <Button 
              size="sm"
              className="w-full text-xs font-bold h-11"
            >
              Details
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
