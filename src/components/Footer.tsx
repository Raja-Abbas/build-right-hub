const Footer = () => {
  return (
    <footer className="py-12 bg-foreground text-primary-foreground/80">
      <div className="container">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-lg font-display font-semibold text-primary-foreground mb-2">
            Building for Industry Professionals
          </p>
          <p className="text-sm text-primary-foreground/60 mb-6">
            This is an early validation phase. We're gathering insights to build 
            a platform that truly serves your needs.
          </p>
          <div className="flex flex-wrap justify-center gap-6 text-sm">
            <span className="text-primary-foreground/40">
              © {new Date().getFullYear()} Market Validation
            </span>
            <span className="text-primary-foreground/40">•</span>
            <span className="text-primary-foreground/40">
              Built after speaking with industry professionals
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
