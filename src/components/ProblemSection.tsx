
import React, { useEffect, useRef } from 'react';
import { useInView } from 'react-intersection-observer';

const ProblemSection: React.FC = () => {
  const { ref, inView } = useInView({
    threshold: 0.2,
    triggerOnce: true
  });

  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    if (!inView) return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;
    
    // Simulate 911 calls and delayed response times
    const emergencyCalls = [];
    const ambulances = [
      { x: canvas.width * 0.2, y: canvas.height * 0.8, speed: 0.8 },
      { x: canvas.width * 0.8, y: canvas.height * 0.7, speed: 1 }
    ];
    
    let callCountThisMinute = 0;
    const MAX_CALLS_PER_MINUTE = 3;
    let lastCallTime = 0;
    
    const addNewCall = (time: number) => {
      if (time - lastCallTime > 1000 && callCountThisMinute < MAX_CALLS_PER_MINUTE) {
        const x = Math.random() * (canvas.width * 0.8) + (canvas.width * 0.1);
        const y = Math.random() * (canvas.height * 0.6) + (canvas.height * 0.1);
        
        emergencyCalls.push({
          x,
          y,
          time: time,
          responded: false,
          alpha: 1,
          pulseSize: 0,
          maxPulseSize: 30 + Math.random() * 20
        });
        
        lastCallTime = time;
        callCountThisMinute++;
        
        // Reset call count every minute
        setTimeout(() => {
          callCountThisMinute--;
        }, 60000);
      }
    };
    
    const animate = (time: number) => {
      if (!ctx) return;
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Occasionally add new emergency calls
      if (Math.random() < 0.05) {
        addNewCall(time);
      }
      
      // Draw city grid (simplified)
      ctx.strokeStyle = 'rgba(255,255,255,0.1)';
      ctx.lineWidth = 1;
      
      // Horizontal streets
      for (let y = 0; y < canvas.height; y += 30) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }
      
      // Vertical streets
      for (let x = 0; x < canvas.width; x += 30) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      
      // Draw emergency calls
      for (let i = 0; i < emergencyCalls.length; i++) {
        const call = emergencyCalls[i];
        
        if (call.alpha <= 0) continue;
        
        // Draw emergency pulse
        ctx.beginPath();
        ctx.arc(call.x, call.y, call.pulseSize, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 59, 48, ${0.7 * (1 - call.pulseSize / call.maxPulseSize)})`;
        ctx.fill();
        
        // Draw call indicator
        ctx.beginPath();
        ctx.arc(call.x, call.y, 6, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 59, 48, ${call.alpha})`;
        ctx.fill();
        
        ctx.font = '10px Arial';
        ctx.fillStyle = `rgba(255, 255, 255, ${call.alpha})`;
        ctx.textAlign = 'center';
        ctx.fillText('911', call.x, call.y + 3);
        
        // Update pulse
        call.pulseSize += 0.5;
        if (call.pulseSize > call.maxPulseSize) {
          call.pulseSize = 0;
        }
        
        // Check if ambulance has responded
        if (!call.responded) {
          // Find closest ambulance
          let minDist = Infinity;
          let closestAmbulance = null;
          
          for (const ambulance of ambulances) {
            const dx = call.x - ambulance.x;
            const dy = call.y - ambulance.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            
            if (dist < minDist) {
              minDist = dist;
              closestAmbulance = ambulance;
            }
          }
          
          // Move closest ambulance towards the call
          if (closestAmbulance) {
            const dx = call.x - closestAmbulance.x;
            const dy = call.y - closestAmbulance.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            
            if (dist > 5) {
              closestAmbulance.x += (dx / dist) * closestAmbulance.speed;
              closestAmbulance.y += (dy / dist) * closestAmbulance.speed;
            } else {
              call.responded = true;
              
              // Fade out the call
              setTimeout(() => {
                const fadeInterval = setInterval(() => {
                  call.alpha -= 0.05;
                  if (call.alpha <= 0) {
                    clearInterval(fadeInterval);
                  }
                }, 100);
              }, 1000);
            }
          }
        }
      }
      
      // Draw ambulances
      for (const ambulance of ambulances) {
        ctx.beginPath();
        ctx.arc(ambulance.x, ambulance.y, 8, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(0, 120, 242, 0.8)';
        ctx.fill();
        
        ctx.font = '10px Arial';
        ctx.fillStyle = 'white';
        ctx.textAlign = 'center';
        ctx.fillText('🚑', ambulance.x, ambulance.y + 3);
        
        // Draw ambulance coverage radius
        ctx.beginPath();
        ctx.arc(ambulance.x, ambulance.y, 50, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(0, 120, 242, 0.3)';
        ctx.stroke();
      }
      
      requestAnimationFrame(animate);
    };
    
    const animationId = requestAnimationFrame(animate);
    
    const handleResize = () => {
      if (!canvas) return;
      canvas.width = canvas.clientWidth;
      canvas.height = canvas.clientHeight;
    };
    
    window.addEventListener('resize', handleResize);
    
    // Add initial emergencies
    for (let i = 0; i < 5; i++) {
      addNewCall(0);
    }
    
    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationId);
    };
  }, [inView]);

  return (
    <section id="problem" className="py-20 bg-emergency-dark relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-8">
          <div ref={ref} className="w-full lg:w-1/2 order-2 lg:order-1">
            <div className="relative h-[400px]">
              <canvas ref={canvasRef} className="w-full h-full rounded-lg glass-card"></canvas>
              <div className="absolute bottom-4 left-4 bg-emergency-dark/80 px-4 py-2 rounded text-xs text-white/80">
                Real-time emergency simulation: Notice the delays when ambulances are poorly positioned.
              </div>
            </div>
          </div>
          
          <div className="w-full lg:w-1/2 order-1 lg:order-2">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              <span className="text-emergency-red">Why It Matters</span>
            </h2>
            
            <div className="space-y-8">
              <div className="flex items-start">
                <div className="mt-1 mr-4 flex-shrink-0 h-10 w-10 rounded-full bg-emergency-red/20 flex items-center justify-center">
                  <span className="text-emergency-red">01</span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-white">Reactive Approach Costs Lives</h3>
                  <p className="text-white/80">
                    Traditional emergency response is reactive—waiting for calls before dispatching units. Every minute delay in cardiac arrest response decreases survival chance by 7-10%.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="mt-1 mr-4 flex-shrink-0 h-10 w-10 rounded-full bg-emergency-yellow/20 flex items-center justify-center">
                  <span className="text-emergency-yellow">02</span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-white">Poor Resource Positioning</h3>
                  <p className="text-white/80">
                    Emergency vehicles positioned inefficiently create coverage gaps and extended response times. Urban environments require strategic planning that adapts to changing conditions.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="mt-1 mr-4 flex-shrink-0 h-10 w-10 rounded-full bg-emergency-blue/20 flex items-center justify-center">
                  <span className="text-emergency-blue">03</span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-white">Increasing Call Volume</h3>
                  <p className="text-white/80">
                    Call volumes grow yearly while resources remain limited. Dispatch centers struggle with surge demands during special events, weather emergencies, and public gatherings.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProblemSection;
