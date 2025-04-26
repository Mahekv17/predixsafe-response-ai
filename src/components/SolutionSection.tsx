
import React from 'react';
import { useInView } from 'react-intersection-observer';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const SolutionSection: React.FC = () => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  });
  
  return (
    <section id="solution" className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-emergency-dark to-background z-[-1]"></div>
      
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-4 px-4 py-1 text-emergency-purple border-emergency-purple">
            Revolutionary Approach
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            <span className="text-gradient">Meet PredixSafe</span>
          </h2>
          <p className="text-white/80 max-w-2xl mx-auto">
            A mission-critical platform for emergency service providers that uses AI to optimize
            resource deployment and save lives through predictive intelligence.
          </p>
        </div>
        
        <div 
          ref={ref} 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <Card className={`bg-emergency-dark/50 border border-emergency-purple/30 overflow-hidden transition-all duration-500 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{ transitionDelay: '0ms' }}>
            <CardContent className="p-6">
              <div className="h-12 w-12 rounded-full bg-emergency-purple/20 flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-emergency-purple">
                  <path d="M21 12V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14c0 1.1.9 2 2 2h7.5"></path>
                  <path d="M16 2v4"></path>
                  <path d="M8 2v4"></path>
                  <path d="M3 10h18"></path>
                  <circle cx="18" cy="18" r="3"></circle>
                  <path d="m14.5 17.5 1 1"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Historical Data Analysis</h3>
              <p className="text-white/70">
                PredixSafe analyzes years of emergency call data, identifying patterns and trends
                that human dispatchers might miss, creating a foundation for predictive models.
              </p>
            </CardContent>
          </Card>
          
          <Card className={`bg-emergency-dark/50 border border-emergency-purple/30 overflow-hidden transition-all duration-500 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{ transitionDelay: '100ms' }}>
            <CardContent className="p-6">
              <div className="h-12 w-12 rounded-full bg-emergency-purple/20 flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-emergency-purple">
                  <path d="M8 2v4"></path>
                  <path d="M16 2v4"></path>
                  <rect width="18" height="18" x="3" y="4" rx="2"></rect>
                  <path d="M3 10h18"></path>
                  <path d="m17 14-5 5"></path>
                  <path d="m12 14 5 5"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Adaptive ML Models</h3>
              <p className="text-white/70">
                Constantly self-improving algorithms adapt to changing city dynamics, special events,
                weather conditions, and unexpected emergencies in real-time.
              </p>
            </CardContent>
          </Card>
          
          <Card className={`bg-emergency-dark/50 border border-emergency-purple/30 overflow-hidden transition-all duration-500 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{ transitionDelay: '200ms' }}>
            <CardContent className="p-6">
              <div className="h-12 w-12 rounded-full bg-emergency-purple/20 flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-emergency-purple">
                  <path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Strategic Deployment</h3>
              <p className="text-white/70">
                Hour-by-hour recommendations for optimal positioning of emergency vehicles
                to minimize response times and maximize coverage across your service area.
              </p>
            </CardContent>
          </Card>
          
          <Card className={`bg-emergency-dark/50 border border-emergency-purple/30 overflow-hidden transition-all duration-500 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{ transitionDelay: '300ms' }}>
            <CardContent className="p-6">
              <div className="h-12 w-12 rounded-full bg-emergency-purple/20 flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-emergency-purple">
                  <path d="M2 12h10"></path>
                  <path d="M9 4v16"></path>
                  <path d="m3 9 3 3-3 3"></path>
                  <path d="M14 8V6c0-1.1.9-2 2-2h3a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-3a2 2 0 0 1-2-2v-2"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Real-Time Alerts</h3>
              <p className="text-white/70">
                Immediate notifications about predicted surge areas, allowing command staff
                to proactively adjust resources before emergencies overwhelm the system.
              </p>
            </CardContent>
          </Card>
          
          <Card className={`bg-emergency-dark/50 border border-emergency-purple/30 overflow-hidden transition-all duration-500 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{ transitionDelay: '400ms' }}>
            <CardContent className="p-6">
              <div className="h-12 w-12 rounded-full bg-emergency-purple/20 flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-emergency-purple">
                  <rect width="18" height="18" x="3" y="3" rx="2"></rect>
                  <path d="M12 7v5l2.5 2.5"></path>
                  <path d="M19 10l3-3m-3 3 3 3"></path>
                  <path d="M5 10l-3-3m3 3-3 3"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Response Time Optimization</h3>
              <p className="text-white/70">
                AI algorithms continuously calculate and recommend the fastest routes and unit assignments
                to minimize time-to-scene across your entire coverage area.
              </p>
            </CardContent>
          </Card>
          
          <Card className={`bg-emergency-dark/50 border border-emergency-purple/30 overflow-hidden transition-all duration-500 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{ transitionDelay: '500ms' }}>
            <CardContent className="p-6">
              <div className="h-12 w-12 rounded-full bg-emergency-purple/20 flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-emergency-purple">
                  <path d="M17 11h1a3 3 0 0 1 0 6h-1"></path>
                  <path d="M9 12v6"></path>
                  <path d="M13 12v6"></path>
                  <path d="M21 5V3h-6v2"></path>
                  <path d="M3 3v2c0 1.1.9 2 2 2h9a2 2 0 0 0 2-2V3"></path>
                  <path d="M18 11a4 4 0 0 0-4-4H7a2 2 0 0 0-2 2v11"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Command Integration</h3>
              <p className="text-white/70">
                Seamlessly integrates with existing dispatch systems, CAD software, and communication tools
                to enhance—not replace—your current emergency operations.
              </p>
            </CardContent>
          </Card>
        </div>
        
        <div className="mt-16 text-center">
          <p className="text-emergency-purple font-semibold text-xl max-w-2xl mx-auto">
            "PredixSafe isn't just another tech solution—it's a life-saving force multiplier for emergency services."
          </p>
        </div>
      </div>
    </section>
  );
};

export default SolutionSection;
