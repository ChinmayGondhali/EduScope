import { BookOpen, School, Users, Award } from "lucide-react";

const STATS = [
  { label: "Colleges", value: "10,000+", icon: School },
  { label: "Courses", value: "2,500+", icon: BookOpen },
  { label: "Students", value: "500k+", icon: Users },
  { label: "Placements", value: "95%", icon: Award },
];

export function Stats() {
  return (
    <section className="py-12 bg-primary text-primary-foreground">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {STATS.map((stat) => {
            const Icon = stat.icon;
            return (
              <div key={stat.label} className="flex flex-col items-center text-center">
                <div className="p-3 bg-white/10 rounded-full mb-4">
                  <Icon className="h-6 w-6" />
                </div>
                <div className="text-3xl md:text-4xl font-bold mb-1">{stat.value}</div>
                <div className="text-primary-foreground/80 font-medium">{stat.label}</div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
