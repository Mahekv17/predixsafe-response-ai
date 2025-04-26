import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { Menu } from 'lucide-react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { toast } = useToast();
  
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Success!",
      description: "Demo access granted. Welcome to PredixSafe.",
      duration: 5000,
    });

    // Scroll to dashboard demo section
    const dashboardSection = document.getElementById('dashboard');
    if (dashboardSection) {
      dashboardSection.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-emergency-dark/90 backdrop-blur-md shadow-md' : 'bg-transparent'}`}>
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center">
          <div className="text-2xl font-bold text-gradient mr-2">PredixSafe</div>
          <div className="h-6 w-6 rounded-full bg-emergency-red animate-pulse-emergency"></div>
        </div>
        
        <div className="hidden md:flex space-x-6 items-center">
          <button onClick={() => scrollToSection('hero')} className="text-white hover:text-emergency-purple transition-colors duration-200">Home</button>
          <button onClick={() => scrollToSection('problem')} className="text-white hover:text-emergency-purple transition-colors duration-200">Why It Matters</button>
          <button onClick={() => scrollToSection('solution')} className="text-white hover:text-emergency-purple transition-colors duration-200">Solution</button>
          <button onClick={() => scrollToSection('features')} className="text-white hover:text-emergency-purple transition-colors duration-200">Features</button>
          <button onClick={() => scrollToSection('how-it-works')} className="text-white hover:text-emergency-purple transition-colors duration-200">How It Works</button>
          <button onClick={() => scrollToSection('dashboard')} className="text-white hover:text-emergency-purple transition-colors duration-200">Dashboard</button>
          <button onClick={() => scrollToSection('pricing')} className="text-white hover:text-emergency-purple transition-colors duration-200">Pricing</button>
          <a 
            href="http://localhost:8501" 
            target="_blank" 
            rel="noopener noreferrer"
          >
            <Button variant="outline" className="bg-emergency-purple text-white border-none hover:bg-emergency-purple/90">
              Access Platform
            </Button>
          </a>
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <Menu className="h-6 w-6" />
          </Button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute w-full bg-emergency-dark/95 backdrop-blur-lg py-4 px-4 shadow-lg animate-fade-in-up">
          <div className="flex flex-col space-y-4">
            <button onClick={() => scrollToSection('hero')} className="text-white text-left py-2 hover:text-emergency-purple transition-colors duration-200">Home</button>
            <button onClick={() => scrollToSection('problem')} className="text-white text-left py-2 hover:text-emergency-purple transition-colors duration-200">Why It Matters</button>
            <button onClick={() => scrollToSection('solution')} className="text-white text-left py-2 hover:text-emergency-purple transition-colors duration-200">Solution</button>
            <button onClick={() => scrollToSection('features')} className="text-white text-left py-2 hover:text-emergency-purple transition-colors duration-200">Features</button>
            <button onClick={() => scrollToSection('how-it-works')} className="text-white text-left py-2 hover:text-emergency-purple transition-colors duration-200">How It Works</button>
            <button onClick={() => scrollToSection('dashboard')} className="text-white text-left py-2 hover:text-emergency-purple transition-colors duration-200">Dashboard</button>
            <button onClick={() => scrollToSection('pricing')} className="text-white text-left py-2 hover:text-emergency-purple transition-colors duration-200">Pricing</button>
            
            <a 
              href="http://localhost:8501" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              <Button className="bg-emergency-purple text-white border-none hover:bg-emergency-purple/90 w-full">
                Access Platform
              </Button>
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
