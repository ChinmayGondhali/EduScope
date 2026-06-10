import { College } from "@/types";
import { cn } from "@/lib/utils";
import { Check, Trophy } from "lucide-react";

interface CompareTableProps {
  colleges: College[];
}

export function CompareTable({ colleges }: CompareTableProps) {
  if (colleges.length === 0) return null;

  const getBestValue = (field: keyof College | string) => {
    if (colleges.length < 2) return null;

    if (field === "rating") {
      const max = Math.max(...colleges.map((c) => c.rating));
      return colleges.map((c) => c.rating === max);
    }
    if (field === "fees") {
      const min = Math.min(...colleges.map((c) => c.fees));
      return colleges.map((c) => c.fees === min);
    }
    if (field === "placement") {
      const max = Math.max(...colleges.map((c) => c.placement_rate));
      return colleges.map((c) => c.placement_rate === max);
    }
    return null;
  };

  const bestRatings = getBestValue("rating");
  const bestFees = getBestValue("fees");
  const bestPlacements = getBestValue("placement");

  const rows = [
    { label: "Location", values: colleges.map((c) => c.location) },
    { 
      label: "Rating", 
      values: colleges.map((c) => c.rating), 
      isBest: bestRatings,
      format: (val: number) => (
        <div className="flex items-center gap-1">
          <span className="font-bold">{val}</span>
          <span className="text-yellow-500">★</span>
        </div>
      )
    },
    { 
      label: "Annual Fees", 
      values: colleges.map((c) => c.fees), 
      isBest: bestFees,
      format: (val: number) => (
        <span className="font-bold text-primary">₹{val >= 100000 ? `${(val/100000).toFixed(1)}L` : val.toLocaleString()}</span>
      )
    },
    { 
      label: "Placement Rate", 
      values: colleges.map((c) => c.placement_rate), 
      isBest: bestPlacements,
      format: (val: number) => (
        <div className="flex items-center gap-1">
          <span className="font-bold">{val}%</span>
        </div>
      )
    },
    { 
      label: "Avg Package", 
      values: colleges.map((c) => c.average_package || "N/A") 
    },
    { 
      label: "Highest Package", 
      values: colleges.map((c) => c.highest_package || "N/A") 
    },
  ];

  return (
    <div className="overflow-x-auto rounded-2xl border shadow-sm bg-card animate-fade-in">
      <table className="w-full text-left border-collapse min-w-[600px]">
        <thead>
          <tr className="bg-muted/30">
            <th className="p-6 font-bold text-sm w-1/4 border-r">Parameters</th>
            {colleges.map((college) => (
              <th key={college.id} className="p-6 font-bold text-sm text-center">
                {college.name}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr key={rowIndex} className="border-t hover:bg-muted/10 transition-colors">
              <td className="p-6 font-semibold text-sm text-muted-foreground border-r bg-muted/5">
                {row.label}
              </td>
              {row.values.map((value, colIndex) => (
                <td 
                  key={colIndex} 
                  className={cn(
                    "p-6 text-center text-sm font-medium",
                    row.isBest?.[colIndex] && "bg-primary/5 text-primary"
                  )}
                >
                  <div className="flex flex-col items-center gap-2">
                    {row.format ? (row.format as any)(value) : value}
                    {row.isBest?.[colIndex] && (
                      <div className="flex items-center gap-1 text-[10px] font-black uppercase tracking-widest text-primary">
                        <Trophy className="h-3 w-3" />
                        Best in Class
                      </div>
                    )}
                  </div>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
