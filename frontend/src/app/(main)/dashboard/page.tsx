"use client";

import { useState, useEffect } from "react";
import { DashboardStats } from "@/features/dashboard/DashboardStats";
import { UserProfile } from "@/features/dashboard/UserProfile";
import { CollegeCard } from "@/components/cards/CollegeCard";
import { EmptyState } from "@/components/states/EmptyState";
import { LoadingState } from "@/components/states/LoadingState";
import { ErrorState } from "@/components/states/ErrorState";
import { College, DashboardData, ApiResponse } from "@/types";
import { Button } from "@/components/ui/Button";
import { LayoutDashboard, Bookmark, History, Settings, LogOut, ArrowRight } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useAuth } from "@/context/AuthContext";
import { useCompare } from "@/context/CompareContext";

import { SettingsTab } from "@/features/dashboard/SettingsTab";

export default function DashboardPage() {
  const { logout } = useAuth();
  const { selectedColleges } = useCompare();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [activeTab, setActiveTab] = useState<"overview" | "saved" | "settings">("overview");

  const fetchDashboardData = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/dashboard');
      const result: ApiResponse<DashboardData> = await response.json();

      if (result.success) {
        setDashboardData(result.data);
      } else {
        throw new Error(result.error || "Failed to load dashboard");
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-20">
        <LoadingState message="Preparing your personal dashboard..." />
      </div>
    );
  }

  if (error || !dashboardData) {
    return (
      <div className="container mx-auto px-4 py-20">
        <ErrorState message={error || "Could not load dashboard"} onRetry={fetchDashboardData} />
      </div>
    );
  }

  const navItems = [
    { id: "overview", label: "Overview", icon: LayoutDashboard },
    { id: "saved", label: "Saved Colleges", icon: Bookmark },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar Nav */}
        <aside className="lg:w-64 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id as any)}
                className={cn(
                  "w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all",
                  activeTab === item.id
                    ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                <Icon className="h-5 w-5" />
                {item.label}
              </button>
            );
          })}
          <div className="pt-4 mt-4 border-t space-y-2">
            <button 
              onClick={logout}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-destructive hover:bg-destructive/10 transition-all"
            >
              <LogOut className="h-5 w-5" />
              Sign Out
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 space-y-10 animate-fade-in">
          <UserProfile 
            user={dashboardData.user} 
            onEdit={() => setActiveTab("settings")}
          />
          
          {activeTab === "overview" && (
            <div className="space-y-12">
              <DashboardStats 
                savedCount={dashboardData.statistics.saved_count} 
                reviewsCount={dashboardData.statistics.reviews_count}
                comparisonsCount={selectedColleges.length}
                applicationsCount={dashboardData.statistics.applications_count || 0}
              />
              
              <div className="space-y-8">
                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <h3 className="text-2xl font-black tracking-tight">Saved Colleges</h3>
                    <p className="text-sm text-muted-foreground mt-1 font-medium">Quick access to your favorites</p>
                  </div>
                  <Button variant="ghost" onClick={() => setActiveTab("saved")} className="font-bold gap-2">
                    View All <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
                
                {dashboardData.saved_colleges.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {dashboardData.saved_colleges.map((college) => (
                      <CollegeCard key={college.id} college={college} />
                    ))}
                  </div>
                ) : (
                  <EmptyState 
                    title="No saved colleges yet" 
                    message="Browse colleges and save them to see them here." 
                  />
                )}
              </div>
            </div>
          )}

          {activeTab === "saved" && (
            <div className="space-y-8">
              <h3 className="text-2xl font-black tracking-tight border-b pb-4">All Saved Colleges</h3>
              {dashboardData.saved_colleges.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {dashboardData.saved_colleges.map((college) => (
                    <CollegeCard key={college.id} college={college} />
                  ))}
                </div>
              ) : (
                <EmptyState 
                  title="No saved colleges yet" 
                  message="Browse colleges and save them to see them here." 
                />
              )}
            </div>
          )}

          {activeTab === "settings" && (
            <SettingsTab user={dashboardData.user} />
          )}
        </main>
      </div>
    </div>
  );
}
