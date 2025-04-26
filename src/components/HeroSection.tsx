
import React, { useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';

const HeroSection: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const gridLines: { x: number; y: number; color: string; width: number }[] = [];
    const hotspots: { x: number; y: number; radius: number; maxRadius: number; growSpeed: number; color: string }[] = [];
    
    // Create grid lines
    const gridSize = 40;
    for (let x = 0; x < canvas.width + 100; x += gridSize) {
      gridLines.push({
        x,
        y: 0,
        color: 'rgba(155, 135, 245, 0.2)',
        width: Math.random() > 0.95 ? 1.5 : 0.5
      });
    }
    
    for (let y = 0; y < canvas.height + 100; y += gridSize) {
      gridLines.push({
        x: 0,
        y,
        color: 'rgba(155, 135, 245, 0.2)',
        width: Math.random() > 0.95 ? 1.5 : 0.5
      });
    }
    
    // Create emergency hotspots
    const numHotspots = 8;
    for (let i = 0; i < numHotspots; i++) {
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height;
      const radius = Math.random() * 5 + 2;
      const maxRadius = Math.random() * 25 + 20;
      const growSpeed = Math.random() * 0.05 + 0.02;
      
      let color;
      const colorRand = Math.random();
      if (colorRand < 0.5) {
        color = 'rgba(255, 59, 48, 0.7)'; // Emergency red
      } else if (colorRand < 0.8) {
        color = 'rgba(0, 120, 242, 0.7)'; // Emergency blue
      } else {
        color = 'rgba(255, 204, 0, 0.7)'; // Emergency yellow
      }
      
      hotspots.push({
        x,
        y,
        radius,
        maxRadius,
        growSpeed,
        color
      });
    }
    
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw grid lines
      for (const line of gridLines) {
        ctx.beginPath();
        ctx.strokeStyle = line.color;
        ctx.lineWidth = line.width;
        
        if (line.x === 0) {
          ctx.moveTo(0, line.y);
          ctx.lineTo(canvas.width, line.y);
        } else {
          ctx.moveTo(line.x, 0);
          ctx.lineTo(line.x, canvas.height);
        }
        
        ctx.stroke();
      }
      
      // Draw and update hotspots
      for (const hotspot of hotspots) {
        // Pulse effect
        ctx.beginPath();
        ctx.arc(hotspot.x, hotspot.y, hotspot.radius, 0, Math.PI * 2);
        ctx.fillStyle = hotspot.color;
        ctx.fill();
        
        // Outer glow
        const gradient = ctx.createRadialGradient(
          hotspot.x, hotspot.y, hotspot.radius * 0.5,
          hotspot.x, hotspot.y, hotspot.radius * 3
        );
        gradient.addColorStop(0, hotspot.color.replace('0.7', '0.5'));
        gradient.addColorStop(1, hotspot.color.replace('0.7', '0'));
        
        ctx.beginPath();
        ctx.arc(hotspot.x, hotspot.y, hotspot.radius * 3, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();
        
        // Update radius for pulsing effect
        hotspot.radius += hotspot.growSpeed;
        if (hotspot.radius > hotspot.maxRadius) {
          hotspot.radius = 2;
        }
      }
      
      requestAnimationFrame(animate);
    };
    
    animate();
    
    const handleResize = () => {
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const scrollToDemo = () => {
    const demoSection = document.getElementById('dashboard');
    if (demoSection) {
      demoSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToFeatures = () => {
    const featuresSection = document.getElementById('features');
    if (featuresSection) {
      featuresSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center overflow-hidden">
      <canvas ref={canvasRef} className="absolute inset-0 z-0" />
      <div className="absolute inset-0 bg-gradient-to-b from-background/10 via-background/60 to-background z-10" />
      
      <div className="container mx-auto px-4 z-20">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold emergency-glow mb-4 animate-fade-in-up">
            <span className="text-gradient">Predict. Prepare. Protect.</span>
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-8 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            AI-powered platform for emergency services to anticipate, analyze, and act in real-time.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            <Button onClick={scrollToDemo} className="bg-emergency-red hover:bg-emergency-red/80 text-white px-8 py-6 text-lg">
              Try Live Demo
            </Button>
            <Button onClick={scrollToFeatures} variant="outline" className="border-emergency-purple text-emergency-purple hover:bg-emergency-purple/10 px-8 py-6 text-lg">
              Explore Features
            </Button>
          </div>
          
          <div className="mt-16 flex justify-center animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
            <div className="p-1 rounded-full bg-white/10 hover:bg-white/20 cursor-pointer transition-colors duration-300">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="32" 
                height="32" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
                className="animate-bounce text-white"
              >
                <path d="M12 5v14M19 12l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
