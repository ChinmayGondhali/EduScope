"use client";

import { useState, useEffect } from "react";
import { SearchBar } from "@/features/colleges/SearchBar";
import { FilterPanel } from "@/features/colleges/FilterPanel";
import { CollegeCard } from "@/components/cards/CollegeCard";
import { Pagination } from "@/features/colleges/Pagination";
import { CollegeSkeleton } from "@/features/colleges/CollegeSkeleton";
import { EmptyState } from "@/components/states/EmptyState";
import { ErrorState } from "@/components/states/ErrorState";
import { College, SortOption, PaginatedResponse, ApiResponse } from "@/types";
import { Button } from "@/components/ui/Button";
import { SlidersHorizontal } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useCompare } from "@/context/CompareContext";
import { useRouter } from "next/navigation";

const LIMIT = 6;

export default function CollegesPage() {
  const { user } = useAuth();
  const { addToCompare, isComparing, removeFromCompare } = useCompare();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [colleges, setColleges] = useState<College[]>([]);
  const [pagination, setPagination] = useState({
    page: 1,
    totalPages: 1,
    totalItems: 0
  });

  // Filter States
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("All");
  const [selectedRating, setSelectedRating] = useState<number | null>(null);
  const [maxFees, setMaxFees] = useState<number>(1000000);
  const [sortBy, setSortBy] = useState<SortOption>("rating");
  const [currentPage, setCurrentPage] = useState(1);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const fetchColleges = async () => {
    setIsLoading(true);
    try {
      const params = new URLSearchParams({
        page: currentPage.toString(),
        limit: LIMIT.toString(),
        sortBy,
        sortOrder: 'desc'
      });

      if (searchQuery) params.append('search', searchQuery);
      if (selectedLocation !== "All") params.append('location', selectedLocation);
      if (selectedRating) params.append('rating', selectedRating.toString());
      if (maxFees < 1000000) params.append('maxFees', maxFees.toString());

      const response = await fetch(`/api/colleges?${params.toString()}`);
      const result: PaginatedResponse<College> = await response.json();

      if (result.success) {
        setColleges(result.data);
        setPagination({
          page: result.pagination.page,
          totalPages: result.pagination.totalPages,
          totalItems: result.pagination.totalItems
        });
      } else {
        throw new Error("Failed to fetch colleges");
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchColleges();
  }, [currentPage, sortBy, selectedLocation, selectedRating, maxFees]);

  // Debounced search effect
  useEffect(() => {
    const timer = setTimeout(() => {
      if (currentPage !== 1) setCurrentPage(1);
      else fetchColleges();
    }, 500);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  const handleReset = () => {
    setSearchQuery("");
    setSelectedLocation("All");
    setSelectedRating(null);
    setMaxFees(1000000);
    setSortBy("rating");
    setCurrentPage(1);
  };

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
        // You could update local state here to show a success toast or change bookmark icon
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

  if (error) {
    return <ErrorState message={error} onRetry={() => { setError(null); fetchColleges(); }} />;
  }

  return (
    <div className="container mx-auto px-4 py-12 lg:py-20 animate-fade-in">
      <div className="flex flex-col gap-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b pb-8">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/5 text-primary text-[10px] font-black uppercase tracking-widest">
              Discovery Mode
            </div>
            <h1 className="text-4xl md:text-6xl font-black tracking-tighter leading-none">Find Your <span className="text-primary italic">Campus</span></h1>
            <p className="text-muted-foreground text-lg font-medium">
              Showing {pagination.totalItems} verified institutions
            </p>
          </div>
          
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-3 bg-muted/50 p-2 rounded-2xl border">
              <span className="text-xs font-black uppercase tracking-widest text-muted-foreground/60 pl-2">Sort:</span>
              <select 
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="bg-white border-none focus:ring-0 cursor-pointer font-bold text-sm text-primary rounded-xl px-4 py-2 shadow-sm"
              >
                <option value="rating">Top Rated First</option>
                <option value="fees">Lowest Fees First</option>
                <option value="placement_rate">Highest Placement</option>
                <option value="name">Alphabetical</option>
              </select>
            </div>
            
            <Button 
              variant="outline" 
              onClick={() => setIsFilterOpen(true)}
              className="lg:hidden rounded-2xl gap-2 font-bold"
            >
              <SlidersHorizontal className="h-4 w-4" />
              Filters
            </Button>
          </div>
        </div>

        <div className="grid lg:grid-cols-[300px_1fr] gap-12 items-start">
          {/* Sidebar Filters */}
          <aside className="hidden lg:block sticky top-32">
            <FilterPanel 
              selectedLocation={selectedLocation}
              onLocationChange={setSelectedLocation}
              selectedRating={selectedRating}
              onRatingChange={setSelectedRating}
              priceRange={[0, maxFees]}
              onPriceRangeChange={(range) => setMaxFees(range[1])}
              onReset={handleReset}
            />
          </aside>

          {/* Main Content */}
          <main className="space-y-12">
            <SearchBar value={searchQuery} onChange={setSearchQuery} />

            {isLoading ? (
              <div className="grid sm:grid-cols-2 gap-8">
                {[...Array(6)].map((_, i) => (
                  <CollegeSkeleton key={i} />
                ))}
              </div>
            ) : colleges.length > 0 ? (
              <>
                <div className="grid sm:grid-cols-2 gap-8">
                  {colleges.map((college) => (
                    <CollegeCard 
                      key={college.id} 
                      college={college} 
                      isSaved={false} // You could link this to saved state later
                      isComparing={isComparing(college.id)}
                      onSave={handleSave}
                      onCompare={() => handleCompare(college)}
                    />
                  ))}
                </div>
                
                <Pagination 
                  currentPage={currentPage}
                  totalPages={pagination.totalPages}
                  onPageChange={setCurrentPage}
                />
              </>
            ) : (
              <EmptyState 
                title="No colleges found"
                message="Try adjusting your search or filters to find what you're looking for."
                action={
                  <Button onClick={handleReset} variant="outline" className="font-bold">
                    Clear all filters
                  </Button>
                }
              />
            )}
          </main>
        </div>
      </div>

      {/* Mobile Filters Overlay */}
      {isFilterOpen && (
        <div className="fixed inset-0 z-50 lg:hidden animate-in fade-in duration-300">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsFilterOpen(false)} />
          <div className="absolute inset-y-0 right-0 w-[300px] bg-background shadow-2xl p-6 overflow-y-auto animate-in slide-in-from-right duration-500">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-black tracking-tight">Filters</h2>
              <Button variant="ghost" size="sm" onClick={() => setIsFilterOpen(false)} className="font-bold">Close</Button>
            </div>
            <FilterPanel 
              selectedLocation={selectedLocation}
              onLocationChange={setSelectedLocation}
              selectedRating={selectedRating}
              onRatingChange={setSelectedRating}
              priceRange={[0, maxFees]}
              onPriceRangeChange={(range) => setMaxFees(range[1])}
              onReset={handleReset}
            />
          </div>
        </div>
      )}
    </div>
  );
}
