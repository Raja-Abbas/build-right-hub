import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { CheckCircle2, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface InterestFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const roles = [
  "Contractor",
  "Builder",
  "Architect",
  "Plumber",
  "Homeowner",
  "Supplier",
  "Property Developer",
  "Other",
];

const materialTypes = [
  "PVC/UPVC Pipes",
  "PPR Pipes",
  "HDPE Pipes",
  "Drainage Systems",
  "Valves & Fittings",
  "Washroom Accessories",
  "Water Supply Materials",
  "Joints & Connectors",
];

const painPoints = [
  "Finding reliable suppliers",
  "Inconsistent product quality",
  "Unclear or changing prices",
  "Long delivery times",
  "Limited product availability",
  "Lack of technical specifications",
  "Minimum order quantities",
  "Poor customer support",
];

const InterestForm = ({ open, onOpenChange }: InterestFormProps) => {
  const { toast } = useToast();
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "",
    materials: [] as string[],
    painPoint: "",
    wishList: "",
    wouldUse: "",
  });

  const handleMaterialChange = (material: string, checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      materials: checked
        ? [...prev.materials, material]
        : prev.materials.filter((m) => m !== material),
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // In production, this would send to a backend
    console.log("Form submission:", formData);
    
    setSubmitted(true);
    toast({
      title: "Thank you for your interest!",
      description: "Your feedback helps shape this product.",
    });
  };

  const handleClose = () => {
    onOpenChange(false);
    // Reset form after closing
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        name: "",
        email: "",
        role: "",
        materials: [],
        painPoint: "",
        wishList: "",
        wouldUse: "",
      });
    }, 300);
  };

  if (submitted) {
    return (
      <Dialog open={open} onOpenChange={handleClose}>
        <DialogContent className="sm:max-w-md">
          <div className="flex flex-col items-center text-center py-6">
            <div className="w-16 h-16 rounded-full bg-success/10 flex items-center justify-center mb-4">
              <CheckCircle2 className="w-8 h-8 text-success" />
            </div>
            <DialogTitle className="text-2xl font-display mb-2">
              Thank You!
            </DialogTitle>
            <DialogDescription className="text-base">
              Your feedback is invaluable. We'll keep you updated as we develop 
              this platform based on insights from professionals like you.
            </DialogDescription>
            <Button onClick={handleClose} className="mt-6">
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-display">
            Join Early Access
          </DialogTitle>
          <DialogDescription>
            Help shape this product. Your input directly influences what we build.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 mt-4">
          {/* Name & Email */}
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name (optional)</Label>
              <Input
                id="name"
                placeholder="Your name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@company.com"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
          </div>

          {/* Role */}
          <div className="space-y-2">
            <Label>Your Role *</Label>
            <Select
              value={formData.role}
              onValueChange={(value) => setFormData({ ...formData, role: value })}
              required
            >
              <SelectTrigger>
                <SelectValue placeholder="Select your role" />
              </SelectTrigger>
              <SelectContent>
                {roles.map((role) => (
                  <SelectItem key={role} value={role}>
                    {role}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Materials */}
          <div className="space-y-3">
            <Label>Materials you typically purchase (select all that apply)</Label>
            <div className="grid grid-cols-2 gap-2">
              {materialTypes.map((material) => (
                <div key={material} className="flex items-center space-x-2">
                  <Checkbox
                    id={material}
                    checked={formData.materials.includes(material)}
                    onCheckedChange={(checked) =>
                      handleMaterialChange(material, checked as boolean)
                    }
                  />
                  <label
                    htmlFor={material}
                    className="text-sm text-muted-foreground cursor-pointer"
                  >
                    {material}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Pain Point */}
          <div className="space-y-2">
            <Label>Biggest pain point when sourcing materials</Label>
            <Select
              value={formData.painPoint}
              onValueChange={(value) => setFormData({ ...formData, painPoint: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select your biggest challenge" />
              </SelectTrigger>
              <SelectContent>
                {painPoints.map((point) => (
                  <SelectItem key={point} value={point}>
                    {point}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Wish List */}
          <div className="space-y-2">
            <Label htmlFor="wishlist">
              What do you wish existed in the market?
            </Label>
            <Textarea
              id="wishlist"
              placeholder="Tell us what would make your work easier..."
              value={formData.wishList}
              onChange={(e) => setFormData({ ...formData, wishList: e.target.value })}
              rows={3}
            />
          </div>

          {/* Would Use */}
          <div className="space-y-2">
            <Label>Would you use a platform like this?</Label>
            <div className="flex gap-3">
              {["Yes", "Maybe", "No"].map((option) => (
                <Button
                  key={option}
                  type="button"
                  variant={formData.wouldUse === option ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFormData({ ...formData, wouldUse: option })}
                >
                  {option}
                </Button>
              ))}
            </div>
          </div>

          {/* Submit */}
          <Button type="submit" variant="hero" size="lg" className="w-full">
            Submit & Join Early Access
          </Button>

          <p className="text-xs text-muted-foreground text-center">
            We respect your privacy. Your data is used only to understand market needs.
          </p>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default InterestForm;
