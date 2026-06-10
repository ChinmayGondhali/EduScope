import { CheckCircle2 } from "lucide-react";

interface DetailOverviewProps {
  description: string;
  highlights: string[];
}

export function DetailOverview({ description, highlights }: DetailOverviewProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 py-12">
      <div className="lg:col-span-2 space-y-6">
        <h2 className="text-2xl font-bold">About the Institution</h2>
        <p className="text-muted-foreground text-lg leading-relaxed">
          {description}
        </p>
      </div>
      
      <div className="bg-muted/30 p-8 rounded-2xl border border-border">
        <h3 className="text-xl font-bold mb-6">Key Highlights</h3>
        <ul className="space-y-4">
          {highlights.map((highlight, index) => (
            <li key={index} className="flex gap-3 text-sm font-medium">
              <CheckCircle2 className="h-5 w-5 text-primary shrink-0" />
              <span>{highlight}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
