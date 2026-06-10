import { Review } from "@/types";
import { Star, User } from "lucide-react";

interface DetailReviewsProps {
  reviews: Review[];
  rating: number;
}

export function DetailReviews({ reviews, rating }: DetailReviewsProps) {
  return (
    <section className="py-12 border-t">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold">Student Reviews</h2>
        <div className="flex items-center gap-2 bg-primary/5 px-4 py-2 rounded-lg border border-primary/10">
          <span className="text-2xl font-bold text-primary">{rating}</span>
          <div className="flex flex-col">
            <div className="flex text-yellow-500">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className={`h-3 w-3 ${i < Math.floor(rating) ? "fill-current" : ""}`} />
              ))}
            </div>
            <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider">Overall Rating</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {reviews.map((review) => (
          <div key={review.id} className="bg-muted/20 border rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-background rounded-full flex items-center justify-center border">
                  <User className="h-5 w-5 text-muted-foreground" />
                </div>
                <div>
                  <div className="font-bold">{review.user_name}</div>
                  <div className="text-xs text-muted-foreground">{new Date(review.created_at).toLocaleDateString()}</div>
                </div>
              </div>
              <div className="flex items-center gap-1 bg-yellow-500/10 text-yellow-600 px-2 py-1 rounded text-xs font-bold">
                <Star className="h-3 w-3 fill-current" />
                {review.rating}
              </div>
            </div>
            <p className="text-muted-foreground leading-relaxed italic">
              "{review.review_text}"
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
