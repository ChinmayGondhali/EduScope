import { CheckCircle2, ShieldCheck, Zap, Globe } from "lucide-react";

const FEATURES = [
  {
    title: "Verified Information",
    description: "Get accurate, up-to-date information directly from college admissions offices.",
    icon: ShieldCheck,
  },
  {
    title: "AI-Powered Match",
    description: "Find colleges that match your profile and career goals using our advanced algorithm.",
    icon: Zap,
  },
  {
    title: "Global Reach",
    description: "Explore opportunities not just in India, but also top universities worldwide.",
    icon: Globe,
  },
  {
    title: "Counseling Support",
    description: "Get expert advice from our career counselors to make informed decisions.",
    icon: CheckCircle2,
  },
];

export function WhyChooseUs() {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold mb-4">Why Students Trust Us</h2>
          <p className="text-muted-foreground">
            We provide the most comprehensive tools and resources to help you navigate your educational journey with confidence.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {FEATURES.map((feature) => {
            const Icon = feature.icon;
            return (
              <div 
                key={feature.title} 
                className="bg-card p-8 rounded-2xl border hover:shadow-lg transition-shadow"
              >
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-6">
                  <Icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
