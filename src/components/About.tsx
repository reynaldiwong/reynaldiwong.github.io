import { useState } from 'react';
import { motion } from 'framer-motion';
import profileImage from '../assets/images/profile.jpg';

const About = () => {
  const [activeTab, setActiveTab] = useState<'background' | 'career'>('background');

  const experiences = [
    {
      role: "DevOps Engineer",
      company: "Digital Daya Teknologi",
      period: "May 2023 - Present",
      description: "Orchestrating Fintech systems and CI/CD pipelines using Jenkins and ArgoCD. Developing internal tools with Go and integrating AI to accelerate DevOps workflows.",
      current: true
    },
    {
      role: "n8n Automation Engineer",
      company: "Freelance",
      period: "Jun 2025 - Jul 2025",
      description: "Engineered solutions to automate manual processes. Designed n8n workflows integrating various APIs and built intelligent automation agents.",
      current: false
    },
    {
      role: "Project & Automation Supervisor",
      company: "PT Dankos Farma",
      period: "Aug 2022 - Mar 2023",
      description: "Supervised on-prem servers and network infrastructure. Developed digital automation and visualization systems using Node-RED, Grafana, and Docker.",
      current: false
    },
    {
      role: "Automation Specialist",
      company: "PT. Finusolprima Farma Intl",
      period: "Feb 2022 - Aug 2022",
      description: "Developed and maintained network infrastructure and digital automation systems, focusing on device communication and system visualization.",
      current: false
    }
  ];

  return (
    <div id="about" className="py-24 relative overflow-hidden">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-koi-fish-orange font-pixel-title text-xs tracking-widest uppercase block mb-4">My Story</span>
          <h2 className="text-3xl md:text-4xl font-pixel-title text-white mb-4 transition-colors duration-300">About Me</h2>
          <div className="w-24 h-2 bg-koi-fish-red mx-auto"></div>
        </motion.div>
        
        <div className="flex flex-col md:flex-row items-center justify-center gap-12">
          
          {/* Text Content - NES Container */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="md:w-1/2"
          >
            <div className="nes-container !bg-koi-dark/90 backdrop-blur-sm text-white transition-colors duration-300 h-[640px] flex flex-col">
              {/* Tabs Navigation */}
              <div className="flex-none flex space-x-6 mb-6 border-b-2 border-white/10 pb-1">
                <button
                  onClick={() => setActiveTab('background')}
                  className={`font-pixel-title text-sm uppercase tracking-wider pb-2 transition-all duration-300 ${
                    activeTab === 'background' 
                      ? 'text-koi-fish-orange border-b-4 border-koi-fish-orange -mb-[3px]' 
                      : 'text-gray-500 hover:text-white'
                  }`}
                >
                  Background
                </button>
                <button
                  onClick={() => setActiveTab('career')}
                  className={`font-pixel-title text-sm uppercase tracking-wider pb-2 transition-all duration-300 ${
                    activeTab === 'career' 
                      ? 'text-koi-fish-orange border-b-4 border-koi-fish-orange -mb-[3px]' 
                      : 'text-gray-500 hover:text-white'
                  }`}
                >
                  Career
                </button>
              </div>

              {/* Tab Content */}
              <div className="flex-1 overflow-y-auto pr-4 custom-scrollbar">
                {activeTab === 'background' ? (
                  <motion.div
                    key="background"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h3 className="text-koi-fish-orange font-pixel-title text-l md:text-xl mb-6 border-b-4 border-white pb-2 inline-block transition-colors duration-300">
                      Background
                    </h3>
                    
                    <p className="text-koi-fish-white leading-relaxed font-pixel-body mb-6 transition-colors duration-300">
                      I am a gamer who graduated with a major in <span className="text-koi-fish-red">Mechatronics Engineering</span>. I worked for some time as an Automation Engineer, but I realized I prefer a desk-based role. Eventually, I transitioned into the <span className="text-koi-fish-red">DevOps field</span> and have been enjoying it ever since.
                    </p>
                    
                    <p className="text-koi-fish-white leading-relaxed font-pixel-body mb-8 transition-colors duration-300">
                      I've worked with tools like <span className="text-koi-leaf">Jenkins, ArgoCD, and Google Cloud Platform</span> to automate pipelines and ensure seamless application delivery. Lately, I’ve been experimenting with integrating <span className="text-koi-fish-orange">AI into DevOps tools</span> to boost efficiency and streamline repetitive tasks.
                    </p>
                    
                    <div className="bg-black/40 p-4 border-2 border-koi-water-light transition-colors duration-300">
                      <h3 className="text-lg md:text-xl font-pixel-title text-koi-sand mb-4 transition-colors duration-300">Core Philosophy</h3>
                      <ul className="space-y-3 font-pixel-body text-base">
                        {[
                          "Automate Your Boring Work",
                          "Make it Stable and Repeatable",
                          "Communication is Key"
                        ].map((item, idx) => (
                          <li key={idx} className="flex items-center text-koi-fish-white transition-colors duration-300">
                            <span className="w-2 h-2 bg-koi-fish-red mr-3 animate-pulse"></span>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="career"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-8"
                  >
                    <h3 className="text-koi-fish-orange font-pixel-title text-l md:text-xl mb-6 border-b-4 border-white pb-2 inline-block transition-colors duration-300">
                      Career Log
                    </h3>

                    <div className="relative pl-6 border-l-2 border-koi-water-light/30 ml-2 space-y-8">
                      {experiences.map((exp, idx) => (
                        <div key={idx} className="relative">
                          <div className={`absolute -left-[33px] top-1 w-4 h-4 bg-koi-dark border-2 rounded-full ${exp.current ? 'border-koi-fish-orange animate-pulse' : 'border-white'}`}></div>
                          <h4 className={`font-pixel-title text-sm mb-1 ${exp.current ? 'text-koi-fish-orange' : 'text-white'}`}>
                            {exp.role} {exp.current && <span className="text-xs text-white/80 ml-2 animate-pulse">(Last Save)</span>}
                          </h4>
                          <p className="font-pixel-body text-s text-white/80 mb-1">{exp.company}</p>
                          <p className="font-pixel-body text-s text-koi-water-light mb-2">{exp.period}</p>
                          <p className="font-pixel-body text-koi-fish-white text-base leading-relaxed">
                            {exp.description}
                          </p>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </div>
            </div>
          </motion.div>
          
          {/* Profile Image - Pixel Frame */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="md:w-1/3"
          >
             <div className="relative p-2">
               {/* Pixel Border Decoration */}
               <div className="absolute inset-0 border-4 border-koi-fish-orange translate-x-4 translate-y-4 bg-koi-fish-orange/20"></div>
               
               <div className="relative z-10 border-4 border-white bg-koi-dark p-2 transition-colors duration-300">
                 <img 
                   src={profileImage} 
                   alt="Rey - DevOps Engineer" 
                   className="w-full h-auto object-cover relative z-10 pixelated transition-all duration-500"
                   style={{ imageRendering: 'pixelated' }}
                 />
               </div>
             </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default About;
