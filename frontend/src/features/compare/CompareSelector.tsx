"use client";

import { useState, useEffect } from "react";
import { Search, Plus, X, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/Input";
import { College, PaginatedResponse } from "@/types";

interface CompareSelectorProps {
  onAdd: (college: College) => void;
  disabled?: boolean;
}

export function CompareSelector({ onAdd, disabled }: CompareSelectorProps) {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [colleges, setColleges] = useState<College[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchColleges = async () => {
      if (!query.trim()) {
        setColleges([]);
        return;
      }

      setIsLoading(true);
      try {
        const response = await fetch(`/api/colleges?search=${encodeURIComponent(query)}&limit=5`);
        const result: PaginatedResponse<College> = await response.json();
        if (result.success) {
          setColleges(result.data);
        }
      } catch (error) {
        console.error("Search failed", error);
      } finally {
        setIsLoading(false);
      }
    };

    const timer = setTimeout(fetchColleges, 300);
    return () => clearTimeout(timer);
  }, [query]);

  return (
    <div className="relative w-full max-w-md">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder={disabled ? "Maximum 3 colleges selected" : "Search and add a college..."}
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          disabled={disabled}
          className="pl-10 h-12 text-base font-medium"
        />
        <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
          {isLoading && <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />}
          {query && !isLoading && (
            <button
              onClick={() => {
                setQuery("");
                setIsOpen(false);
              }}
              className="text-muted-foreground hover:text-foreground"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>

      {isOpen && query && !disabled && !isLoading && (
        <div className="absolute top-full left-0 w-full mt-2 bg-card border rounded-xl shadow-xl z-50 overflow-hidden animate-in fade-in slide-in-from-top-2">
          {colleges.length > 0 ? (
            <div className="py-2">
              {colleges.map((college) => (
                <button
                  key={college.id}
                  onClick={() => {
                    onAdd(college);
                    setQuery("");
                    setIsOpen(false);
                  }}
                  className="w-full flex items-center gap-3 px-4 py-3 hover:bg-muted transition-colors text-left"
                >
                  <img src={college.image_url} alt="" className="w-8 h-8 rounded object-cover" />
                  <div className="flex-1 overflow-hidden">
                    <div className="font-bold truncate">{college.name}</div>
                    <div className="text-xs text-muted-foreground">{college.location}</div>
                  </div>
                  <Plus className="h-4 w-4 text-primary" />
                </button>
              ))}
            </div>
          ) : (
            <div className="p-4 text-center text-sm text-muted-foreground">
              No colleges found matching "{query}"
            </div>
          )}
        </div>
      )}
    </div>
  );
}
