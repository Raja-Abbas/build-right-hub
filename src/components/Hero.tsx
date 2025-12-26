import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2 } from "lucide-react";

interface HeroProps {
  onOpenForm: () => void;
}

const Hero = ({ onOpenForm }: HeroProps) => {
  const highlights = [
    "Quality materials you can trust",
    "Transparent pricing, no hidden costs",
    "Built for industry professionals",
  ];

  return (
    <section className="relative min-h-[85vh] flex items-center overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 gradient-subtle" />
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />
      
      <div className="container relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-8 animate-fade-in">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            <span className="text-sm font-medium">Early Validation Phase</span>
          </div>

          {/* Headline */}
          <h1 
            className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-foreground leading-tight mb-6 opacity-0 animate-fade-in-up"
            style={{ animationDelay: '100ms' }}
          >
            One Platform for Reliable{" "}
            <span className="text-primary">Sanitary & Washroom Materials</span>
          </h1>

          {/* Subheadline */}
          <p 
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8 opacity-0 animate-fade-in-up"
            style={{ animationDelay: '200ms' }}
          >
            Built for contractors, builders, and plumbing professionals who need 
            quality materials without the sourcing headaches.
          </p>

          {/* Highlights */}
          <div 
            className="flex flex-wrap justify-center gap-4 mb-10 opacity-0 animate-fade-in-up"
            style={{ animationDelay: '300ms' }}
          >
            {highlights.map((item, index) => (
              <div 
                key={index}
                className="flex items-center gap-2 text-sm text-muted-foreground"
              >
                <CheckCircle2 className="w-4 h-4 text-success" />
                <span>{item}</span>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div 
            className="flex flex-col sm:flex-row gap-4 justify-center opacity-0 animate-fade-in-up"
            style={{ animationDelay: '400ms' }}
          >
            <Button 
              variant="hero" 
              size="xl" 
              onClick={onOpenForm}
              className="group"
            >
              I'm Interested
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button 
              variant="outline" 
              size="xl"
              onClick={() => document.getElementById('survey')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Share Your Feedback
            </Button>
          </div>

          {/* Trust note */}
          <p 
            className="mt-8 text-sm text-muted-foreground opacity-0 animate-fade-in"
            style={{ animationDelay: '500ms' }}
          >
            Built after speaking with industry professionals. Your input shapes this product.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Hero;
