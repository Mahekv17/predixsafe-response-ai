
import React, { useRef, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Sky, useTexture, Text } from '@react-three/drei';
import * as THREE from 'three';

// Simple building component
const Building = ({ position, size, color }: { position: [number, number, number]; size: [number, number, number]; color: string }) => {
  return (
    <mesh position={position}>
      <boxGeometry args={size} />
      <meshLambertMaterial color={color} />
    </mesh>
  );
};

// Emergency vehicle with animation
const EmergencyVehicle = ({ 
  position, 
  destination, 
  vehicleType 
}: { 
  position: [number, number, number]; 
  destination: [number, number, number];
  vehicleType: 'ambulance' | 'firetruck'
}) => {
  const vehicleRef = useRef<THREE.Mesh>(null);
  
  // Get colors based on vehicle type
  const color = vehicleType === 'ambulance' ? '#0078f2' : '#ff3b30';
  
  // Animation logic
  useFrame(() => {
    if (!vehicleRef.current) return;
    
    // Move towards destination with simple animation
    const speed = 0.04;
    vehicleRef.current.position.x += (destination[0] - vehicleRef.current.position.x) * speed;
    vehicleRef.current.position.z += (destination[2] - vehicleRef.current.position.z) * speed;
    
    // Rotate vehicle in the direction of movement
    if (Math.abs(destination[0] - vehicleRef.current.position.x) > 0.01) {
      const angle = Math.atan2(
        destination[0] - vehicleRef.current.position.x,
        destination[2] - vehicleRef.current.position.z
      );
      vehicleRef.current.rotation.y = angle;
    }
  });

  return (
    <group>
      {/* Vehicle body */}
      <mesh ref={vehicleRef} position={position}>
        <boxGeometry args={[0.5, 0.3, 1]} />
        <meshLambertMaterial color={color} />
        
        {/* Vehicle top */}
        <mesh position={[0, 0.25, -0.2]}>
          <boxGeometry args={[0.4, 0.2, 0.5]} />
          <meshLambertMaterial color={color} />
        </mesh>
        
        {/* Light bar */}
        <mesh position={[0, 0.45, -0.2]}>
          <boxGeometry args={[0.45, 0.1, 0.2]} />
          <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={1} />
        </mesh>
      </mesh>
    </group>
  );
};

// Emergency hotspot with animation
const EmergencyHotspot = ({ position }: { position: [number, number, number] }) => {
  const [intensity, setIntensity] = useState(0.5);
  
  // Pulsing animation
  useFrame(() => {
    setIntensity(0.5 + Math.sin(Date.now() * 0.005) * 0.5);
  });
  
  return (
    <mesh position={[position[0], position[1] + 0.05, position[2]]}>
      <cylinderGeometry args={[1.5, 1.5, 0.1, 32]} />
      <meshStandardMaterial 
        color="#ff3b30" 
        transparent={true} 
        opacity={0.3 + intensity * 0.2} 
        emissive="#ff3b30"
        emissiveIntensity={intensity}
      />
    </mesh>
  );
};

// Grid helper for ground
const GridFloor = () => {
  return (
    <group>
      <gridHelper args={[100, 100]} />
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]}>
        <planeGeometry args={[100, 100]} />
        <meshStandardMaterial color="#222222" transparent opacity={0.6} />
      </mesh>
    </group>
  );
};

// Road network
const Roads = () => {
  return (
    <group>
      {/* Main roads */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
        <planeGeometry args={[1, 30]} />
        <meshStandardMaterial color="#444444" />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
        <planeGeometry args={[30, 1]} />
        <meshStandardMaterial color="#444444" />
      </mesh>
      {/* Secondary roads */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[5, 0, 0]}>
        <planeGeometry args={[0.7, 30]} />
        <meshStandardMaterial color="#444444" />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[-5, 0, 0]}>
        <planeGeometry args={[0.7, 30]} />
        <meshStandardMaterial color="#444444" />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 5]}>
        <planeGeometry args={[30, 0.7]} />
        <meshStandardMaterial color="#444444" />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, -5]}>
        <planeGeometry args={[30, 0.7]} />
        <meshStandardMaterial color="#444444" />
      </mesh>
    </group>
  );
};

// City blocks with buildings
const CityBlocks = () => {
  // Define different building types and positions
  const buildings = [
    // Downtown area
    { position: [3, 1, 3], size: [1, 2, 1], color: "#556677" },
    { position: [3, 1.5, 1], size: [1, 3, 1], color: "#445566" },
    { position: [1, 0.75, 3], size: [1, 1.5, 1], color: "#667788" },
    { position: [4, 2, 4], size: [1, 4, 1], color: "#334455" },
    { position: [2, 1.25, 2], size: [1, 2.5, 1], color: "#445566" },
    { position: [6, 0.5, 6], size: [1, 1, 1], color: "#556677" },
    { position: [-2, 0.75, 2], size: [1, 1.5, 1], color: "#445566" },
    { position: [-3, 1, -3], size: [1, 2, 1], color: "#556677" },
    { position: [4, 1, -2], size: [1, 2, 1], color: "#334455" },
    { position: [-4, 0.5, 4], size: [1, 1, 1], color: "#667788" },
    { position: [-2, 1.25, -4], size: [1, 2.5, 1], color: "#556677" },
    { position: [-6, 0.5, -6], size: [1, 1, 1], color: "#445566" },
    
    // Skyscrapers
    { position: [-2, 3, -2], size: [1.5, 6, 1.5], color: "#99AABB" },
    { position: [2, 2.5, -3], size: [1, 5, 1], color: "#8899AA" },
    { position: [-3, 3, 1], size: [1, 6, 1], color: "#7788AA" },
    
    // Residential areas
    { position: [7, 0.35, 2], size: [0.8, 0.7, 0.8], color: "#AABBCC" },
    { position: [7, 0.35, 4], size: [0.8, 0.7, 0.8], color: "#BBCCDD" },
    { position: [9, 0.35, 3], size: [0.8, 0.7, 0.8], color: "#AABBCC" },
    { position: [-7, 0.35, -3], size: [0.8, 0.7, 0.8], color: "#BBCCDD" },
    { position: [-9, 0.35, -5], size: [0.8, 0.7, 0.8], color: "#AABBCC" },
    { position: [-8, 0.35, -1], size: [0.8, 0.7, 0.8], color: "#BBCCDD" },
  ];

  return (
    <group>
      {buildings.map((building, index) => (
        <Building 
          key={index} 
          position={building.position as [number, number, number]} 
          size={building.size as [number, number, number]} 
          color={building.color} 
        />
      ))}
    </group>
  );
};

// Main city scene component
const CityScene = () => {
  const { camera } = useThree();
  
  // Set initial camera position
  React.useEffect(() => {
    camera.position.set(15, 10, 15);
    camera.lookAt(0, 0, 0);
  }, [camera]);
  
  // Emergency vehicles with destinations (towards emergency hotspots)
  const emergencyVehicles = [
    { position: [-10, 0.2, -5], destination: [-2, 0.2, 3], type: 'ambulance' as const },
    { position: [10, 0.2, 5], destination: [4, 0.2, -2], type: 'firetruck' as const },
    { position: [-7, 0.2, 8], destination: [-2, 0.2, -4], type: 'ambulance' as const },
    { position: [8, 0.2, -9], destination: [6, 0.2, 6], type: 'firetruck' as const },
  ];
  
  // Emergency hotspots
  const hotspots = [
    [-2, 0, 3],
    [4, 0, -2],
    [-2, 0, -4],
    [6, 0, 6],
  ] as [number, number, number][];
  
  return (
    <>
      {/* Environment */}
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} castShadow />
      <Sky sunPosition={[100, 10, 100]} />
      <OrbitControls 
        enablePan={true}
        enableZoom={true}
        enableRotate={true}
        minDistance={3}
        maxDistance={30}
      />
      
      {/* City elements */}
      <GridFloor />
      <Roads />
      <CityBlocks />
      
      {/* Emergency elements */}
      {hotspots.map((position, index) => (
        <EmergencyHotspot key={index} position={position} />
      ))}
      
      {emergencyVehicles.map((vehicle, index) => (
        <EmergencyVehicle 
          key={index} 
          position={vehicle.position as [number, number, number]} 
          destination={vehicle.destination as [number, number, number]}
          vehicleType={vehicle.type}
        />
      ))}
      
      {/* Instruction text */}
      <Text
        position={[0, 10, 0]}
        color="white"
        fontSize={0.5}
        maxWidth={10}
        lineHeight={1}
        letterSpacing={0.02}
        textAlign="center"
      >
        Click and drag to rotate. Scroll to zoom.
      </Text>
    </>
  );
};

// Main component exported for use in the dashboard
const CitySimulation: React.FC = () => {
  return (
    <div className="h-[500px] relative">
      <Canvas shadows>
        <CityScene />
      </Canvas>
      
      {/* Overlay UI elements */}
      <div className="absolute top-4 right-4 bg-emergency-dark/80 p-4 rounded-lg border border-emergency-purple/30">
        <div className="text-sm text-white mb-2">Emergency Units</div>
        <div className="space-y-2 text-xs">
          <div className="flex items-center">
            <div className="h-4 w-4 rounded-full bg-emergency-blue mr-2"></div>
            <span className="text-white/90">Ambulances (2)</span>
          </div>
          <div className="flex items-center">
            <div className="h-4 w-4 rounded-full bg-emergency-red mr-2"></div>
            <span className="text-white/90">Fire Trucks (2)</span>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-4 left-4 bg-emergency-dark/80 p-3 rounded-lg border border-emergency-purple/30">
        <div className="text-xs text-white/80">Interactive 3D Simulation</div>
        <div className="text-xs text-emergency-purple">Response Time: Optimizing</div>
      </div>
    </div>
  );
};

export default CitySimulation;
