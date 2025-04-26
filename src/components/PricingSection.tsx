
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';
import { useInView } from 'react-intersection-observer';
import { useToast } from '@/components/ui/use-toast';

const PricingSection: React.FC = () => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  });
  
  const { toast } = useToast();
  
  const handleContactClick = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  const handlePricingClick = () => {
    toast({
      title: "Plan Selected",
      description: "Thank you for your interest! Our team will contact you shortly to discuss your needs.",
    });
  };
  
  return (
    <section id="pricing" className="py-20 relative bg-gradient-to-b from-background to-emergency-dark">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-4 px-4 py-1 text-emergency-purple border-emergency-purple">
            Pricing & Access
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Choose Your Plan
          </h2>
          <p className="text-white/80 max-w-2xl mx-auto">
            PredixSafe offers flexible pricing options designed to scale with your emergency service's needs.
            All plans include dedicated support and regular updates.
          </p>
        </div>
        
        <div 
          ref={ref} 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto"
        >
          {/* Starter Plan */}
          <Card className={`bg-emergency-dark/30 border border-emergency-purple/30 shadow-lg overflow-hidden transition-all duration-500 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{ transitionDelay: '0ms' }}>
            <div className="absolute top-0 inset-x-0 h-2 bg-emergency-purple/30"></div>
            <CardHeader className="pb-0">
              <h3 className="text-lg font-semibold text-white">Starter</h3>
              <p className="text-sm text-white/60">For smaller departments and NGOs</p>
              <div className="mt-4">
                <span className="text-3xl font-bold text-white">$1,200</span>
                <span className="text-white/60 text-sm ml-2">/ month</span>
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              <ul className="space-y-3">
                <li className="flex items-start">
                  <Check className="mr-2 h-5 w-5 text-emergency-purple" />
                  <span className="text-white/80">Basic heatmap & response time analysis</span>
                </li>
                <li className="flex items-start">
                  <Check className="mr-2 h-5 w-5 text-emergency-purple" />
                  <span className="text-white/80">Coverage for up to 5 emergency vehicles</span>
                </li>
                <li className="flex items-start">
                  <Check className="mr-2 h-5 w-5 text-emergency-purple" />
                  <span className="text-white/80">12-hour prediction window</span>
                </li>
                <li className="flex items-start">
                  <Check className="mr-2 h-5 w-5 text-emergency-purple" />
                  <span className="text-white/80">Email alerts</span>
                </li>
                <li className="flex items-start">
                  <Check className="mr-2 h-5 w-5 text-emergency-purple" />
                  <span className="text-white/80">Weekly data reports</span>
                </li>
                <li className="flex items-start">
                  <Check className="mr-2 h-5 w-5 text-emergency-purple" />
                  <span className="text-white/80">Standard support (8/5)</span>
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button onClick={handlePricingClick} className="w-full bg-emergency-purple hover:bg-emergency-purple/80">
                Get Started
              </Button>
            </CardFooter>
          </Card>
          
          {/* Pro Plan */}
          <Card className={`relative bg-emergency-dark border border-emergency-yellow/40 shadow-lg overflow-hidden transition-all duration-500 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{ transitionDelay: '150ms' }}>
            <div className="absolute -right-10 -top-10 h-20 w-20 bg-emergency-yellow/10 rounded-full"></div>
            <div className="absolute -right-5 -top-5 h-10 w-10 bg-emergency-yellow/20 rounded-full"></div>
            
            <div className="absolute -left-6 top-32 h-12 w-12 bg-emergency-yellow/10 rounded-full"></div>
            <div className="absolute top-0 inset-x-0 h-2 bg-emergency-yellow"></div>
            <div className="absolute top-2 right-2">
              <Badge className="bg-emergency-yellow text-black">Popular</Badge>
            </div>
            
            <CardHeader className="pb-0">
              <h3 className="text-lg font-semibold text-white">Professional</h3>
              <p className="text-sm text-white/60">For city-level emergency services</p>
              <div className="mt-4">
                <span className="text-3xl font-bold text-white">$4,500</span>
                <span className="text-white/60 text-sm ml-2">/ month</span>
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              <ul className="space-y-3">
                <li className="flex items-start">
                  <Check className="mr-2 h-5 w-5 text-emergency-yellow" />
                  <span className="text-white/80">Advanced heatmap & resource optimization</span>
                </li>
                <li className="flex items-start">
                  <Check className="mr-2 h-5 w-5 text-emergency-yellow" />
                  <span className="text-white/80">Coverage for up to 25 emergency vehicles</span>
                </li>
                <li className="flex items-start">
                  <Check className="mr-2 h-5 w-5 text-emergency-yellow" />
                  <span className="text-white/80">Real-time predictive alerts</span>
                </li>
                <li className="flex items-start">
                  <Check className="mr-2 h-5 w-5 text-emergency-yellow" />
                  <span className="text-white/80">48-hour prediction window</span>
                </li>
                <li className="flex items-start">
                  <Check className="mr-2 h-5 w-5 text-emergency-yellow" />
                  <span className="text-white/80">SMS & email alerts</span>
                </li>
                <li className="flex items-start">
                  <Check className="mr-2 h-5 w-5 text-emergency-yellow" />
                  <span className="text-white/80">Daily data reports & insights</span>
                </li>
                <li className="flex items-start">
                  <Check className="mr-2 h-5 w-5 text-emergency-yellow" />
                  <span className="text-white/80">Enhanced support (12/7)</span>
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button onClick={handlePricingClick} className="w-full bg-emergency-yellow text-black hover:bg-emergency-yellow/80">
                Start 14-Day Trial
              </Button>
            </CardFooter>
          </Card>
          
          {/* Enterprise Plan */}
          <Card className={`bg-gradient-to-br from-emergency-dark to-emergency-dark/80 border border-emergency-blue/30 shadow-lg overflow-hidden transition-all duration-500 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{ transitionDelay: '300ms' }}>
            <div className="absolute top-0 inset-x-0 h-2 bg-emergency-blue"></div>
            <CardHeader className="pb-0">
              <h3 className="text-lg font-semibold text-white">Enterprise</h3>
              <p className="text-sm text-white/60">For large metro & integrated systems</p>
              <div className="mt-4">
                <span className="text-white/60 text-lg">Custom Pricing</span>
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              <ul className="space-y-3">
                <li className="flex items-start">
                  <Check className="mr-2 h-5 w-5 text-emergency-blue" />
                  <span className="text-white/80">Full-featured platform with all modules</span>
                </li>
                <li className="flex items-start">
                  <Check className="mr-2 h-5 w-5 text-emergency-blue" />
                  <span className="text-white/80">Unlimited emergency vehicles</span>
                </li>
                <li className="flex items-start">
                  <Check className="mr-2 h-5 w-5 text-emergency-blue" />
                  <span className="text-white/80">Advanced simulation toolset</span>
                </li>
                <li className="flex items-start">
                  <Check className="mr-2 h-5 w-5 text-emergency-blue" />
                  <span className="text-white/80">7-day prediction window</span>
                </li>
                <li className="flex items-start">
                  <Check className="mr-2 h-5 w-5 text-emergency-blue" />
                  <span className="text-white/80">Multi-agency coordination features</span>
                </li>
                <li className="flex items-start">
                  <Check className="mr-2 h-5 w-5 text-emergency-blue" />
                  <span className="text-white/80">Custom integrations with existing systems</span>
                </li>
                <li className="flex items-start">
                  <Check className="mr-2 h-5 w-5 text-emergency-blue" />
                  <span className="text-white/80">Premium support (24/7)</span>
                </li>
                <li className="flex items-start">
                  <Check className="mr-2 h-5 w-5 text-emergency-blue" />
                  <span className="text-white/80">Dedicated account manager</span>
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button onClick={handleContactClick} variant="outline" className="w-full border-emergency-blue/70 text-emergency-blue hover:bg-emergency-blue/10">
                Contact Sales
              </Button>
            </CardFooter>
          </Card>
        </div>
        
        <div className="mt-16 text-center max-w-3xl mx-auto">
          <h3 className="text-xl text-white mb-4">Need a customized solution?</h3>
          <p className="text-white/70 mb-6">
            We understand that every emergency service has unique challenges and requirements.
            Our team can work with you to develop a tailored solution that fits your exact needs and budget.
          </p>
          <Button onClick={handleContactClick} variant="outline" className="border-emergency-purple text-emergency-purple hover:bg-emergency-purple/10">
            Schedule a Consultation
          </Button>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
