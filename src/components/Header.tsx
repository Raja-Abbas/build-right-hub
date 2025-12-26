import { Button } from "@/components/ui/button";

interface HeaderProps {
  onOpenForm: () => void;
}

const Header = ({ onOpenForm }: HeaderProps) => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg gradient-hero flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">S</span>
            </div>
            <span className="font-display font-semibold text-foreground">
              SaniSource
            </span>
          </div>

          <nav className="hidden md:flex items-center gap-8">
            <a 
              href="#problem" 
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector('.bg-card')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              The Problem
            </a>
            <a 
              href="#survey" 
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('survey')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Survey
            </a>
          </nav>

          <Button onClick={onOpenForm} size="sm">
            Join Early Access
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
