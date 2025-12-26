import { 
  Shield, 
  Truck, 
  BarChart3, 
  Users, 
  Package, 
  Headphones 
} from "lucide-react";

const benefits = [
  {
    icon: Shield,
    title: "Verified Quality",
    description: "Every supplier and material meets industry standards before listing.",
  },
  {
    icon: BarChart3,
    title: "Transparent Pricing",
    description: "Clear, upfront pricing with no hidden fees. Compare and save.",
  },
  {
    icon: Truck,
    title: "Reliable Availability",
    description: "Real-time stock levels and reliable delivery timelines.",
  },
  {
    icon: Package,
    title: "Bulk Ordering",
    description: "Volume discounts and streamlined ordering for large projects.",
  },
  {
    icon: Users,
    title: "For Professionals",
    description: "Built specifically for contractors, builders, and trades.",
  },
  {
    icon: Headphones,
    title: "Technical Support",
    description: "Expert guidance when you need help with specifications.",
  },
];

const BenefitsSection = () => {
  return (
    <section className="py-20 gradient-subtle">
      <div className="container">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
            What We're Building
          </h2>
          <p className="text-lg text-muted-foreground">
            A platform designed around what industry professionals actually need—not 
            what we think they want.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="flex gap-4 p-6 rounded-xl bg-card border border-border hover:shadow-card transition-all duration-300"
            >
              <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                <benefit.icon className="w-5 h-5 text-accent" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-1">
                  {benefit.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
