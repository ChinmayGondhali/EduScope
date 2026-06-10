"use client";

import { useState } from "react";
import { useCompare } from "@/context/CompareContext";
import { CompareSelector } from "@/features/compare/CompareSelector";
import { CompareCard } from "@/features/compare/CompareCard";
import { CompareTable } from "@/features/compare/CompareTable";
import { EmptyState } from "@/components/states/EmptyState";
import { College } from "@/types";
import { Button } from "@/components/ui/Button";
import { ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";

export default function ComparePage() {
  const { selectedColleges, addToCompare, removeFromCompare } = useCompare();

  const handleAddCollege = (college: College) => {
    addToCompare(college);
  };

  const handleRemoveCollege = (id: string) => {
    removeFromCompare(id);
  };

  return (
    <div className="container mx-auto px-4 py-12 space-y-12">
      {/* Header Section */}
      <div className="text-center max-w-2xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider">
          <Sparkles className="h-3 w-3" />
          Comparison Engine
        </div>
        <h1 className="text-3xl md:text-5xl font-bold tracking-tight">Compare Your Top Choices</h1>
        <p className="text-muted-foreground text-lg">
          Select up to 3 colleges to compare their rankings, fees, and placement records side-by-side.
        </p>
      </div>

      {/* Selector & Selected Cards */}
      <div className="space-y-8">
        <div className="flex justify-center">
          <CompareSelector 
            onAdd={handleAddCollege} 
            disabled={selectedColleges.length >= 3} 
          />
        </div>

        {selectedColleges.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {selectedColleges.map((college) => (
              <CompareCard 
                key={college.id} 
                college={college} 
                onRemove={handleRemoveCollege} 
              />
            ))}
            {selectedColleges.length < 3 && (
              <div className="border-2 border-dashed rounded-2xl flex flex-col items-center justify-center p-8 text-muted-foreground bg-muted/5 min-h-[160px]">
                <p className="text-sm font-medium">Add {3 - selectedColleges.length} more to compare</p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Comparison Table */}
      {selectedColleges.length > 0 ? (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">Side-by-Side Comparison</h2>
            <div className="text-sm text-muted-foreground">
              {selectedColleges.length} of 3 colleges selected
            </div>
          </div>
          <CompareTable colleges={selectedColleges} />
        </div>
      ) : (
        <div className="max-w-4xl mx-auto py-20">
          <EmptyState
            title="Start Your Comparison"
            message="You haven't selected any colleges to compare yet. Search for colleges above or browse our listings to find your best matches."
            action={
              <Link href="/colleges">
                <Button size="lg" className="gap-2">
                  Browse Colleges
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            }
          />
        </div>
      )}
    </div>
  );
}
