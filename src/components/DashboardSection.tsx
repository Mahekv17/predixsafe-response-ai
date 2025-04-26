
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useInView } from 'react-intersection-observer';
import { useToast } from '@/hooks/use-toast';

const DashboardSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState('heatmap');
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  });
  const { toast } = useToast();
  
  const handleDemoClick = () => {
    toast({
      title: "Demo Access Requested",
      description: "Your demo access request has been received. Our team will contact you shortly.",
    });
  };
  
  return (
    <section id="dashboard" className="py-20 relative bg-gradient-to-b from-emergency-dark to-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-4 px-4 py-1 text-emergency-purple border-emergency-purple">
            Command Center
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Dashboard Preview
          </h2>
          <p className="text-white/80 max-w-2xl mx-auto">
            Experience the powerful visualization and control tools that emergency services use
            to optimize their operations and save lives.
          </p>
        </div>
        
        <div ref={ref} className={`transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <Card className="border border-emergency-purple/30 bg-emergency-dark/50 overflow-hidden">
            <div className="border-b border-emergency-purple/20 p-4 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center">
                <div className="bg-emergency-red h-3 w-3 rounded-full animate-pulse mr-2"></div>
                <h3 className="font-semibold text-white">PredixSafe Command Interface</h3>
              </div>
              
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-auto">
                <TabsList className="bg-emergency-dark/70">
                  <TabsTrigger value="heatmap">Heatmap</TabsTrigger>
                  <TabsTrigger value="resources">Resources</TabsTrigger>
                  <TabsTrigger value="predictions">Predictions</TabsTrigger>
                  <TabsTrigger value="alerts">Alerts</TabsTrigger>
                </TabsList>
                
                <TabsContent value="heatmap" className="m-0">
                  <div className="h-[500px] relative">
                    <div className="absolute inset-0 bg-[url('https://i.imgur.com/WnOkzD6.jpg')] bg-center bg-cover opacity-70">
                      <div className="absolute inset-0 bg-gradient-to-t from-emergency-dark to-transparent"></div>
                    </div>
                    
                    {/* Heatmap overlay */}
                    <div className="absolute inset-0">
                      <div className="absolute top-[30%] left-[40%] h-24 w-24 rounded-full bg-emergency-red/40 blur-xl"></div>
                      <div className="absolute top-[35%] left-[45%] h-16 w-16 rounded-full bg-emergency-red/60 blur-lg"></div>
                      
                      <div className="absolute top-[60%] left-[20%] h-32 w-32 rounded-full bg-emergency-red/30 blur-xl"></div>
                      <div className="absolute top-[65%] left-[25%] h-20 w-20 rounded-full bg-emergency-red/50 blur-lg"></div>
                      
                      <div className="absolute top-[20%] left-[70%] h-28 w-28 rounded-full bg-emergency-yellow/40 blur-xl"></div>
                      <div className="absolute top-[25%] left-[75%] h-16 w-16 rounded-full bg-emergency-yellow/60 blur-lg"></div>
                      
                      {/* Resource markers */}
                      <div className="absolute top-[40%] left-[30%] h-6 w-6 rounded-full bg-emergency-blue border-2 border-white flex items-center justify-center text-xs text-white">A1</div>
                      <div className="absolute top-[45%] left-[55%] h-6 w-6 rounded-full bg-emergency-blue border-2 border-white flex items-center justify-center text-xs text-white">A2</div>
                      <div className="absolute top-[60%] left-[40%] h-6 w-6 rounded-full bg-emergency-blue border-2 border-white flex items-center justify-center text-xs text-white">A3</div>
                      <div className="absolute top-[25%] left-[65%] h-6 w-6 rounded-full bg-emergency-red border-2 border-white flex items-center justify-center text-xs text-white">F1</div>
                    </div>
                    
                    {/* Controls overlay */}
                    <div className="absolute top-4 right-4 bg-emergency-dark/80 p-4 rounded-lg border border-emergency-purple/30">
                      <div className="text-sm text-white mb-2">Risk Level</div>
                      <div className="flex items-center space-x-1">
                        <div className="h-4 w-4 bg-emergency-blue/80 rounded-sm"></div>
                        <div className="h-4 w-4 bg-emergency-purple/80 rounded-sm"></div>
                        <div className="h-4 w-4 bg-emergency-yellow/80 rounded-sm"></div>
                        <div className="h-4 w-4 bg-emergency-red/80 rounded-sm"></div>
                      </div>
                      <div className="flex justify-between text-xs text-white/70 mt-1">
                        <span>Low</span>
                        <span>High</span>
                      </div>
                    </div>
                    
                    <div className="absolute bottom-4 left-4 bg-emergency-dark/80 p-3 rounded-lg border border-emergency-purple/30">
                      <div className="text-xs text-white/80">Last updated: Now</div>
                      <div className="text-xs text-emergency-purple">Forecasting: Next 30 minutes</div>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="resources" className="m-0">
                  <div className="h-[500px] relative">
                    <div className="absolute inset-0 bg-[url('https://i.imgur.com/WnOkzD6.jpg')] bg-center bg-cover opacity-70">
                      <div className="absolute inset-0 bg-gradient-to-t from-emergency-dark to-transparent"></div>
                    </div>
                    
                    {/* Resource overlays */}
                    <div className="absolute inset-0">
                      {/* Coverage zones */}
                      <div className="absolute top-[40%] left-[30%] h-32 w-32 rounded-full border-2 border-emergency-blue/40 border-dashed"></div>
                      <div className="absolute top-[45%] left-[55%] h-32 w-32 rounded-full border-2 border-emergency-blue/40 border-dashed"></div>
                      <div className="absolute top-[60%] left-[40%] h-32 w-32 rounded-full border-2 border-emergency-blue/40 border-dashed"></div>
                      <div className="absolute top-[25%] left-[65%] h-32 w-32 rounded-full border-2 border-emergency-red/40 border-dashed"></div>
                      
                      {/* Resource markers */}
                      <div className="absolute top-[40%] left-[30%] h-6 w-6 rounded-full bg-emergency-blue border-2 border-white flex items-center justify-center text-xs text-white">A1</div>
                      <div className="absolute top-[45%] left-[55%] h-6 w-6 rounded-full bg-emergency-blue border-2 border-white flex items-center justify-center text-xs text-white">A2</div>
                      <div className="absolute top-[60%] left-[40%] h-6 w-6 rounded-full bg-emergency-blue border-2 border-white flex items-center justify-center text-xs text-white">A3</div>
                      <div className="absolute top-[25%] left-[65%] h-6 w-6 rounded-full bg-emergency-red border-2 border-white flex items-center justify-center text-xs text-white">F1</div>
                      
                      {/* Recommended positions */}
                      <div className="absolute top-[15%] left-[45%] h-6 w-6 rounded-full border-2 border-emergency-yellow flex items-center justify-center">
                        <div className="h-4 w-4 rounded-full bg-emergency-yellow/40 animate-pulse"></div>
                      </div>
                      <div className="absolute top-[70%] left-[75%] h-6 w-6 rounded-full border-2 border-emergency-yellow flex items-center justify-center">
                        <div className="h-4 w-4 rounded-full bg-emergency-yellow/40 animate-pulse"></div>
                      </div>
                    </div>
                    
                    {/* Resource legend */}
                    <div className="absolute top-4 right-4 bg-emergency-dark/80 p-4 rounded-lg border border-emergency-purple/30">
                      <div className="text-sm text-white mb-2">Unit Types</div>
                      <div className="space-y-2 text-xs">
                        <div className="flex items-center">
                          <div className="h-4 w-4 rounded-full bg-emergency-blue mr-2"></div>
                          <span className="text-white/90">Ambulance (3)</span>
                        </div>
                        <div className="flex items-center">
                          <div className="h-4 w-4 rounded-full bg-emergency-red mr-2"></div>
                          <span className="text-white/90">Fire (1)</span>
                        </div>
                        <div className="flex items-center">
                          <div className="h-4 w-4 rounded-full border border-emergency-yellow mr-2"></div>
                          <span className="text-white/90">Recommended (2)</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="absolute bottom-4 left-4 bg-emergency-dark/80 p-3 rounded-lg border border-emergency-purple/30">
                      <div className="text-xs text-white/80">Available Units: 4/6</div>
                      <div className="text-xs text-emergency-purple">Coverage: 78% of target area</div>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="predictions" className="m-0">
                  <div className="h-[500px] relative">
                    <div className="absolute inset-0 bg-emergency-dark/90">
                      <div className="h-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
                        <div className="glass-card p-4">
                          <h4 className="text-white font-semibold text-sm mb-2">Emergency Call Volume Prediction</h4>
                          <div className="h-40 relative">
                            {/* Line chart mockup */}
                            <div className="absolute inset-0 flex items-end">
                              <div className="w-[8%] h-[20%] bg-emergency-purple/50 mx-[1px]"></div>
                              <div className="w-[8%] h-[35%] bg-emergency-purple/50 mx-[1px]"></div>
                              <div className="w-[8%] h-[30%] bg-emergency-purple/50 mx-[1px]"></div>
                              <div className="w-[8%] h-[45%] bg-emergency-purple/50 mx-[1px]"></div>
                              <div className="w-[8%] h-[60%] bg-emergency-purple/50 mx-[1px]"></div>
                              <div className="w-[8%] h-[80%] bg-emergency-purple/50 mx-[1px]"></div>
                              <div className="w-[8%] h-[75%] bg-emergency-red/60 mx-[1px]"></div>
                              <div className="w-[8%] h-[90%] bg-emergency-red/60 mx-[1px]"></div>
                              <div className="w-[8%] h-[65%] bg-emergency-yellow/60 mx-[1px]"></div>
                              <div className="w-[8%] h-[40%] bg-emergency-purple/50 mx-[1px]"></div>
                            </div>
                            
                            <div className="absolute inset-x-0 bottom-0 h-[1px] bg-white/20"></div>
                            
                            {/* Line overlay */}
                            <svg className="absolute inset-0" width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
                              <path 
                                d="M0,80 L10,65 L20,70 L30,55 L40,40 L50,20 L60,25 L70,10 L80,35 L90,60"
                                stroke="#9b87f5"
                                strokeWidth="2"
                                fill="none"
                              />
                            </svg>
                          </div>
                          <div className="flex justify-between text-xs text-white/50 mt-2">
                            <span>Now</span>
                            <span>+1hr</span>
                            <span>+2hr</span>
                            <span>+3hr</span>
                          </div>
                        </div>
                        
                        <div className="glass-card p-4">
                          <h4 className="text-white font-semibold text-sm mb-2">Response Time Forecast</h4>
                          <div className="h-40 relative">
                            {/* Area chart mockup */}
                            <div className="absolute inset-0">
                              <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                                <path 
                                  d="M0,50 C10,40 20,60 30,55 C40,50 50,30 60,35 C70,40 80,20 90,30 L90,100 L0,100 Z"
                                  fill="rgba(155, 135, 245, 0.2)"
                                  stroke="#9b87f5"
                                  strokeWidth="1"
                                />
                                
                                <path 
                                  d="M0,50 C10,40 20,60 30,55 C40,50 50,30 60,35 C70,40 80,20 90,30"
                                  fill="none"
                                  stroke="#9b87f5"
                                  strokeWidth="2"
                                />
                                
                                {/* Target line */}
                                <line x1="0" y1="40" x2="100" y2="40" stroke="#ff3b30" strokeWidth="1" strokeDasharray="2" />
                              </svg>
                            </div>
                            
                            <div className="absolute right-2 top-2 text-xs text-emergency-red bg-emergency-dark/50 px-2 py-1 rounded">
                              Target: 8 min
                            </div>
                          </div>
                          <div className="flex justify-between text-xs text-white/50 mt-2">
                            <span>Downtown</span>
                            <span>North</span>
                            <span>East</span>
                            <span>South</span>
                          </div>
                        </div>
                        
                        <div className="glass-card p-4">
                          <h4 className="text-white font-semibold text-sm mb-2">Resource Utilization</h4>
                          <div className="h-40 flex items-center justify-around">
                            {/* Circular progress indicators */}
                            <div className="relative h-24 w-24">
                              <svg className="w-full h-full" viewBox="0 0 36 36">
                                <path
                                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                  fill="none"
                                  stroke="#444"
                                  strokeWidth="2"
                                />
                                <path
                                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                  fill="none"
                                  stroke="#9b87f5"
                                  strokeWidth="2"
                                  strokeDasharray="75, 100"
                                />
                              </svg>
                              <div className="absolute inset-0 flex items-center justify-center text-xs text-white">75%</div>
                            </div>
                            
                            <div className="relative h-24 w-24">
                              <svg className="w-full h-full" viewBox="0 0 36 36">
                                <path
                                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                  fill="none"
                                  stroke="#444"
                                  strokeWidth="2"
                                />
                                <path
                                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                  fill="none"
                                  stroke="#ff3b30"
                                  strokeWidth="2"
                                  strokeDasharray="90, 100"
                                />
                              </svg>
                              <div className="absolute inset-0 flex items-center justify-center text-xs text-white">90%</div>
                            </div>
                          </div>
                          <div className="flex justify-around text-xs text-white/50 mt-2">
                            <span>Ambulances</span>
                            <span>Fire Units</span>
                          </div>
                        </div>
                        
                        <div className="glass-card p-4">
                          <h4 className="text-white font-semibold text-sm mb-2">Predicted Incident Types</h4>
                          <div className="h-40 relative">
                            {/* Pie chart mockup */}
                            <div className="absolute inset-0 flex items-center justify-center">
                              <div className="h-32 w-32 rounded-full overflow-hidden">
                                <div className="absolute h-32 w-32 rounded-full" style={{ 
                                  background: 'conic-gradient(#9b87f5 0% 35%, #ff3b30 35% 60%, #0078f2 60% 75%, #ffcc00 75% 100%)' 
                                }}></div>
                              </div>
                            </div>
                          </div>
                          <div className="grid grid-cols-2 gap-1 text-xs text-white/50 mt-2">
                            <div className="flex items-center">
                              <div className="h-2 w-2 bg-emergency-purple mr-1"></div>
                              <span>Medical (35%)</span>
                            </div>
                            <div className="flex items-center">
                              <div className="h-2 w-2 bg-emergency-red mr-1"></div>
                              <span>Traffic (25%)</span>
                            </div>
                            <div className="flex items-center">
                              <div className="h-2 w-2 bg-emergency-blue mr-1"></div>
                              <span>Fire (15%)</span>
                            </div>
                            <div className="flex items-center">
                              <div className="h-2 w-2 bg-emergency-yellow mr-1"></div>
                              <span>Other (25%)</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="glass-card p-4">
                          <h4 className="text-white font-semibold text-sm mb-2">High-Risk Time Periods</h4>
                          <div className="h-40 relative">
                            {/* Heat calendar mockup */}
                            <div className="absolute inset-0 grid grid-cols-7 gap-1 p-1">
                              {Array.from({ length: 21 }).map((_, index) => {
                                const intensity = Math.random();
                                let bgColor = 'bg-emergency-purple/20';
                                
                                if (intensity > 0.8) {
                                  bgColor = 'bg-emergency-red/70';
                                } else if (intensity > 0.6) {
                                  bgColor = 'bg-emergency-red/50';
                                } else if (intensity > 0.4) {
                                  bgColor = 'bg-emergency-yellow/50';
                                } else if (intensity > 0.2) {
                                  bgColor = 'bg-emergency-purple/40';
                                }
                                
                                return (
                                  <div 
                                    key={index} 
                                    className={`rounded-sm ${bgColor}`}
                                  ></div>
                                );
                              })}
                            </div>
                          </div>
                          <div className="flex justify-between text-xs text-white/50 mt-2">
                            <span>Mon</span>
                            <span>Tue</span>
                            <span>Wed</span>
                            <span>Thu</span>
                            <span>Fri</span>
                            <span>Sat</span>
                            <span>Sun</span>
                          </div>
                        </div>
                        
                        <div className="glass-card p-4">
                          <h4 className="text-white font-semibold text-sm mb-2">Simulation Results</h4>
                          <div className="h-40 relative flex items-center">
                            <div className="w-full">
                              <div className="relative h-8 w-full bg-black/30 rounded-sm mb-4 overflow-hidden">
                                <div className="h-full bg-emergency-purple/60" style={{ width: '62%' }}></div>
                                <div className="absolute inset-y-0 left-0 px-2 flex items-center text-xs text-white">Current Strategy: 62% efficiency</div>
                              </div>
                              
                              <div className="relative h-8 w-full bg-black/30 rounded-sm overflow-hidden">
                                <div className="h-full bg-emergency-blue/60" style={{ width: '84%' }}></div>
                                <div className="absolute inset-y-0 left-0 px-2 flex items-center text-xs text-white">Optimized Strategy: 84% efficiency</div>
                              </div>
                            </div>
                          </div>
                          <div className="flex justify-center text-xs text-emergency-blue mt-2">
                            <span>Potential 22% improvement in response effectiveness</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="alerts" className="m-0">
                  <div className="h-[500px] bg-emergency-dark/90 p-4 overflow-auto scrollbar-thin">
                    <div className="space-y-4">
                      <div className="glass-card p-4 border-l-4 border-l-emergency-red animate-pulse-emergency">
                        <div className="flex items-start justify-between">
                          <div>
                            <div className="flex items-center">
                              <span className="h-2 w-2 rounded-full bg-emergency-red mr-2"></span>
                              <h4 className="text-white font-semibold">Critical Alert</h4>
                            </div>
                            <p className="text-white/80 text-sm mt-1">
                              Predicted surge in downtown area. 5-8 additional calls expected within 30 minutes.
                            </p>
                            <div className="mt-2 text-xs text-emergency-red">
                              Recommended action: Deploy 2 additional ambulances to sector 3B
                            </div>
                          </div>
                          <div className="text-xs text-white/50">
                            2m ago
                          </div>
                        </div>
                        <div className="mt-2 flex justify-end space-x-2">
                          <Button variant="outline" size="sm" className="h-8 text-xs border-emergency-red/50 text-emergency-red hover:bg-emergency-red/10">
                            Dismiss
                          </Button>
                          <Button size="sm" className="h-8 text-xs bg-emergency-red hover:bg-emergency-red/90">
                            Take Action
                          </Button>
                        </div>
                      </div>
                      
                      <div className="glass-card p-4 border-l-4 border-l-emergency-yellow">
                        <div className="flex items-start justify-between">
                          <div>
                            <div className="flex items-center">
                              <span className="h-2 w-2 rounded-full bg-emergency-yellow mr-2"></span>
                              <h4 className="text-white font-semibold">Warning</h4>
                            </div>
                            <p className="text-white/80 text-sm mt-1">
                              Weather alert: Approaching thunderstorm may impact East side response times.
                            </p>
                            <div className="mt-2 text-xs text-emergency-yellow">
                              Recommended action: Reposition Unit E3 to central coverage area
                            </div>
                          </div>
                          <div className="text-xs text-white/50">
                            15m ago
                          </div>
                        </div>
                        <div className="mt-2 flex justify-end space-x-2">
                          <Button variant="outline" size="sm" className="h-8 text-xs border-emergency-yellow/50 text-emergency-yellow hover:bg-emergency-yellow/10">
                            Dismiss
                          </Button>
                          <Button size="sm" className="h-8 text-xs bg-emergency-yellow text-black hover:bg-emergency-yellow/90">
                            Review
                          </Button>
                        </div>
                      </div>
                      
                      <div className="glass-card p-4 border-l-4 border-l-emergency-purple">
                        <div className="flex items-start justify-between">
                          <div>
                            <div className="flex items-center">
                              <span className="h-2 w-2 rounded-full bg-emergency-purple mr-2"></span>
                              <h4 className="text-white font-semibold">Information</h4>
                            </div>
                            <p className="text-white/80 text-sm mt-1">
                              Scheduled event: Football game at City Stadium starting at 7:00 PM.
                            </p>
                            <div className="mt-2 text-xs text-emergency-purple">
                              Recommended action: Pre-position standby unit near stadium entrance
                            </div>
                          </div>
                          <div className="text-xs text-white/50">
                            1h ago
                          </div>
                        </div>
                        <div className="mt-2 flex justify-end space-x-2">
                          <Button variant="outline" size="sm" className="h-8 text-xs border-emergency-purple/50 text-emergency-purple hover:bg-emergency-purple/10">
                            Dismiss
                          </Button>
                        </div>
                      </div>
                      
                      <div className="glass-card p-4 border-l-4 border-l-emergency-blue">
                        <div className="flex items-start justify-between">
                          <div>
                            <div className="flex items-center">
                              <span className="h-2 w-2 rounded-full bg-emergency-blue mr-2"></span>
                              <h4 className="text-white font-semibold">System Update</h4>
                            </div>
                            <p className="text-white/80 text-sm mt-1">
                              AI model updated with new traffic pattern data for improved predictions.
                            </p>
                          </div>
                          <div className="text-xs text-white/50">
                            3h ago
                          </div>
                        </div>
                        <div className="mt-2 flex justify-end space-x-2">
                          <Button variant="outline" size="sm" className="h-8 text-xs border-emergency-blue/50 text-emergency-blue hover:bg-emergency-blue/10">
                            Dismiss
                          </Button>
                          <Button size="sm" className="h-8 text-xs bg-emergency-blue hover:bg-emergency-blue/90">
                            Details
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </Card>
          
          <div className="mt-8 text-center">
            <Button onClick={handleDemoClick} className="bg-emergency-purple hover:bg-emergency-purple/90 text-white px-6 py-6 text-lg">
              Request Full Demo Access
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DashboardSection;
