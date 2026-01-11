import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const Hero = () => {
  const [text, setText] = useState('');
  const fullText = "Hello, I'm Rey";
  const [experience, setExperience] = useState('');
  const [years, setYears] = useState('');

  useEffect(() => {
    const startDate = new Date('2023-05-29T00:00:00');

    const updateExperience = () => {
      const now = new Date();
      const diff = now.getTime() - startDate.getTime();

      const years = Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25));
      const months = Math.floor((diff % (1000 * 60 * 60 * 24 * 365.25)) / (1000 * 60 * 60 * 24 * 30.44));
      const days = Math.floor((diff % (1000 * 60 * 60 * 24 * 30.44)) / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setExperience(`${years}Y ${months}M ${days}D ${hours}H ${minutes}M ${seconds}S`);
      setYears(`${years}`);
    };

    const timer = setInterval(updateExperience, 1000);
    updateExperience(); 

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      if (index <= fullText.length) {
        setText(fullText.slice(0, index));
        index++;
      } else {
        clearInterval(interval);
      }
    }, 150); // Slower typing for retro feel

    return () => clearInterval(interval);
  }, []);

  const renderText = () => {
    const splitIndex = "Hello, I'm ".length;
    
    if (text.length <= splitIndex) {
      return <span>{text}</span>;
    }

    const firstPart = text.slice(0, splitIndex);
    const secondPart = text.slice(splitIndex);

    return (
      <>
        <span>{firstPart}</span>
        <span className="text-koi-fish-orange">
          {secondPart}
        </span>
      </>
    );
  };

  return (
    <div id="home" className="relative h-screen w-full overflow-hidden flex flex-col items-center justify-center">
      
      {/* Main Content - NES Container */}
      <div className="relative z-30 px-4 w-full max-w-5xl mx-auto text-center">
        <div className="nes-container !bg-koi-dark/90 backdrop-blur-sm mx-auto inline-block min-w-[300px] md:min-w-[600px] transition-colors duration-300">

          {/* Level Badge */}
          <div className="mb-6">
            <span className="inline-block px-4 py-1.5 bg-koi-leaf/20 text-koi-leaf border border-koi-leaf/50 rounded font-pixel-title text-xs backdrop-blur-sm">
              Lvl.{years} DevOps Engineer
            </span>
          </div>

          {/* Typing Text */}
          <h1 className="text-2xl md:text-4xl lg:text-5xl font-pixel-title text-white mb-8 leading-relaxed tracking-wider transition-colors duration-300">
            <div className="relative inline-block text-left">
              {/* Invisible Spacer to reserve full width */}
              <div className="opacity-0 select-none" aria-hidden="true">
                <span className="text-koi-water-light">&gt;</span>
                <span>{fullText.slice(0, "Hello, I'm ".length)}</span>
                <span className="text-koi-fish-orange">{fullText.slice("Hello, I'm ".length)}</span>
                <span className="ml-2">_</span>
              </div>
              
              {/* Visible Typing Text Overlay */}
              <div className="absolute top-0 left-0 w-full">
                <span className="text-koi-water-light">&gt;</span>{renderText()}
                <span className="animate-ping ml-2">_</span>
              </div>
            </div>
          </h1>

          {/* Experience Counter - RPG Stats Style */}
          <div className="mt-8 border-t-4 border-white/20 pt-6 transition-colors duration-300">
            <p className="font-pixel-body text-koi-water-light mb-2 text-lg uppercase tracking-widest">
              Experience
            </p>
            <div className="font-pixel-title text-koi-leaf text-xs md:text-sm lg:text-base tracking-widest bg-black/40 p-4 border-2 border-koi-water-light/50 inline-block rounded transition-colors duration-300">
              {experience}
            </div>
          </div>

          {/* Call to Action Buttons */}
          <div className="mt-10 flex flex-col sm:flex-row justify-center gap-6">
            <a 
              href="#about" 
              className="pixel-btn bg-koi-fish-red hover:scale-105"
            >
              Start
            </a>

          </div>
          
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "steps(4)" }}
        className="absolute bottom-10 left-0 w-full text-center text-white font-pixel-body text-xl z-20"
      >
        PRESS START
        <div className="w-4 h-4 border-r-4 border-b-4 border-white rotate-45 mx-auto mt-2"></div>
      </motion.div>
    </div>
  );
};

export default Hero;
