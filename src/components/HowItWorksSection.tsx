
import React, { useEffect, useRef } from 'react';
import { Badge } from '@/components/ui/badge';
import { useInView } from 'react-intersection-observer';

const HowItWorksSection: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  });
  
  useEffect(() => {
    if (!inView) return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;
    
    // Data flow animation
    const nodeRadius = 6;
    const dataPackets: { x: number; y: number; size: number; targetIdx: number; progress: number; speed: number; color: string }[] = [];
    
    const nodes = [
      { x: canvas.width * 0.2, y: canvas.height * 0.2, label: 'Historical Data' },
      { x: canvas.width * 0.2, y: canvas.height * 0.5, label: 'Real-time Feeds' },
      { x: canvas.width * 0.2, y: canvas.height * 0.8, label: 'External APIs' },
      { x: canvas.width * 0.5, y: canvas.height * 0.5, label: 'AI Processing' },
      { x: canvas.width * 0.8, y: canvas.height * 0.2, label: 'Deployment Maps' },
      { x: canvas.width * 0.8, y: canvas.height * 0.5, label: 'Risk Analysis' },
      { x: canvas.width * 0.8, y: canvas.height * 0.8, label: 'Alert System' }
    ];
    
    const connections = [
      { from: 0, to: 3 },
      { from: 1, to: 3 },
      { from: 2, to: 3 },
      { from: 3, to: 4 },
      { from: 3, to: 5 },
      { from: 3, to: 6 }
    ];
    
    const addDataPacket = () => {
      const sourceIndices = [0, 1, 2]; // Historical, Real-time, External
      const sourceIdx = sourceIndices[Math.floor(Math.random() * sourceIndices.length)];
      const sourceNode = nodes[sourceIdx];
      
      let color;
      switch (sourceIdx) {
        case 0:
          color = 'rgba(155, 135, 245, 0.8)'; // Purple for historical
          break;
        case 1:
          color = 'rgba(255, 59, 48, 0.8)'; // Red for real-time
          break;
        case 2:
          color = 'rgba(0, 120, 242, 0.8)'; // Blue for external
          break;
        default:
          color = 'rgba(255, 255, 255, 0.8)';
      }
      
      dataPackets.push({
        x: sourceNode.x,
        y: sourceNode.y,
        size: 3 + Math.random() * 2,
        targetIdx: 3, // AI Processing
        progress: 0,
        speed: 0.005 + Math.random() * 0.01,
        color
      });
    };
    
    const addOutputDataPacket = () => {
      const targetIndices = [4, 5, 6]; // Maps, Analysis, Alerts
      const targetIdx = targetIndices[Math.floor(Math.random() * targetIndices.length)];
      const processingNode = nodes[3];
      
      let color;
      switch (targetIdx) {
        case 4:
          color = 'rgba(255, 204, 0, 0.8)'; // Yellow for maps
          break;
        case 5:
          color = 'rgba(52, 199, 89, 0.8)'; // Green for analysis
          break;
        case 6:
          color = 'rgba(255, 69, 58, 0.8)'; // Bright red for alerts
          break;
        default:
          color = 'rgba(255, 255, 255, 0.8)';
      }
      
      dataPackets.push({
        x: processingNode.x,
        y: processingNode.y,
        size: 3 + Math.random() * 2,
        targetIdx,
        progress: 0,
        speed: 0.005 + Math.random() * 0.01,
        color
      });
    };
    
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw connections
      for (const connection of connections) {
        const fromNode = nodes[connection.from];
        const toNode = nodes[connection.to];
        
        ctx.beginPath();
        ctx.moveTo(fromNode.x, fromNode.y);
        ctx.lineTo(toNode.x, toNode.y);
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
        ctx.lineWidth = 1;
        ctx.stroke();
      }
      
      // Draw nodes
      for (const node of nodes) {
        // Draw node background
        ctx.beginPath();
        ctx.arc(node.x, node.y, nodeRadius, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
        ctx.fill();
        
        // Draw node border
        ctx.beginPath();
        ctx.arc(node.x, node.y, nodeRadius, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)';
        ctx.lineWidth = 1;
        ctx.stroke();
        
        // Draw label
        ctx.font = '10px Arial';
        ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(node.label, node.x, node.y + 20);
      }
      
      // Draw and update data packets
      for (let i = dataPackets.length - 1; i >= 0; i--) {
        const packet = dataPackets[i];
        const fromNode = packet.targetIdx === 3 ? 
          nodes[connections.find(c => c.to === packet.targetIdx)?.from || 0] : 
          nodes[3]; // AI Processing
        const toNode = nodes[packet.targetIdx];
        
        // Calculate position along the path
        const x = fromNode.x + (toNode.x - fromNode.x) * packet.progress;
        const y = fromNode.y + (toNode.y - fromNode.y) * packet.progress;
        
        // Draw packet
        ctx.beginPath();
        ctx.arc(x, y, packet.size, 0, Math.PI * 2);
        ctx.fillStyle = packet.color;
        ctx.fill();
        
        // Update progress
        packet.progress += packet.speed;
        
        // Remove packet if it reached the target
        if (packet.progress >= 1) {
          dataPackets.splice(i, 1);
          
          // If packet reached AI Processing, generate output packets
          if (packet.targetIdx === 3 && Math.random() > 0.5) {
            addOutputDataPacket();
          }
        }
      }
      
      // Randomly add new data packets
      if (Math.random() < 0.05 && dataPackets.length < 20) {
        addDataPacket();
      }
      
      requestAnimationFrame(animate);
    };
    
    animate();
    
    // Add initial data packets
    for (let i = 0; i < 5; i++) {
      addDataPacket();
    }
    
    const handleResize = () => {
      if (!canvas) return;
      canvas.width = canvas.clientWidth;
      canvas.height = canvas.clientHeight;
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [inView]);

  return (
    <section id="how-it-works" ref={ref} className="py-20 relative bg-emergency-dark">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4 px-4 py-1 text-emergency-purple border-emergency-purple">
            Process Flow
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            How It Works
          </h2>
          <p className="text-white/80 max-w-2xl mx-auto">
            PredixSafe transforms emergency response through a three-stage process of data ingestion, 
            intelligent analysis, and strategic action.
          </p>
        </div>
        
        <div className="flex flex-col md:flex-row gap-8 items-stretch">
          <div className="w-full md:w-1/2">
            <div className="h-[400px] relative">
              <canvas ref={canvasRef} className="absolute inset-0 w-full h-full glass-card"></canvas>
            </div>
          </div>
          
          <div className="w-full md:w-1/2 space-y-12">
            <div className={`transition-all duration-500 ${inView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
              <div className="flex items-start">
                <div className="flex-shrink-0 h-14 w-14 rounded-full bg-emergency-purple/20 flex items-center justify-center mr-4 mt-1">
                  <span className="text-emergency-purple font-bold text-xl">1</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">Ingest</h3>
                  <p className="text-white/70">
                    PredixSafe continuously collects data from multiple sources: historical emergency records, 
                    real-time vehicle locations, weather services, traffic conditions, event calendars, 
                    and social media monitoring.
                  </p>
                </div>
              </div>
            </div>
            
            <div className={`transition-all duration-500 ${inView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`} style={{ transitionDelay: '200ms' }}>
              <div className="flex items-start">
                <div className="flex-shrink-0 h-14 w-14 rounded-full bg-emergency-red/20 flex items-center justify-center mr-4 mt-1">
                  <span className="text-emergency-red font-bold text-xl">2</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">Analyze</h3>
                  <p className="text-white/70">
                    Advanced machine learning algorithms process this information to identify patterns and 
                    anomalies. Temporal and spatial models predict emergency demand with street-level precision, 
                    while simulation engines test deployment strategies.
                  </p>
                </div>
              </div>
            </div>
            
            <div className={`transition-all duration-500 ${inView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`} style={{ transitionDelay: '400ms' }}>
              <div className="flex items-start">
                <div className="flex-shrink-0 h-14 w-14 rounded-full bg-emergency-blue/20 flex items-center justify-center mr-4 mt-1">
                  <span className="text-emergency-blue font-bold text-xl">3</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">Act</h3>
                  <p className="text-white/70">
                    PredixSafe delivers actionable insights through intuitive interfaces: real-time heatmaps showing 
                    risk areas, optimal vehicle positioning recommendations, and early warning alerts. These enable 
                    commanders to make data-driven decisions that save lives.
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

export default HowItWorksSection;
