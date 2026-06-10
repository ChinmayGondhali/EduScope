import { Quote } from "lucide-react";

const TESTIMONIALS = [
  {
    name: "Anjali Sharma",
    college: "IIT Bombay",
    text: "EduScope helped me find the perfect course and college. The comparison tool was a lifesaver when I was confused between three top institutes.",
    avatar: "https://i.pravatar.cc/150?u=anjali",
  },
  {
    name: "Rahul Verma",
    college: "BITS Pilani",
    text: "The placement data on this platform is incredibly accurate. It gave me the confidence to choose BITS over other options.",
    avatar: "https://i.pravatar.cc/150?u=rahul",
  },
  {
    name: "Sneha Reddy",
    college: "NID Ahmedabad",
    text: "As a design student, I found the niche information about creative courses here much better than any other platform.",
    avatar: "https://i.pravatar.cc/150?u=sneha",
  },
];

export function Testimonials() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-16 text-center">What Our Students Say</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((t) => (
            <div key={t.name} className="bg-card p-8 rounded-2xl border relative">
              <Quote className="h-10 w-10 text-primary/10 absolute top-6 left-6" />
              <div className="relative z-10">
                <p className="text-lg italic text-muted-foreground mb-8">"{t.text}"</p>
                <div className="flex items-center gap-4">
                  <img src={t.avatar} alt={t.name} className="h-12 w-12 rounded-full border-2 border-primary/20" />
                  <div>
                    <div className="font-bold">{t.name}</div>
                    <div className="text-sm text-primary font-medium">{t.college}</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
