"use client";

import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

interface FilterPanelProps {
  selectedLocation: string;
  onLocationChange: (location: string) => void;
  selectedRating: number | null;
  onRatingChange: (rating: number | null) => void;
  priceRange: [number, number];
  onPriceRangeChange: (range: [number, number]) => void;
  onReset: () => void;
}

const LOCATIONS = ["All", "Mumbai", "Pune", "Delhi", "Bangalore", "Hyderabad", "Ahmedabad"];
const RATINGS = [4.5, 4.0, 3.5, 3.0];

export function FilterPanel({
  selectedLocation,
  onLocationChange,
  selectedRating,
  onRatingChange,
  priceRange,
  onPriceRangeChange,
  onReset,
}: FilterPanelProps) {
  return (
    <div className="space-y-10 p-8 bg-card border rounded-3xl shadow-sm h-fit sticky top-28">
      <div>
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-black text-xl tracking-tight">Filters</h3>
          <Button variant="ghost" size="sm" onClick={onReset} className="text-xs font-bold text-primary hover:bg-primary/5">
            Reset All
          </Button>
        </div>
      </div>

      <div className="space-y-5">
        <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/80">Location</h4>
        <div className="flex flex-wrap gap-2">
          {LOCATIONS.map((loc) => (
            <button
              key={loc}
              onClick={() => onLocationChange(loc)}
              className={cn(
                "px-4 py-2 rounded-xl text-sm font-bold border-2 transition-all active:scale-95",
                selectedLocation === loc
                  ? "bg-primary text-primary-foreground border-primary shadow-md shadow-primary/20"
                  : "bg-background text-foreground border-input hover:border-primary/50"
              )}
            >
              {loc}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-5">
        <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/80">Minimum Rating</h4>
        <div className="flex flex-col gap-2.5">
          {RATINGS.map((rating) => (
            <button
              key={rating}
              onClick={() => onRatingChange(selectedRating === rating ? null : rating)}
              className={cn(
                "flex items-center justify-between px-4 py-3 rounded-xl border-2 text-sm font-bold transition-all active:scale-[0.98]",
                selectedRating === rating
                  ? "bg-primary/5 border-primary text-primary shadow-sm"
                  : "bg-background border-input hover:border-primary/30"
              )}
            >
              <div className="flex items-center gap-2">
                <div className="flex text-yellow-500">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className={cn("text-sm", i < Math.floor(rating) ? "opacity-100" : "opacity-20")}>
                      ★
                    </span>
                  ))}
                </div>
                <span>{rating}+</span>
              </div>
              {selectedRating === rating && <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/80">Max Annual Fees</h4>
          <span className="text-sm font-black text-primary bg-primary/5 px-2 py-1 rounded-lg">₹{(priceRange[1] / 100000).toFixed(1)}L</span>
        </div>
        <div className="px-1">
          <input
            type="range"
            min="0"
            max="1000000"
            step="50000"
            value={priceRange[1]}
            onChange={(e) => onPriceRangeChange([0, parseInt(e.target.value)])}
            className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
            aria-label="Fees range slider"
          />
          <div className="flex justify-between mt-3 text-[10px] font-black uppercase tracking-widest text-muted-foreground/60">
            <span>₹0</span>
            <span>₹10L+</span>
          </div>
        </div>
      </div>
    </div>
  );
}
