import { AlertTriangle, Clock, DollarSign, HelpCircle } from "lucide-react";

const problems = [
  {
    icon: AlertTriangle,
    title: "Inconsistent Quality",
    description: "Materials that don't meet specifications, leading to project delays and rework.",
  },
  {
    icon: DollarSign,
    title: "Opaque Pricing",
    description: "Hidden costs, unclear quotes, and pricing that varies wildly between suppliers.",
  },
  {
    icon: Clock,
    title: "Availability Issues",
    description: "Critical materials out of stock when you need them, delaying your entire project.",
  },
  {
    icon: HelpCircle,
    title: "Finding Trusted Suppliers",
    description: "Hours spent vetting suppliers, with no guarantee of reliability.",
  },
];

const ProblemSection = () => {
  return (
    <section className="py-20 bg-card">
      <div className="container">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
            Why This Exists
          </h2>
          <p className="text-lg text-muted-foreground">
            We've spoken to dozens of industry professionals. These are the problems 
            they face every day when sourcing sanitary and washroom materials.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {problems.map((problem, index) => (
            <div
              key={index}
              className="group p-6 rounded-xl bg-background border border-border hover:border-primary/30 transition-all duration-300 hover:shadow-card"
            >
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/15 transition-colors">
                <problem.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                {problem.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {problem.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProblemSection;
