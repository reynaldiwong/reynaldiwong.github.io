import { motion } from 'framer-motion';

const projects = [
  {
    title: "AI-Enhanced DevOps Tools",
    description: "Integrated AI into internal DevOps workflows to accelerate processes, enhance decision-making, and reduce operational overhead. Built using Go.",
    tags: ["Go", "AI", "DevOps", "Automation"],
    link: "#"
  },
  {
    title: "CI/CD Pipeline Automation",
    description: "Implemented and managed automation tools like Jenkins and ArgoCD for continuous integration and delivery, streamlining deployment processes and reducing release time.",
    tags: ["Jenkins", "ArgoCD", "CI/CD", "Kubernetes"],
    link: "#"
  },
  {
    title: "Digital Automation System",
    description: "Developed systems for digital automation and visualization using Node-RED, Grafana, PostgreSQL, and Docker Containers for manufacturing environments.",
    tags: ["Node-RED", "Grafana", "Docker", "PostgreSQL"],
    link: "#"
  },
  {
    title: "Network Infrastructure",
    description: "Designed and maintained on-prem server and network infrastructure including Routing, NAT, Bridging, and OSPF protocols.",
    tags: ["Networking", "OSPF", "Infrastructure", "On-Prem"],
    link: "#"
  }
];

const ProjectCard = ({ project, delay }: { project: any, delay: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6, delay }}
    className="nes-container !bg-koi-dark/90 backdrop-blur-sm flex flex-col h-full group hover:scale-[1.01] transition-all duration-300"
  >
    
    <div className="relative z-10 flex flex-col h-full">
      <div className="border-b-4 border-white/10 pb-4 mb-6 transition-colors duration-300">
        <h3 className="text-sm md:text-base font-pixel-title text-koi-fish-orange group-hover:text-koi-fish-red transition-colors">
          {project.title}
        </h3>
      </div>
      
      <p className="text-koi-fish-white mb-8 leading-relaxed flex-grow font-pixel-body text-lg transition-colors duration-300">
        {project.description}
      </p>
      
      <div className="mt-auto space-y-6">
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag: string, idx: number) => (
            <span key={idx} className="inline-flex items-center px-2 py-1 text-xs font-pixel-body bg-black/40 text-koi-water-light border border-koi-water/30 transition-colors duration-300">
              {tag}
            </span>
          ))}
        </div>
        
        <div className="pt-6 border-t-4 border-dotted border-white/20 flex justify-end transition-colors duration-300">
          <a href={project.link} className="pixel-btn text-[10px] bg-koi-water hover:bg-koi-water-light">
            View Source 
          </a>
        </div>
      </div>
    </div>
  </motion.div>
);

const Projects = () => {
  return (
    <div id="projects" className="py-24 relative overflow-hidden">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <motion.span 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-koi-fish-orange font-pixel-title text-xs tracking-widest uppercase block mb-4"
          >
            My Works
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-3xl md:text-4xl font-pixel-title text-white mb-6 transition-colors duration-300"
          >
            Featured Projects
          </motion.h2>
          <div className="w-24 h-2 bg-koi-fish-red mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {projects.map((project, index) => (
            <ProjectCard 
              key={index} 
              project={project} 
              delay={index * 0.1}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Projects;