import { X, Star, MapPin } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { College } from "@/types";

interface CompareCardProps {
  college: College;
  onRemove: (id: string) => void;
}

export function CompareCard({ college, onRemove }: CompareCardProps) {
  return (
    <div className="bg-card border rounded-2xl p-4 relative group shadow-sm hover:shadow-md transition-shadow">
      <button
        onClick={() => onRemove(college.id)}
        className="absolute -top-2 -right-2 w-7 h-7 bg-destructive text-destructive-foreground rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform z-10"
      >
        <X className="h-4 w-4" />
      </button>
      
      <div className="flex flex-col items-center text-center gap-3">
        <div className="w-16 h-16 rounded-xl overflow-hidden border">
          <img src={college.image_url} alt={college.name} className="w-full h-full object-cover" />
        </div>
        <div>
          <h3 className="font-bold text-sm line-clamp-2 h-10 mb-1">{college.name}</h3>
          <div className="flex items-center justify-center gap-1 text-[10px] text-muted-foreground">
            <MapPin className="h-3 w-3" />
            {college.location}
          </div>
        </div>
        <div className="flex items-center gap-1 bg-yellow-500/10 text-yellow-600 px-2 py-0.5 rounded text-[10px] font-bold">
          <Star className="h-3 w-3 fill-current" />
          {college.rating}
        </div>
      </div>
    </div>
  );
}
