import { Bookmark, Star, GraduationCap, LayoutDashboard } from "lucide-react";

interface DashboardStatsProps {
  savedCount: number;
  reviewsCount: number;
  comparisonsCount: number;
  applicationsCount: number;
}

export function DashboardStats({ 
  savedCount, 
  reviewsCount, 
  comparisonsCount, 
  applicationsCount 
}: DashboardStatsProps) {
  const stats = [
    {
      label: "Saved Colleges",
      value: savedCount,
      icon: Bookmark,
      color: "text-blue-600",
      bg: "bg-blue-100",
    },
    {
      label: "My Reviews",
      value: reviewsCount,
      icon: Star,
      color: "text-yellow-600",
      bg: "bg-yellow-100",
    },
    {
      label: "Comparisons",
      value: comparisonsCount,
      icon: LayoutDashboard,
      color: "text-purple-600",
      bg: "bg-purple-100",
    },
    {
      label: "Applications",
      value: applicationsCount,
      icon: GraduationCap,
      color: "text-orange-600",
      bg: "bg-orange-100",
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 animate-slide-up">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <div key={stat.label} className="bg-card border rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className={`w-12 h-12 ${stat.bg} ${stat.color} rounded-xl flex items-center justify-center mb-4`}>
              <Icon className="h-6 w-6" />
            </div>
            <div className="text-2xl font-bold">{stat.value}</div>
            <div className="text-sm text-muted-foreground font-medium">{stat.label}</div>
          </div>
        );
      })}
    </div>
  );
}
