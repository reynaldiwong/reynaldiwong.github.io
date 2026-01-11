import { useEffect, useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import WaterBackground from './WaterBackground';

// Detailed 8-bit Koi Fish SVG Component
const PixelKoi = ({ color = "#f2a65e", secondaryColor = "#ffffff", delay = 0, duration = 20 }) => {
  
  // Generate random path parameters
  const pathParams = useMemo(() => {
    const baseY = Math.random() * 80 + 10; // Start height (10-90vh)
    const amplitude = 15 + Math.random() * 15; // Wave height
    const frequency = 2 + Math.floor(Math.random() * 2); // Number of waves
    
    // Generate keyframes for smooth sine wave motion
    const steps = 20;
    const yValues = [];
    const rotateValues = [];
    const tailRotateValues = [];
    
    for (let i = 0; i <= steps; i++) {
      const progress = i / steps;
      const angleRad = progress * Math.PI * 2 * frequency;
      
      // Sinusoidal Y movement
      const y = baseY + Math.sin(angleRad) * amplitude;
      yValues.push(`${y}vh`);
      
      // Calculate rotation based on path tangent
      // x moves 140vw (-20 to 120)
      const dx = 140; 
      // derivative of y = A * sin(wt) is A * w * cos(wt)
      const dy = amplitude * (Math.PI * 2 * frequency) * Math.cos(angleRad);
      
      // Calculate angle: atan2(dy, dx). 
      // Adjusting for aspect ratio (assuming 16:9 desktop standard approx 1.77)
      // to make the rotation visually accurate.
      const aspectRatio = 1.77; 
      const angle = Math.atan2(dy, dx * aspectRatio) * (180 / Math.PI);
      
      rotateValues.push(angle);
      
      // Tail bends slightly more to simulate swimming motion
      // We add a small wave to the tail rotation relative to the body
      const tailWag = Math.cos(angleRad * 2) * 10; 
      tailRotateValues.push(tailWag);
    }
    
    return { yValues, rotateValues, tailRotateValues };
  }, []);

  return (
    <motion.div
      initial={{ x: "-20vw", y: pathParams.yValues[0], opacity: 0, scale: 0.5 + Math.random() * 0.5 }}
      animate={{ 
        x: ["-20vw", "120vw"],
        y: pathParams.yValues,
        rotate: pathParams.rotateValues,
        opacity: [0, 1, 1, 0]
      }}
      transition={{ 
        duration: duration, 
        delay: delay,
        repeat: Infinity,
        ease: "linear",
        opacity: { 
          duration: duration, 
          times: [0, 0.1, 0.9, 1],
          repeat: Infinity,
          delay: delay,
          ease: "linear"
        }
      }}
      className="absolute pointer-events-none z-0 w-40 h-40"
      style={{ imageRendering: 'pixelated' }}
    >
      {/* 
        Detailed 64x32 Pixel Art Koi 
        Head is facing RIGHT to match movement direction 
      */}
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 160" className="w-40 h-40">
        <g transform="scale(8)">
          {/* Body Group */}
          <g>
            <rect width="1" height="1" x="4" y="9" fill="hsla(16, 100%, 50%, 1.00)" />
            <rect width="1" height="1" x="4" y="10" fill="hsl(0, 0%, 100%)" />
            <rect width="1" height="1" x="5" y="8" fill="hsl(0, 0%, 100%)" />
            <rect width="1" height="1" x="5" y="9" fill="hsla(20, 100%, 50%, 1.00)" />
            <rect width="1" height="1" x="5" y="10" fill="hsla(16, 100%, 50%, 1.00)" />
            <rect width="1" height="1" x="5" y="11" fill="hsl(0, 0%, 100%)" />
            <rect width="1" height="1" x="6" y="8" fill="hsl(0, 0%, 100%)" />
            <rect width="1" height="1" x="6" y="9" fill="hsla(16, 100%, 50%, 1.00)" />
            <rect width="1" height="1" x="6" y="10" fill="hsla(20, 100%, 50%, 1.00)" />
            <rect width="1" height="1" x="6" y="11" fill="hsl(0, 0%, 100%)" />
            <rect width="1" height="1" x="7" y="7" fill="hsl(0, 0%, 100%)" />
            <rect width="1" height="1" x="7" y="8" fill="hsl(0, 0%, 100%)" />
            <rect width="1" height="1" x="7" y="9" fill="hsl(0, 0%, 100%)" />
            <rect width="1" height="1" x="7" y="10" fill="hsl(0, 0%, 100%)" />
            <rect width="1" height="1" x="7" y="11" fill="hsla(16, 100%, 50%, 1.00)" />
            <rect width="1" height="1" x="7" y="12" fill="hsl(0, 0%, 100%)" />
            <rect width="1" height="1" x="8" y="7" fill="hsl(0, 0%, 100%)" />
            <rect width="1" height="1" x="8" y="8" fill="hsla(16, 100%, 50%, 1.00)" />
            <rect width="1" height="1" x="8" y="9" fill="hsla(20, 100%, 50%, 1.00)" />
            <rect width="1" height="1" x="8" y="10" fill="hsla(16, 100%, 50%, 1.00)" />
            <rect width="1" height="1" x="8" y="11" fill="hsla(16, 100%, 50%, 1.00)" />
            <rect width="1" height="1" x="8" y="12" fill="hsl(0, 0%, 100%)" />
            <rect width="1" height="1" x="9" y="6" fill="hsl(0, 0%, 100%)" />
            <rect width="1" height="1" x="9" y="7" fill="hsla(16, 100%, 50%, 1.00)" />
            <rect width="1" height="1" x="9" y="8" fill="hsla(16, 100%, 50%, 1.00)" />
            <rect width="1" height="1" x="9" y="9" fill="hsla(20, 100%, 50%, 1.00)" />
            <rect width="1" height="1" x="9" y="10" fill="hsla(16, 100%, 50%, 1.00)" />
            <rect width="1" height="1" x="9" y="11" fill="hsla(20, 100%, 50%, 1.00)" />
            <rect width="1" height="1" x="9" y="12" fill="hsla(16, 100%, 50%, 1.00)" />
            <rect width="1" height="1" x="9" y="13" fill="hsl(0, 0%, 100%)" />
            <rect width="1" height="1" x="10" y="6" fill="hsl(0, 0%, 100%)" />
            <rect width="1" height="1" x="10" y="7" fill="hsla(16, 100%, 50%, 1.00)" />
            <rect width="1" height="1" x="10" y="8" fill="hsla(16, 100%, 50%, 1.00)" />
            <rect width="1" height="1" x="10" y="9" fill="hsla(20, 100%, 50%, 1.00)" />
            <rect width="1" height="1" x="10" y="10" fill="hsla(20, 100%, 50%, 1.00)" />
            <rect width="1" height="1" x="10" y="11" fill="hsla(16, 100%, 50%, 1.00)" />
            <rect width="1" height="1" x="10" y="12" fill="hsl(0, 0%, 100%)" />
            <rect width="1" height="1" x="10" y="13" fill="hsl(0, 0%, 100%)" />
            <rect width="1" height="1" x="11" y="6" fill="hsl(0, 0%, 100%)" />
            <rect width="1" height="1" x="11" y="7" fill="hsla(20, 100%, 50%, 1.00)" />
            <rect width="1" height="1" x="11" y="8" fill="hsla(20, 100%, 50%, 1.00)" />
            <rect width="1" height="1" x="11" y="9" fill="hsla(16, 100%, 50%, 1.00)" />
            <rect width="1" height="1" x="11" y="10" fill="hsla(20, 100%, 50%, 1.00)" />
            <rect width="1" height="1" x="11" y="11" fill="hsl(0, 0%, 100%)" />
            <rect width="1" height="1" x="11" y="12" fill="hsl(0, 0%, 100%)" />
            <rect width="1" height="1" x="11" y="13" fill="hsl(0, 0%, 100%)" />
            <rect width="1" height="1" x="12" y="6" fill="hsl(0, 0%, 100%)" />
            <rect width="1" height="1" x="12" y="7" fill="hsl(0, 0%, 100%)" />
            <rect width="1" height="1" x="12" y="8" fill="hsla(11, 100%, 50%, 1.00)" />
            <rect width="1" height="1" x="12" y="9" fill="hsl(0, 0%, 100%)" />
            <rect width="1" height="1" x="12" y="10" fill="hsl(0, 0%, 100%)" />
            <rect width="1" height="1" x="12" y="11" fill="hsl(0, 0%, 100%)" />
            <rect width="1" height="1" x="12" y="12" fill="hsl(0, 0%, 100%)" />
            <rect width="1" height="1" x="12" y="13" fill="hsl(0, 0%, 100%)" />
            <rect width="1" height="1" x="13" y="6" fill="hsl(0, 0%, 100%)" />
            <rect width="1" height="1" x="13" y="7" fill="hsl(0, 0%, 100%)" />
            <rect width="1" height="1" x="13" y="8" fill="hsl(0, 0%, 100%)" />
            <rect width="1" height="1" x="13" y="9" fill="hsl(0, 0%, 100%)" />
            <rect width="1" height="1" x="13" y="10" fill="hsla(16, 100%, 50%, 1.00)" />
            <rect width="1" height="1" x="13" y="11" fill="hsla(20, 100%, 50%, 1.00)" />
            <rect width="1" height="1" x="13" y="12" fill="hsl(0, 0%, 100%)" />
            <rect width="1" height="1" x="13" y="13" fill="hsl(0, 0%, 100%)" />
            <rect width="1" height="1" x="14" y="6" fill="hsl(0, 0%, 100%)" />
            <rect width="1" height="1" x="14" y="7" fill="hsl(0, 0%, 100%)" />
            <rect width="1" height="1" x="14" y="8" fill="hsla(11, 100%, 50%, 1.00)" />
            <rect width="1" height="1" x="14" y="9" fill="hsla(16, 100%, 50%, 1.00)" />
            <rect width="1" height="1" x="14" y="10" fill="hsla(16, 100%, 50%, 1.00)" />
            <rect width="1" height="1" x="14" y="11" fill="hsla(20, 100%, 50%, 1.00)" />
            <rect width="1" height="1" x="14" y="12" fill="hsla(16, 100%, 50%, 1.00)" />
            <rect width="1" height="1" x="14" y="13" fill="hsl(0, 0%, 100%)" />
            <rect width="1" height="1" x="15" y="6" fill="hsl(0, 0%, 100%)" />
            <rect width="1" height="1" x="15" y="7" fill="hsla(20, 100%, 50%, 1.00)" />
            <rect width="1" height="1" x="15" y="8" fill="hsla(20, 100%, 50%, 1.00)" />
            <rect width="1" height="1" x="15" y="9" fill="hsla(11, 100%, 50%, 1.00)" />
            <rect width="1" height="1" x="15" y="10" fill="hsla(16, 100%, 50%, 1.00)" />
            <rect width="1" height="1" x="15" y="11" fill="hsla(20, 100%, 50%, 1.00)" />
            <rect width="1" height="1" x="15" y="12" fill="hsla(16, 100%, 50%, 1.00)" />
            <rect width="1" height="1" x="15" y="13" fill="hsl(0, 0%, 100%)" />
            <rect width="1" height="1" x="16" y="7" fill="hsl(0, 0%, 100%)" />
            <rect width="1" height="1" x="16" y="8" fill="hsl(0, 0%, 100%)" />
            <rect width="1" height="1" x="16" y="9" fill="hsla(16, 100%, 50%, 1.00)" />
            <rect width="1" height="1" x="16" y="10" fill="hsla(16, 100%, 50%, 1.00)" />
            <rect width="1" height="1" x="16" y="11" fill="hsla(20, 100%, 50%, 1.00)" />
            <rect width="1" height="1" x="16" y="12" fill="hsl(0, 0%, 100%)" />
            <rect width="1" height="1" x="17" y="7" fill="hsl(0, 0%, 100%)" />
            <rect width="1" height="1" x="17" y="8" fill="hsl(0, 0%, 0%)" />
            <rect width="1" height="1" x="17" y="9" fill="hsl(0, 0%, 100%)" />
            <rect width="1" height="1" x="17" y="10" fill="hsla(20, 100%, 50%, 1.00)" />
            <rect width="1" height="1" x="17" y="11" fill="hsl(0, 0%, 0%)" />
            <rect width="1" height="1" x="17" y="12" fill="hsl(0, 0%, 100%)" />
            <rect width="1" height="1" x="18" y="8" fill="hsl(0, 0%, 100%)" />
            <rect width="1" height="1" x="18" y="9" fill="hsla(20, 100%, 50%, 1.00)" />
            <rect width="1" height="1" x="18" y="10" fill="hsla(20, 100%, 50%, 1.00)" />
            <rect width="1" height="1" x="18" y="11" fill="hsl(0, 0%, 100%)" />
            <rect width="1" height="1" x="19" y="9" fill="hsl(0, 0%, 100%)" />
            <rect width="1" height="1" x="19" y="10" fill="hsl(0, 0%, 100%)" />
          </g>
          
          {/* Tail Group - Animated */}
          <motion.g
            animate={{ rotate: pathParams.tailRotateValues }}
            transition={{
              duration: duration,
              delay: delay,
              repeat: Infinity,
              ease: "linear"
            }}
            style={{ transformOrigin: "6px 9px" }}
          >
            <rect width="1" height="1" x="0" y="5" fill="hsl(0, 0%, 100%)" />
            <rect width="1" height="1" x="0" y="13" fill="hsl(0, 0%, 100%)" />
            <rect width="1" height="1" x="1" y="5" fill="hsl(0, 0%, 100%)" />
            <rect width="1" height="1" x="1" y="6" fill="hsl(0, 0%, 100%)" />
            <rect width="1" height="1" x="1" y="7" fill="hsl(0, 0%, 100%)" />
            <rect width="1" height="1" x="1" y="11" fill="hsl(0, 0%, 100%)" />
            <rect width="1" height="1" x="1" y="12" fill="hsl(0, 0%, 100%)" />
            <rect width="1" height="1" x="1" y="13" fill="hsl(0, 0%, 100%)" />
            <rect width="1" height="1" x="2" y="6" fill="hsl(0, 0%, 100%)" />
            <rect width="1" height="1" x="2" y="7" fill="hsl(0, 0%, 100%)" />
            <rect width="1" height="1" x="2" y="8" fill="hsl(0, 0%, 100%)" />
            <rect width="1" height="1" x="2" y="9" fill="hsl(0, 0%, 100%)" />
            <rect width="1" height="1" x="2" y="10" fill="hsl(0, 0%, 100%)" />
            <rect width="1" height="1" x="2" y="11" fill="hsl(0, 0%, 100%)" />
            <rect width="1" height="1" x="2" y="12" fill="hsl(0, 0%, 100%)" />
            <rect width="1" height="1" x="3" y="8" fill="hsl(0, 0%, 100%)" />
            <rect width="1" height="1" x="3" y="9" fill="hsl(0, 0%, 100%)" />
            <rect width="1" height="1" x="3" y="10" fill="hsla(16, 100%, 50%, 1.00)" />
            <rect width="1" height="1" x="3" y="11" fill="hsl(0, 0%, 100%)" />
          </motion.g>
        </g>
      </svg>
    </motion.div>
  );
};

// 8-bit Lily Pad
const LilyPad = ({ x, y, scale = 1 }: { x: number, y: number, scale?: number }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 2 }}
    className="absolute"
    style={{ 
      left: `${x}%`, 
      top: `${y}%`, 
      transform: `scale(${scale})`,
      imageRendering: 'pixelated'
    }}
  >
    <svg width="50" height="50" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" shapeRendering="crispEdges">
      <path d="M6 2h8v2H6zM4 4h12v2H4zM2 6h16v8H2zM4 14h12v2H4zM6 16h8v2H6z" fill="var(--koi-leaf)" />
      <path d="M10 10h8v2H10z" fill="var(--koi-dark)" /> {/* Cutout */}
    </svg>
  </motion.div>
);

const KoiBackground = () => {
  const [fish, setFish] = useState<number[]>([]);
  const [pads, setPads] = useState<{id: number, x: number, y: number, scale: number}[]>([]);

  useEffect(() => {
    // Generate fish
    setFish([1, 2]);
    
    // Generate static lily pads
    const newPads = Array.from({ length: 4 }, (_, i) => ({
      id: i,
      x: Math.random() * 90,
      y: Math.random() * 90,
      scale: 1.5 + Math.random() * 2
    }));
    setPads(newPads);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-koi-dark">
      {/* Fish - Animated Layer */}
      {fish.map((id) => (
        <PixelKoi 
          key={id} 
          color="#ff5e3a" 
          delay={id * 2} 
          duration={20 + Math.random() * 10}
        />
      ))}

      {/* Underwater Depth Overlay (z-5) - Tints the fish to look submerged */}
      <div className="absolute inset-0 z-5 bg-blue-900/40 mix-blend-multiply pointer-events-none" />

      {/* Water Animation - Surface Layer (z-10 to sit above fish) */}
      <div className="absolute inset-0 z-10 opacity-30 mix-blend-screen pointer-events-none">
        <WaterBackground />
      </div>

      {/* Lily Pads - Floating ON TOP (z-20) */}
      <div className="absolute inset-0 z-20 pointer-events-none">
        {pads.map((pad) => (
          <LilyPad key={pad.id} x={pad.x} y={pad.y} scale={pad.scale} />
        ))}
      </div>
    </div>
  );
};

export default KoiBackground;
