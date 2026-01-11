import { useState } from 'react';
import { motion } from 'framer-motion';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav className="fixed w-full z-40 top-0 font-pixel-title">
      {/* 8-bit Menu Bar */}
      <div className="bg-koi-dark/95 w-full relative border-b-4 border-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20">
          <div className="flex items-center justify-between h-full">
            
            {/* Logo Area - Pixelated */}
            <div className="flex-shrink-0 flex items-center group cursor-pointer">
              <div className="flex flex-col">
                <span className="text-white text-sm md:text-base tracking-widest hover:text-koi-fish-orange transition-colors">Reynaldi Wong</span>
                <span className="text-koi-water-light text-[10px] uppercase">DevOps Engineer</span>
              </div>
            </div>

            {/* Desktop Menu - NES Style */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                {navItems.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="pixel-btn text-[10px] md:text-xs"
                  >
                    {item.name}
                  </a>
                ))}
              </div>
            </div>

            {/* Mobile Menu Button - Pixelated */}
            <div className="md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="inline-flex items-center justify-center p-2 bg-koi-water border-2 border-white text-white hover:bg-koi-water-light focus:outline-none"
              >
                <span className="sr-only">Open main menu</span>
                <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24" shapeRendering="crispEdges">
                  <path
                    className={isOpen ? 'hidden' : 'inline-flex'}
                    strokeLinecap="square"
                    strokeLinejoin="miter"
                    strokeWidth="4"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                  <path
                    className={isOpen ? 'inline-flex' : 'hidden'}
                    strokeLinecap="square"
                    strokeLinejoin="miter"
                    strokeWidth="4"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown - NES Style */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden bg-koi-dark border-b-4 border-white absolute w-full transition-colors duration-300"
        >
          <div className="px-4 pt-4 pb-6 space-y-4">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="block text-center pixel-btn w-full"
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </a>
            ))}
          </div>
        </motion.div>
      )}
    </nav>
  );
};

export default Navbar;
