"use client";

import { Send } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

export function Newsletter() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="bg-primary/5 border rounded-3xl p-8 md:p-16 text-center max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Stay Ahead in Your Journey</h2>
          <p className="text-muted-foreground text-lg mb-10 max-w-2xl mx-auto">
            Subscribe to our newsletter and get the latest updates on admissions, entrance exams, and scholarship opportunities.
          </p>
          
          <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto" onSubmit={(e) => e.preventDefault()}>
            <Input 
              type="email" 
              placeholder="Enter your email address" 
              className="h-12 bg-background border-primary/20 focus-visible:ring-primary"
              required
            />
            <Button className="h-12 px-8">
              Subscribe
              <Send className="ml-2 h-4 w-4" />
            </Button>
          </form>
          
          <p className="mt-6 text-sm text-muted-foreground">
            We respect your privacy. Unsubscribe at any time.
          </p>
        </div>
      </div>
    </section>
  );
}
