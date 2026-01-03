import { useEffect } from 'react';
import Lenis from 'lenis';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Cursor from './components/Cursor';
import Preloader from './components/Preloader';
import ScrollProgress from './components/ScrollProgress';
import SkillsMarquee from './components/SkillsMarquee';
import Spotlight from './components/Spotlight';

function App() {

  // Inicializar Lenis Smooth Scroll
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <main className="bg-black min-h-screen text-white cursor-none">
      <Preloader />
      <Cursor />
      <ScrollProgress />
      <Spotlight />
      <Navbar />
      <Hero />
      <SkillsMarquee />
      <Projects />
      <Contact />
    </main>
  );
}

export default App;
