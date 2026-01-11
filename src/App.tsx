import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';
import KoiBackground from './components/KoiBackground';

function App() {
  return (
    <div className="min-h-screen bg-koi-dark font-pixel-body text-koi-fish-white selection:bg-koi-fish-red selection:text-white transition-colors duration-300">
      
      <KoiBackground />
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Contact />
    </div>
  );
}

export default App;
