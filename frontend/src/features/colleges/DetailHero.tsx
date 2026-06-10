"use client";

import { Star, MapPin, Bookmark, ArrowLeftRight, CheckCircle2, Loader2 } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { College } from "@/types";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useCompare } from "@/context/CompareContext";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

interface DetailHeroProps {
  college: College;
}

export function DetailHero({ college }: DetailHeroProps) {
  const { user } = useAuth();
  const { addToCompare, isComparing, removeFromCompare } = useCompare();
  const router = useRouter();
  const [isShortlisting, setIsShortlisting] = useState(false);
  const [isShortlisted, setIsShortlisted] = useState(false);
  const [isApplying, setIsApplying] = useState(false);
  const [isApplied, setIsApplied] = useState(false);

  const handleShortlist = async () => {
    if (!user) {
      router.push("/auth/login");
      return;
    }

    setIsShortlisting(true);
    try {
      const res = await fetch("/api/saved", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ collegeId: college.id }),
      });
      const data = await res.json();
      if (data.success || data.message === "College already saved") {
        setIsShortlisted(true);
      }
    } catch (error) {
      console.error("Shortlist failed", error);
    } finally {
      setIsShortlisting(false);
    }
  };

  const handleApply = async () => {
    if (!user) {
      router.push("/auth/login");
      return;
    }

    setIsApplying(true);
    try {
      const res = await fetch("/api/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ collegeId: college.id }),
      });
      const data = await res.json();
      if (data.success || data.message === "Already applied to this college") {
        setIsApplied(true);
      }
    } catch (error) {
      console.error("Application failed", error);
    } finally {
      setIsApplying(false);
    }
  };

  const handleCompare = () => {
    if (isComparing(college.id)) {
      removeFromCompare(college.id);
    } else {
      addToCompare(college);
    }
  };

  return (
    <section className="relative h-[500px] w-full overflow-hidden rounded-[3rem] shadow-2xl group animate-fade-in">
      <img 
        src={college.image_url} 
        alt={college.name} 
        className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-1000"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
      
      <div className="absolute bottom-0 left-0 w-full p-8 md:p-16">
        <div className="container mx-auto">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
            <div className="space-y-6 max-w-3xl">
              <div className="flex flex-wrap gap-3 animate-slide-up">
                <Badge className="bg-primary text-primary-foreground border-none px-4 py-1.5 rounded-full font-black uppercase tracking-widest text-[10px]">
                  Premium Partner
                </Badge>
                <Badge variant="secondary" className="bg-white/20 backdrop-blur-md text-white border-none px-4 py-1.5 rounded-full font-black text-[10px]">
                  <Star className="h-3 w-3 text-yellow-400 fill-yellow-400 mr-1.5" />
                  {college.rating} Institutional Rating
                </Badge>
              </div>
              
              <h1 className="text-4xl md:text-7xl font-black text-white tracking-tighter leading-[0.9] animate-slide-up [animation-delay:100ms]">
                {college.name}
              </h1>
              
              <div className="flex items-center gap-3 text-white/80 text-xl font-medium animate-slide-up [animation-delay:200ms]">
                <div className="p-2 bg-white/10 rounded-xl backdrop-blur-md">
                  <MapPin className="h-6 w-6" />
                </div>
                {college.location}
              </div>
            </div>
            
            <div className="flex flex-wrap gap-4 animate-slide-up [animation-delay:300ms]">
              <Button 
                size="lg" 
                variant="secondary" 
                onClick={handleCompare}
                className={cn(
                  "bg-white/10 hover:bg-white/20 text-white border-white/20 backdrop-blur-md rounded-2xl h-16 px-8 font-black transition-all",
                  isComparing(college.id) && "bg-primary/20 border-primary/40 text-primary"
                )}
              >
                <ArrowLeftRight className={cn("h-5 w-5 mr-3", isComparing(college.id) && "animate-pulse")} />
                {isComparing(college.id) ? "Selected for Compare" : "Add to Compare"}
              </Button>
              <Button 
                size="lg" 
                variant="secondary" 
                onClick={handleShortlist}
                disabled={isShortlisting || isShortlisted}
                className="bg-white/10 hover:bg-white/20 text-white border-white/20 backdrop-blur-md rounded-2xl h-16 px-8 font-black"
              >
                {isShortlisting ? (
                  <Loader2 className="h-5 w-5 mr-3 animate-spin" />
                ) : isShortlisted ? (
                  <CheckCircle2 className="h-5 w-5 mr-3 text-green-400" />
                ) : (
                  <Bookmark className="h-5 w-5 mr-3" />
                )}
                {isShortlisted ? "Shortlisted" : "Shortlist"}
              </Button>
              <Button 
                size="lg" 
                onClick={handleApply}
                disabled={isApplying || isApplied}
                className="h-16 px-12 rounded-2xl font-black text-lg shadow-2xl shadow-primary/40 ring-4 ring-primary/20"
              >
                {isApplying ? (
                  <Loader2 className="h-5 w-5 mr-3 animate-spin" />
                ) : isApplied ? (
                  <CheckCircle2 className="h-5 w-5 mr-3" />
                ) : null}
                {isApplied ? "Applied Successfully" : "Apply Now"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
