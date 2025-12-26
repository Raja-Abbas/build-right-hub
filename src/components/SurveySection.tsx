import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { CheckCircle2, ChevronRight, ChevronLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const surveyQuestions = [
  {
    id: "sourcing",
    question: "How do you currently source sanitary materials?",
    type: "single",
    options: [
      "Local distributors/retailers",
      "Direct from manufacturers",
      "Online marketplaces",
      "Through referrals/contacts",
      "Multiple sources depending on project",
    ],
  },
  {
    id: "frustration",
    question: "What frustrates you most about the current process?",
    type: "single",
    options: [
      "Unreliable quality",
      "Price fluctuations",
      "Delivery delays",
      "Lack of product information",
      "Too time-consuming to compare options",
      "Payment and credit terms",
    ],
  },
  {
    id: "priorities",
    question: "What matters most when choosing a supplier?",
    type: "single",
    options: [
      "Competitive pricing",
      "Product quality & certifications",
      "Stock availability",
      "Fast delivery",
      "Trust & reputation",
      "Credit terms offered",
    ],
  },
  {
    id: "features",
    question: "Which features would you find most valuable?",
    type: "multi",
    options: [
      "Online ordering & tracking",
      "Verified supplier ratings",
      "Transparent pricing comparison",
      "Bulk order discounts",
      "Technical specifications & guides",
      "Credit/payment flexibility",
      "Mobile app access",
    ],
  },
];

const SurveySection = () => {
  const { toast } = useToast();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string | string[]>>({});
  const [submitted, setSubmitted] = useState(false);

  const current = surveyQuestions[currentQuestion];
  const isLast = currentQuestion === surveyQuestions.length - 1;
  const isFirst = currentQuestion === 0;

  const handleSingleSelect = (value: string) => {
    setAnswers({ ...answers, [current.id]: value });
  };

  const handleMultiSelect = (option: string, checked: boolean) => {
    const currentAnswers = (answers[current.id] as string[]) || [];
    const updated = checked
      ? [...currentAnswers, option]
      : currentAnswers.filter((a) => a !== option);
    setAnswers({ ...answers, [current.id]: updated });
  };

  const handleNext = () => {
    if (isLast) {
      // Submit survey
      console.log("Survey answers:", answers);
      setSubmitted(true);
      toast({
        title: "Survey completed!",
        description: "Thank you for sharing your insights.",
      });
    } else {
      setCurrentQuestion((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    setCurrentQuestion((prev) => Math.max(0, prev - 1));
  };

  const canProceed = () => {
    const answer = answers[current.id];
    if (current.type === "single") {
      return !!answer;
    }
    return Array.isArray(answer) && answer.length > 0;
  };

  if (submitted) {
    return (
      <section id="survey" className="py-20 bg-card">
        <div className="container">
          <div className="max-w-2xl mx-auto text-center">
            <div className="w-20 h-20 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-10 h-10 text-success" />
            </div>
            <h2 className="text-3xl font-display font-bold text-foreground mb-4">
              Thank You for Your Input!
            </h2>
            <p className="text-lg text-muted-foreground">
              Your insights help us understand what the industry truly needs. 
              We're building this platform based on feedback from professionals like you.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="survey" className="py-20 bg-card">
      <div className="container">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
              Help Us Understand Your Needs
            </h2>
            <p className="text-lg text-muted-foreground">
              A quick survey to help shape the features that matter most.
            </p>
          </div>

          <div className="bg-background rounded-2xl border border-border p-8 shadow-card">
            {/* Progress */}
            <div className="flex gap-2 mb-8">
              {surveyQuestions.map((_, index) => (
                <div
                  key={index}
                  className={`h-1.5 flex-1 rounded-full transition-colors ${
                    index <= currentQuestion ? "bg-primary" : "bg-muted"
                  }`}
                />
              ))}
            </div>

            {/* Question */}
            <div className="mb-8">
              <p className="text-sm text-muted-foreground mb-2">
                Question {currentQuestion + 1} of {surveyQuestions.length}
              </p>
              <h3 className="text-xl font-semibold text-foreground">
                {current.question}
              </h3>
            </div>

            {/* Options */}
            <div className="space-y-3 mb-8">
              {current.type === "single" ? (
                <RadioGroup
                  value={answers[current.id] as string}
                  onValueChange={handleSingleSelect}
                >
                  {current.options.map((option) => (
                    <label
                      key={option}
                      className="flex items-center gap-3 p-4 rounded-lg border border-border hover:border-primary/30 cursor-pointer transition-colors has-[:checked]:border-primary has-[:checked]:bg-primary/5"
                    >
                      <RadioGroupItem value={option} />
                      <span className="text-foreground">{option}</span>
                    </label>
                  ))}
                </RadioGroup>
              ) : (
                current.options.map((option) => (
                  <label
                    key={option}
                    className="flex items-center gap-3 p-4 rounded-lg border border-border hover:border-primary/30 cursor-pointer transition-colors"
                  >
                    <Checkbox
                      checked={((answers[current.id] as string[]) || []).includes(
                        option
                      )}
                      onCheckedChange={(checked) =>
                        handleMultiSelect(option, checked as boolean)
                      }
                    />
                    <span className="text-foreground">{option}</span>
                  </label>
                ))
              )}
            </div>

            {/* Navigation */}
            <div className="flex justify-between">
              <Button
                variant="ghost"
                onClick={handlePrevious}
                disabled={isFirst}
              >
                <ChevronLeft className="w-4 h-4 mr-1" />
                Previous
              </Button>
              <Button
                onClick={handleNext}
                disabled={!canProceed()}
                variant={isLast ? "hero" : "default"}
              >
                {isLast ? "Submit Survey" : "Next"}
                {!isLast && <ChevronRight className="w-4 h-4 ml-1" />}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SurveySection;
