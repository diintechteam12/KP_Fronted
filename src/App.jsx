import { useState, useEffect } from 'react';
import Lenis from 'lenis';

import Loader from './components/Loader';
import CustomCursor from './components/CustomCursor';
import ScrollProgress from './components/ScrollProgress';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

import Hero from './sections/Hero';
import About from './sections/About';
import Vision from './sections/Vision';
import Journey from './sections/Journey';
import Achievements from './sections/Achievements';
import SocialImpact from './sections/SocialImpact';
import Gallery from './sections/Gallery';
import Videos from './sections/Videos';
import MediaCoverage from './sections/MediaCoverage';
import Testimonials from './sections/Testimonials';
import Initiatives from './sections/Initiatives';
import SocialMedia from './sections/SocialMedia';
import Contact from './sections/Contact';

export default function App() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!loaded) return;
    const lenis = new Lenis({ duration: 1.4, easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
    const raf = (time) => { lenis.raf(time); requestAnimationFrame(raf); };
    requestAnimationFrame(raf);
    return () => lenis.destroy();
  }, [loaded]);

  return (
    <>
      {!loaded && <Loader onComplete={() => setLoaded(true)} />}
      {loaded && (
        <>
          <CustomCursor />
          <ScrollProgress />
          <Navbar />
          <main>
            <Hero />
            <About />
            <Vision />
            <Journey />
            <Achievements />
            <SocialImpact />
            <Initiatives />
            <Gallery />
            <Videos />
            <MediaCoverage />
            <Testimonials />
            <SocialMedia />
            <Contact />
          </main>
          <Footer />
        </>
      )}
    </>
  );
}
