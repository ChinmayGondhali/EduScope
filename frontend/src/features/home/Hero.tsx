import { Search } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

export function Hero() {
  return (
    <section className="relative py-24 lg:py-40 overflow-hidden bg-background">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/10 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-400/10 rounded-full blur-[150px]" />
      </div>

      <div className="container relative z-10 mx-auto px-4 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/5 border border-primary/10 text-primary text-xs font-black uppercase tracking-[0.2em] mb-8 animate-fade-in">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
          </span>
          Admissions Open 2024-25
        </div>

        <h1 className="text-5xl md:text-8xl font-black tracking-tighter text-foreground mb-8 leading-[0.9] animate-slide-up">
          Discover Your <span className="text-primary italic">Future</span> <br className="hidden md:block" />
          at the Perfect College
        </h1>
        
        <p className="text-lg md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-12 font-medium leading-relaxed animate-fade-in [animation-delay:200ms]">
          Explore thousands of verified institutions across India. <br className="hidden md:block" />
          Make data-driven choices for your academic career.
        </p>
        
        <div className="max-w-4xl mx-auto animate-slide-up [animation-delay:400ms]">
          <div className="bg-card p-3 rounded-[2rem] shadow-2xl border border-border/50 flex flex-col md:flex-row gap-3 ring-8 ring-primary/5">
            <div className="relative flex-1 group">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
              <Input 
                placeholder="Search colleges, courses, or locations..." 
                className="pl-14 h-14 border-none shadow-none focus-visible:ring-0 text-lg font-medium bg-transparent"
              />
            </div>
            <Button size="lg" className="h-14 px-12 text-lg font-black rounded-2xl shadow-xl shadow-primary/20">
              Explore Now
            </Button>
          </div>
        </div>

        <div className="mt-16 flex flex-wrap justify-center gap-8 text-xs font-black uppercase tracking-[0.15em] text-muted-foreground/60 animate-fade-in [animation-delay:600ms]">
          <span className="text-muted-foreground/40">Trusted by:</span>
          <button className="hover:text-primary transition-colors">IIT Bombay</button>
          <button className="hover:text-primary transition-colors">BITS Pilani</button>
          <button className="hover:text-primary transition-colors">IIM Ahmedabad</button>
          <button className="hover:text-primary transition-colors">NID</button>
        </div>
      </div>
    </section>
  );
}
