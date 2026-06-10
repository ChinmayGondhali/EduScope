import { MapPin } from "lucide-react";

const LOCATIONS = [
  { name: "Pune", count: 450, image: "https://images.unsplash.com/photo-1595658658481-d53d3f999875?q=80&w=400&auto=format&fit=crop" },
  { name: "Mumbai", count: 620, image: "https://images.unsplash.com/photo-1570160897040-30430ed22112?q=80&w=400&auto=format&fit=crop" },
  { name: "Bangalore", count: 580, image: "https://images.unsplash.com/photo-1596760411110-381af0f5fd41?q=80&w=400&auto=format&fit=crop" },
  { name: "Delhi", count: 740, image: "https://images.unsplash.com/photo-1587474260584-136574528ed5?q=80&w=400&auto=format&fit=crop" },
  { name: "Hyderabad", count: 410, image: "https://images.unsplash.com/photo-1605000797499-95a51c5269ae?q=80&w=400&auto=format&fit=crop" },
];

export function PopularLocations() {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-10 text-center">Popular Locations</h2>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {LOCATIONS.map((city) => (
            <div 
              key={city.name} 
              className="group relative h-48 rounded-xl overflow-hidden cursor-pointer"
            >
              <img 
                src={city.image} 
                alt={city.name} 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors" />
              <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                <MapPin className="h-6 w-6 mb-2 text-primary-foreground opacity-80" />
                <h3 className="text-xl font-bold">{city.name}</h3>
                <span className="text-sm opacity-80">{city.count}+ Colleges</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
