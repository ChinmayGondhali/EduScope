import { PlacementInfo } from "@/types";
import { TrendingUp, Award, Briefcase } from "lucide-react";

interface DetailPlacementsProps {
  placement: PlacementInfo;
}

export function DetailPlacements({ placement }: DetailPlacementsProps) {
  return (
    <section className="py-12 border-t">
      <h2 className="text-2xl font-bold mb-8">Placement Statistics</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-card border rounded-2xl p-8 text-center space-y-3">
          <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <TrendingUp className="h-6 w-6" />
          </div>
          <div className="text-3xl font-bold">{placement.rate}%</div>
          <div className="text-muted-foreground font-medium">Placement Rate</div>
        </div>
        
        <div className="bg-card border rounded-2xl p-8 text-center space-y-3">
          <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <Briefcase className="h-6 w-6" />
          </div>
          <div className="text-3xl font-bold">{placement.average_package}</div>
          <div className="text-muted-foreground font-medium">Average Package</div>
        </div>

        <div className="bg-card border rounded-2xl p-8 text-center space-y-3">
          <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <Award className="h-6 w-6" />
          </div>
          <div className="text-3xl font-bold">{placement.highest_package}</div>
          <div className="text-muted-foreground font-medium">Highest Package</div>
        </div>
      </div>
    </section>
  );
}
