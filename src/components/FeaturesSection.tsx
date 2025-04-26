
import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { useInView } from 'react-intersection-observer';

const features = [
  {
    id: 'deployment',
    title: 'Real-Time Adaptive Resource Deployment',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 8.35V20a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8.35A2 2 0 0 1 3.26 6.5l8-3.2a2 2 0 0 1 1.48 0l8 3.2A2 2 0 0 1 22 8.35Z"></path>
        <path d="M6 18h12"></path>
        <path d="M6 14h12"></path>
        <rect width="12" height="12" x="6" y="10"></rect>
      </svg>
    ),
    description: 'Uses a continuously learning AI model to re-calculate the best deployment zones for emergency vehicles every hour.',
    details: [
      'Automatically suggests repositioning of vehicles during shifts, based on incoming data.',
      'Accessible via dashboard heatmaps + SMS/email alerts to field teams.',
      'Reduces average response time by up to 23% in high-demand areas.'
    ],
    image: 'deployment-visualization.png'
  },
  {
    id: 'forecasting',
    title: 'Hyperlocal Hotspot Forecasting',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2a8 8 0 0 0-8 8c0 5.4 7.4 11.5 7.6 11.7a.7.7 0 0 0 .8 0c.2-.2 7.6-6.3 7.6-11.7a8 8 0 0 0-8-8z"></path>
        <circle cx="12" cy="10" r="3"></circle>
      </svg>
    ),
    description: 'Forecasts high-demand emergency zones down to the street-level using ConvLSTM models and temporal clustering.',
    details: [
      'Accounts for rush hours, historical incidents, and public venue density.',
      'Gives granular deployment cues rather than district-wide approximations.',
      'Color-coded visualization shows varying risk levels across neighborhoods.'
    ],
    image: 'hotspot-forecasting.png'
  },
  {
    id: 'anomaly',
    title: 'Event-Aware Anomaly Detection',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
        <line x1="12" y1="9" x2="12" y2="13"></line>
        <line x1="12" y1="17" x2="12.01" y2="17"></line>
      </svg>
    ),
    description: 'Syncs with live APIs from public event aggregators, weather alerts, and transport disruptions.',
    details: [
      'Triggers alerts when unusual conditions (concerts, marathons, natural disasters) are expected to spike demand.',
      'Helps services pre-deploy resources before issues happen.',
      'Monitors social media trends for early warning of developing situations.'
    ],
    image: 'anomaly-detection.png'
  },
  {
    id: 'heatmap',
    title: 'Response Time Heatmap Optimizer',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect width="18" height="18" x="3" y="3" rx="2" ry="2"></rect>
        <line x1="3" y1="9" x2="21" y2="9"></line>
        <line x1="3" y1="15" x2="21" y2="15"></line>
        <line x1="9" y1="3" x2="9" y2="21"></line>
        <line x1="15" y1="3" x2="15" y2="21"></line>
      </svg>
    ),
    description: 'Real-time dashboard visual showing areas under "critical delay pressure".',
    details: [
      'Highlights zones needing immediate reallocation.',
      'Color-coded maps, and an optional 3D urban view layer for complex cities.',
      'Provides dispatchers with at-a-glance understanding of coverage gaps.'
    ],
    image: 'heatmap-optimizer.png'
  },
  {
    id: 'simulator',
    title: 'Reinforcement Learning Dispatch Simulator',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path>
      </svg>
    ),
    description: 'Multi-agent system simulates various deployment strategies.',
    details: [
      'Trains over historical and synthetic data to recommend best resource movement policies.',
      'Integrated into admin dashboard for "scenario testing".',
      'Allows commanders to visualize the impact of different allocation strategies.'
    ],
    image: 'dispatch-simulator.png'
  },
  {
    id: 'equity',
    title: 'Equity-Aware Allocation Engine',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"></path>
        <line x1="4" y1="22" x2="4" y2="15"></line>
      </svg>
    ),
    description: 'Ensures that resource allocation does not favor only high-income or low-crime areas.',
    details: [
      'Weighs fairness with urgency by using an equity-score index built into the prediction model.',
      'Provides transparency reports on resource distribution.',
      'Helps ensure all communities receive appropriate emergency coverage.'
    ],
    image: 'equity-engine.png'
  },
  {
    id: 'surge',
    title: 'Demand Surge Early Warning System',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M13 2H6a2 2 0 0 0-2 2v16c0 1.1.9 2 2 2h12a2 2 0 0 0 2-2V9z"></path>
        <path d="M13 2v7h7"></path>
        <path d="M8 13h8"></path>
        <path d="M8 17h8"></path>
      </svg>
    ),
    description: 'Predicts emergency spikes 30–60 minutes in advance using short-term anomaly detection.',
    details: [
      'Sends predictive alerts to commanders for pre-positioning vehicles before crisis escalation.',
      'Also includes auto-generated recommendations for escalation plans.',
      'Integrates with weather forecasts and traffic conditions for accurate predictions.'
    ],
    image: 'surge-warning.png'
  }
];

const FeaturesSection: React.FC = () => {
  const [activeFeature, setActiveFeature] = useState('deployment');
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  });
  
  return (
    <section id="features" className="py-20 relative overflow-hidden bg-gradient-to-b from-background to-emergency-dark/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-4 px-4 py-1 text-emergency-purple border-emergency-purple">
            Powerful Capabilities
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Advanced AI Features
          </h2>
          <p className="text-white/80 max-w-2xl mx-auto">
            PredixSafe combines cutting-edge machine learning with emergency management expertise
            to deliver a comprehensive suite of life-saving capabilities.
          </p>
        </div>
        
        <div ref={ref}>
          <Tabs value={activeFeature} onValueChange={setActiveFeature} className="w-full">
            <TabsList className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-2 bg-emergency-dark/50 p-1 h-auto">
              {features.map((feature) => (
                <TabsTrigger 
                  key={feature.id}
                  value={feature.id}
                  className={`flex flex-col items-center text-xs md:text-sm p-3 data-[state=active]:text-emergency-purple`}
                >
                  <div className={`mb-2 ${activeFeature === feature.id ? 'text-emergency-purple' : 'text-white/70'}`}>
                    {feature.icon}
                  </div>
                  <span className="text-center line-clamp-2">{feature.title.split(' ').slice(0, 2).join(' ')}</span>
                </TabsTrigger>
              ))}
            </TabsList>
            
            {features.map((feature) => (
              <TabsContent 
                key={feature.id} 
                value={feature.id}
                className={`mt-6 transition-opacity duration-500 ${inView ? 'opacity-100' : 'opacity-0'}`}
              >
                <Card className="border border-emergency-purple/30 overflow-hidden bg-emergency-dark/50">
                  <CardContent className="p-0">
                    <div className="grid grid-cols-1 lg:grid-cols-2">
                      <div className="p-6 lg:p-8 flex flex-col justify-between">
                        <div>
                          <div className="flex items-center mb-4">
                            <div className="h-12 w-12 rounded-full bg-emergency-purple/20 flex items-center justify-center mr-4">
                              {feature.icon}
                            </div>
                            <h3 className="text-xl font-bold text-white">{feature.title}</h3>
                          </div>
                          
                          <p className="text-white/80 mb-6">{feature.description}</p>
                          
                          <ul className="space-y-3 mb-8">
                            {feature.details.map((detail, idx) => (
                              <li key={idx} className="flex items-start">
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 text-emergency-purple mt-1 flex-shrink-0">
                                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                                  <path d="m9 11 3 3L22 4"></path>
                                </svg>
                                <span className="text-white/70">{detail}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        
                        <div className="hidden sm:block">
                          <Badge className="bg-emergency-purple/20 text-emergency-purple hover:bg-emergency-purple/30 border-none">
                            AI-Powered
                          </Badge>
                          <Badge className="bg-emergency-blue/20 text-emergency-blue hover:bg-emergency-blue/30 border-none ml-2">
                            Real-time
                          </Badge>
                          <Badge className="bg-emergency-red/20 text-emergency-red hover:bg-emergency-red/30 border-none ml-2">
                            Mission Critical
                          </Badge>
                        </div>
                      </div>
                      
                      <div className="bg-gradient-to-br from-emergency-dark/80 to-emergency-purple/10 p-6 flex items-center justify-center">
                        <div className="relative w-full h-[300px] flex items-center justify-center glass-card p-4">
                          {/* Feature visualization */}
                          <div className="text-center">
                            <div className="m-4 p-6 rounded-lg bg-emergency-purple/10 border border-emergency-purple/30">
                              <div className="flex justify-center mb-4">
                                {feature.icon}
                              </div>
                              <h4 className="text-lg font-semibold text-white mb-2">
                                {feature.title}
                              </h4>
                              <p className="text-sm text-white/70">
                                Interactive visualization available in live demo
                              </p>
                            </div>
                            
                            <div className="mt-4">
                              <div className="h-2 w-32 bg-emergency-purple/30 rounded-full mx-auto"></div>
                              <div className="flex justify-center mt-2">
                                <div className="h-8 w-8 rounded-full bg-emergency-purple/20 mx-1 animate-pulse"></div>
                                <div className="h-8 w-8 rounded-full bg-emergency-red/20 mx-1 animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                                <div className="h-8 w-8 rounded-full bg-emergency-blue/20 mx-1 animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
