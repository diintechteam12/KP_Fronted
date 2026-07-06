import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { FaArrowUp } from 'react-icons/fa';
import Lenis from 'lenis';

import Loader from './components/Loader';
import CustomCursor from './components/CustomCursor';
import ScrollProgress from './components/ScrollProgress';
import Navbar from './components/Navbar';
import FloatingSocialBar from './components/FloatingSocialBar';
import Footer from './components/Footer';
import Dashboard from './admin/Dashboard';

import Hero from './sections/Hero';
import About from './sections/About';
import CoreVision from './sections/CoreVision';
import Vision from './sections/Vision';
import Journey from './sections/Journey';
import SocialImpact from './sections/SocialImpact';
import HmareLog from './sections/HmareLog';
import Gallery from './sections/Gallery';
import Videos from './sections/Videos';
import MediaCoverage from './sections/MediaCoverage';
import Testimonials from './sections/Testimonials';

import BecomeMember from './sections/BecomeMember';
import Contact from './sections/Contact';

function MainSite() {
  const [loaded, setLoaded] = useState(false);
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 400);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    // Record page visit
    const recordVisit = async () => {
      try {
        const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
        await fetch(`${apiUrl}/analytics/visit`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ clientSlug: 'kp-kasana-portfolio' })
        });
      } catch (err) {
        console.error('Analytics error:', err);
      }
    };
    
    // Check if we already recorded a visit this session to avoid double counting on re-renders
    if (!sessionStorage.getItem('visit_recorded')) {
      recordVisit();
      sessionStorage.setItem('visit_recorded', 'true');
    }
  }, []);

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
          <FloatingSocialBar />
          <main>
            <Hero />
            <About />
            <Journey />
            <CoreVision />
            <Vision />
            <SocialImpact />
            <HmareLog />
            <Gallery />
            <Videos />
            <MediaCoverage />
            <Testimonials />

            <BecomeMember />
            <Contact />
          </main>
          <Footer />

          {showTop && (
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="fixed bottom-8 right-8 z-[9999] w-12 h-12 rounded-full flex items-center justify-center text-white cursor-pointer shadow-lg"
              style={{ background: 'linear-gradient(135deg,#0F5132,#1a7a4a)', boxShadow: '0 0 20px rgba(15,81,50,0.6)' }}>
              <FaArrowUp size={16} />
            </button>
          )}
        </>
      )}
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/dashboard/*" element={<Dashboard />} />
        <Route path="/*" element={<MainSite />} />
      </Routes>
    </BrowserRouter>
  );
}
