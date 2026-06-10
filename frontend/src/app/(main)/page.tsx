import { Hero } from "@/features/home/Hero";
import { FeaturedColleges } from "@/features/home/FeaturedColleges";
import { PopularLocations } from "@/features/home/PopularLocations";
import { Stats } from "@/features/home/Stats";
import { WhyChooseUs } from "@/features/home/WhyChooseUs";
import { Testimonials } from "@/features/home/Testimonials";
import { Newsletter } from "@/features/home/Newsletter";

export default function Home() {
  return (
    <div className="flex flex-col gap-0">
      <Hero />
      <Stats />
      <FeaturedColleges />
      <PopularLocations />
      <WhyChooseUs />
      <Testimonials />
      <Newsletter />
    </div>
  );
}
