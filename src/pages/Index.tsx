import { useState } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ProblemSection from "@/components/ProblemSection";
import BenefitsSection from "@/components/BenefitsSection";
import { ShopSection } from "@/components/ShopSection";
import SurveySection from "@/components/SurveySection";
import Footer from "@/components/Footer";
import InterestForm from "@/components/InterestForm";

const Index = () => {
  const [formOpen, setFormOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <Header onOpenForm={() => setFormOpen(true)} />
      
      <main className="pt-16">
        <Hero onOpenForm={() => setFormOpen(true)} />
        <ProblemSection />
        <BenefitsSection />
        <ShopSection />
        <SurveySection />
      </main>
      
      <Footer />
      
      <InterestForm open={formOpen} onOpenChange={setFormOpen} />
    </div>
  );
};

export default Index;
