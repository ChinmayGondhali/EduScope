"use client";

import { useState, useEffect } from "react";
import { CollegeCard } from "@/components/cards/CollegeCard";
import { Button } from "@/components/ui/Button";
import { College, ApiResponse } from "@/types";
import { LoadingState } from "@/components/states/LoadingState";
import Link from "next/link";
import { APP_CONFIG } from "@/constants/navigation";
import { useAuth } from "@/context/AuthContext";
import { useCompare } from "@/context/CompareContext";
import { useRouter } from "next/navigation";

export function FeaturedColleges() {
  const { user } = useAuth();
  const { addToCompare, isComparing, removeFromCompare } = useCompare();
  const router = useRouter();
  const [colleges, setColleges] = useState<College[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const response = await fetch('/api/colleges/featured');
        const result: ApiResponse<College[]> = await response.json();
        if (result.success) {
          setColleges(result.data);
        }
      } catch (error) {
        console.error("Failed to fetch featured colleges", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFeatured();
  }, []);

  const handleSave = async (collegeId: string) => {
    if (!user) {
      router.push("/auth/login");
      return;
    }

    try {
      const response = await fetch('/api/saved', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ collegeId })
      });
      const result: ApiResponse<any> = await response.json();
      if (result.success || result.message === "College already saved") {
        alert("College shortlisted successfully!");
      }
    } catch (error) {
      console.error("Failed to save college", error);
    }
  };

  const handleCompare = (college: College) => {
    if (isComparing(college.id)) {
      removeFromCompare(college.id);
    } else {
      addToCompare(college);
    }
  };

  if (isLoading) {
    return (
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <LoadingState message="Loading featured institutions..." />
        </div>
      </section>
    );
  }

  if (colleges.length === 0) return null;

  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-4">
          <div>
            <h2 className="text-3xl font-bold mb-2">Featured Colleges</h2>
            <p className="text-muted-foreground">Handpicked top-tier institutions for your consideration.</p>
          </div>
          <Link href={APP_CONFIG.links.colleges}>
            <Button variant="outline">View All Colleges</Button>
          </Link>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {colleges.map((college) => (
            <CollegeCard 
              key={college.id} 
              college={college} 
              isComparing={isComparing(college.id)}
              onSave={handleSave}
              onCompare={() => handleCompare(college)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
