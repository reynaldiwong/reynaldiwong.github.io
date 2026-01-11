import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Petal = () => {
  const randomStart = Math.random() * 100; // %
  const randomDuration = 10 + Math.random() * 10; // s
  const randomDelay = Math.random() * 10; // s
  
  return (
    <motion.div
      initial={{ 
        y: -20, 
        x: `${randomStart}vw`, 
        opacity: 0, 
        rotate: 0 
      }}
      animate={{ 
        y: '100vh', 
        x: `${randomStart + (Math.random() * 20 - 10)}vw`, // Drift
        opacity: [0, 1, 1, 0], 
        rotate: 360 
      }}
      transition={{ 
        duration: randomDuration, 
        delay: randomDelay,
        repeat: Infinity,
        ease: "linear"
      }}
      className="fixed top-0 pointer-events-none z-50 w-4 h-4"
    >
      <svg viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M15 0C15 0 16.5 7.5 22.5 7.5C28.5 7.5 30 15 30 15C30 15 22.5 16.5 22.5 22.5C22.5 28.5 15 30 15 30C15 30 13.5 22.5 7.5 22.5C1.5 22.5 0 15 0 15C0 15 7.5 13.5 7.5 7.5C7.5 1.5 15 0 15 0Z" fill="#FFB7C5" fillOpacity="0.6"/>
      </svg>
    </motion.div>
  );
};

const SeasonalEffects = () => {
  const [petals, setPetals] = useState<number[]>([]);

  useEffect(() => {
    // Generate petals
    const petalCount = 20;
    const newPetals = Array.from({ length: petalCount }, (_, i) => i);
    setPetals(newPetals);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      <AnimatePresence>
        {petals.map((id) => (
          <Petal key={id} />
        ))}
      </AnimatePresence>
    </div>
  );
};

export default SeasonalEffects;
