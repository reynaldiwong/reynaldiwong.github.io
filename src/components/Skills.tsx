import { motion } from 'framer-motion';

const skills = [
  { category: "Cloud & Infrastructure", items: ["Google Cloud", "Docker", "Kubernetes", "Terraform"] },
  { category: "CI/CD & DevOps", items: ["Jenkins", "ArgoCD", "GitOps", "Ansible"] },
  { category: "Programming", items: ["Go (Golang)", "Python", "Bash", "SQL"] },
  { category: "Automation & IoT", items: ["Node-RED", "Modbus", "Profibus", "TCP/IP"] },
  { category: "Monitoring & Data", items: ["Grafana", "Prometheus", "PostgreSQL", "ELK"] },
  { category: "Languages", items: ["Indonesian (Native)", "English (Proficient)", "German (Intermediate)"] },
];

const Skills = () => {
  return (
    <div id="skills" className="py-24 relative overflow-hidden">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-koi-fish-orange font-pixel-title text-xs tracking-widest uppercase block mb-4">Tools of the Trade</span>
          <h2 className="text-3xl md:text-4xl font-pixel-title text-white mb-6 transition-colors duration-300">Technical Arsenal</h2>
          <div className="w-24 h-2 bg-koi-fish-red mx-auto"></div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skills.map((skillGroup, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="nes-container !bg-koi-dark/90 backdrop-blur-sm hover:scale-[1.02] transition-all duration-300"
            >
              <h3 className="text-sm font-pixel-title text-koi-water-light mb-6 text-center border-b-4 border-white/10 pb-4 transition-colors duration-300">
                {skillGroup.category}
              </h3>
              
              <div className="flex flex-wrap justify-center gap-3">
                {skillGroup.items.map((item, idx) => (
                  <span key={idx} className="bg-black/40 text-koi-fish-white text-sm font-pixel-body px-3 py-1 border border-koi-water/50 hover:bg-koi-fish-red hover:border-white hover:text-white transition-colors cursor-default">
                    {item}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Skills;