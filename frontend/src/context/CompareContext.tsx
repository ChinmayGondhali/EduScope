"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { College } from "@/types";

interface CompareContextType {
  selectedColleges: College[];
  addToCompare: (college: College) => void;
  removeFromCompare: (id: string) => void;
  isComparing: (id: string) => boolean;
  clearCompare: () => void;
}

const CompareContext = createContext<CompareContextType | undefined>(undefined);

export function CompareProvider({ children }: { children: React.ReactNode }) {
  const [selectedColleges, setSelectedColleges] = useState<College[]>([]);

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("compare_colleges");
    if (saved) {
      try {
        setSelectedColleges(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse saved comparison", e);
      }
    }
  }, []);

  // Save to localStorage on change
  useEffect(() => {
    localStorage.setItem("compare_colleges", JSON.stringify(selectedColleges));
  }, [selectedColleges]);

  const addToCompare = (college: College) => {
    if (selectedColleges.length >= 3) {
      alert("You can only compare up to 3 colleges at a time.");
      return;
    }
    if (selectedColleges.find((c) => c.id === college.id)) {
      alert("This college is already in your comparison list.");
      return;
    }
    setSelectedColleges([...selectedColleges, college]);
  };

  const removeFromCompare = (id: string) => {
    setSelectedColleges(selectedColleges.filter((c) => c.id !== id));
  };

  const isComparing = (id: string) => {
    return selectedColleges.some((c) => c.id === id);
  };

  const clearCompare = () => {
    setSelectedColleges([]);
  };

  return (
    <CompareContext.Provider value={{ 
      selectedColleges, 
      addToCompare, 
      removeFromCompare, 
      isComparing,
      clearCompare 
    }}>
      {children}
    </CompareContext.Provider>
  );
}

export function useCompare() {
  const context = useContext(CompareContext);
  if (context === undefined) {
    throw new Error("useCompare must be used within a CompareProvider");
  }
  return context;
}
