"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { DetailHero } from "@/features/colleges/DetailHero";
import { DetailOverview } from "@/features/colleges/DetailOverview";
import { DetailCourses } from "@/features/colleges/DetailCourses";
import { DetailPlacements } from "@/features/colleges/DetailPlacements";
import { DetailReviews } from "@/features/colleges/DetailReviews";
import { CollegeCard } from "@/components/cards/CollegeCard";
import { LoadingState } from "@/components/states/LoadingState";
import { ErrorState } from "@/components/states/ErrorState";
import { College, ApiResponse } from "@/types";
import { Button } from "@/components/ui/Button";
import { ArrowLeft } from "lucide-react";

export default function CollegeDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const router = useRouter();
  const [college, setCollege] = useState<College | null>(null);
  const [similarColleges, setSimilarColleges] = useState<College[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCollegeData = async () => {
      setIsLoading(true);
      try {
        // Fetch current college details
        const response = await fetch(`/api/colleges/${id}`);
        const result: ApiResponse<College> = await response.json();

        if (result.success) {
          setCollege(result.data);
          
          // Fetch similar colleges (using featured for now as a fallback)
          const similarRes = await fetch('/api/colleges/featured');
          const similarResult: ApiResponse<College[]> = await similarRes.json();
          if (similarResult.success) {
            setSimilarColleges(similarResult.data.filter(c => c.id !== id));
          }
        } else {
          throw new Error(result.error || "College not found");
        }
      } catch (err: any) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    if (id) fetchCollegeData();
  }, [id]);

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-20">
        <LoadingState message="Fetching institution details..." />
      </div>
    );
  }

  if (error || !college) {
    return (
      <div className="container mx-auto px-4 py-20">
        <ErrorState 
          title="Detail Page Error" 
          message={error || "We couldn't load the information for this college."} 
          onRetry={() => window.location.reload()} 
        />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 space-y-12">
      <Button 
        variant="ghost" 
        onClick={() => router.back()} 
        className="group mb-4"
      >
        <ArrowLeft className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform" />
        Back to Listings
      </Button>

      <DetailHero college={college} />

      <div className="max-w-5xl mx-auto space-y-12">
        <DetailOverview 
          description={college.description || "No description available."} 
          highlights={[]} // Not in schema, can be added later
        />

        {college.courses && college.courses.length > 0 && (
          <DetailCourses courses={college.courses} />
        )}

        {college.placement_stats && (
          <DetailPlacements placement={college.placement_stats} />
        )}

        {college.reviews && (
          <DetailReviews reviews={college.reviews} rating={college.rating} />
        )}

        {/* Similar Colleges Section */}
        <section className="py-12 border-t">
          <h2 className="text-2xl font-bold mb-8">Similar Institutions</h2>
          {similarColleges.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {similarColleges.map((c) => (
                <CollegeCard key={c.id} college={c} />
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground italic text-center py-8 bg-muted/20 rounded-2xl">
              No similar institutions found at this time.
            </p>
          )}
        </section>
      </div>
    </div>
  );
}
