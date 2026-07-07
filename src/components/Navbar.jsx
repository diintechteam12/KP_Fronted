import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBars, FaTimes } from 'react-icons/fa';
import { useLanguage, useLocalized } from '../context/LanguageContext';

const defaultLinks = [
  { label: 'Home', labelHi: 'होम', href: '#hero' },
  { label: 'About', labelHi: 'परिचय', href: '#about' },
  { label: 'Journey', labelHi: 'सफर', href: '#journey' },
  { label: 'Vision', labelHi: 'दृष्टिकोण', href: '#vision' },
  { label: 'Humare Log', labelHi: 'हमारे लोग', href: '#hmare-log' },
  { label: 'Impact', labelHi: 'प्रभाव', href: '#impact' },
  { label: 'Work In Progress', labelHi: 'कार्य प्रगति पर है', href: '#gallery' },
  { label: 'Contact', labelHi: 'संपर्क', href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('Home');
  const [navLinks, setNavLinks] = useState(defaultLinks);
  const { lang, toggleLanguage } = useLanguage();
  const localizedNavLinks = useLocalized(navLinks);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', fn);

    // Fetch dynamic navbar links
    const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
    fetch(`${apiUrl}/portfolio-website/kp-kasana-portfolio`)
      .then(res => res.json())
      .then(res => {
        if (res.success && res.data && res.data.navbar && res.data.navbar.links) {
          const links = res.data.navbar.links
            .filter(link => link.enabled && link.label !== 'Achievements' && link.href !== '#achievements')
            .sort((a, b) => a.order - b.order);

          if (links.length > 0) {
            links.forEach(l => {
              if (l.label === 'Gallery') {
                l.label = 'Work In Progress';
                l.labelHi = 'कार्य प्रगति पर है';
              }
            });
            if (!links.some(l => l.label === 'Humare Log')) {
              links.push({ label: 'Humare Log', labelHi: 'हमारे लोग', href: '#hmare-log', order: 3.5 });
              links.sort((a, b) => a.order - b.order);
            }
            setNavLinks(links);
          }
        }
      })
      .catch(err => console.error("Error fetching navbar links:", err));

    return () => window.removeEventListener('scroll', fn);
  }, []);

  const go = (href, label) => {
    setActive(label); setOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-[9999] transition-all duration-500 ${scrolled ? 'backdrop-blur-xl border-b border-yellow-400/10' : ''}`}
        style={{ background: scrolled ? 'rgba(11,15,25,0.95)' : 'transparent', boxShadow: scrolled ? '0 4px 30px rgba(0,0,0,0.3)' : 'none' }}
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          {/* Logo */}
          <button onClick={() => go('#hero', 'Home')} className="flex items-center gap-3 cursor-pointer">
            <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-green-700"
              style={{ boxShadow: '0 0 15px rgba(15,81,50,0.5)' }}>
              <img src="/Kp image.png" alt="KP" className="w-full h-full object-cover" />
            </div>
            <span className="text-white text-lg font-bold hidden sm:block" style={{ fontFamily: 'Cinzel,serif' }}>
              K. P. <span style={{ background: 'linear-gradient(135deg,#FFD700,#FF6B00)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Kasana</span>
            </span>
          </button>

          {/* Desktop links */}
          <div className="hidden lg:flex items-center gap-1">
            {localizedNavLinks.map((l, index) => {
              // We use the original English label or href for the active state to keep it consistent across language toggles
              const originalLabel = navLinks[index]?.label || `link-${index}`; 
              return (
                <button key={`nav-desk-${index}-${originalLabel}`} onClick={() => go(l.href, originalLabel)}
                  className={`relative px-4 py-2 text-sm font-medium transition-colors cursor-pointer ${active === originalLabel ? 'text-yellow-400' : 'text-white/80 hover:text-white'}`}>
                  {l.label}
                  {active === originalLabel && (
                    <motion.div layoutId="nav-active" className="absolute bottom-0 left-0 right-0 h-0.5 bg-yellow-400 rounded-full" />
                  )}
                </button>
              );
            })}
          </div>

          {/* CTA Buttons & Language Toggle */}
          <div className="flex items-center gap-2 lg:gap-3">
            <div className="flex items-center p-0.5 lg:p-1 bg-[#1a1a24] rounded-full border border-white/5 cursor-pointer shadow-inner" onClick={toggleLanguage}>
              <div className={`px-2 py-1 lg:px-4 lg:py-1.5 rounded-full text-[10px] sm:text-xs lg:text-sm font-semibold transition-all duration-300 ${lang === 'en' ? 'bg-[#FFD700] text-black shadow-md' : 'text-gray-400 hover:text-white'}`}>
                English
              </div>
              <div className={`px-2 py-1 lg:px-4 lg:py-1.5 rounded-full text-[10px] sm:text-xs lg:text-sm font-semibold transition-all duration-300 ${lang === 'hi' ? 'bg-[#FFD700] text-black shadow-md' : 'text-gray-400 hover:text-white'}`}>
                हिंदी
              </div>
            </div>

            <motion.button
              onClick={() => go('#join-us', 'Join Us')}
              className="px-3 py-1.5 lg:px-6 lg:py-2.5 rounded-full text-[10px] sm:text-xs lg:text-sm font-bold text-black cursor-pointer bg-[#eab308] whitespace-nowrap"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
            >
              {lang === 'hi' ? 'हमसे जुड़ें' : 'Join Us'}
            </motion.button>
            <motion.button
              onClick={() => go('#contact', 'Contact')}
              className="hidden lg:block px-6 py-2.5 rounded-full text-sm font-semibold text-white cursor-pointer whitespace-nowrap"
              style={{ background: 'linear-gradient(135deg,#0F5132,#1a7a4a)', boxShadow: '0 0 15px rgba(15,81,50,0.4)' }}
              whileHover={{ scale: 1.05, boxShadow: '0 0 25px rgba(15,81,50,0.7)' }}
              whileTap={{ scale: 0.97 }}
            >
              {lang === 'hi' ? 'अभी संपर्क करें' : 'Connect Now'}
            </motion.button>

            <button className="lg:hidden text-white text-xl sm:text-2xl p-1 sm:p-2 cursor-pointer ml-1" onClick={() => setOpen(!open)}>
              {open ? <FaTimes /> : <FaBars />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[9998] lg:hidden flex flex-col items-center justify-center gap-6 backdrop-blur-2xl"
            style={{ background: 'rgba(11,15,25,0.98)' }}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <div className="flex items-center p-1 bg-[#1a1a24] rounded-full border border-white/5 cursor-pointer mt-4 shadow-inner" onClick={toggleLanguage}>
              <div className={`px-6 py-2 rounded-full text-base font-semibold transition-all duration-300 ${lang === 'en' ? 'bg-[#FFD700] text-black shadow-md' : 'text-gray-400 hover:text-white'}`}>
                English
              </div>
              <div className={`px-6 py-2 rounded-full text-base font-semibold transition-all duration-300 ${lang === 'hi' ? 'bg-[#FFD700] text-black shadow-md' : 'text-gray-400 hover:text-white'}`}>
                हिंदी
              </div>
            </div>
            
            {localizedNavLinks.map((l, i) => {
              const originalLabel = navLinks[i]?.label || `link-${i}`;
              return (
                <motion.button key={`nav-mob-${i}-${originalLabel}`} onClick={() => go(l.href, originalLabel)}
                  className={`text-2xl font-bold cursor-pointer ${active === originalLabel ? 'text-yellow-400' : 'text-white'}`}
                  style={{ fontFamily: 'Playfair Display,serif' }}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.07 }}
                  whileHover={{ scale: 1.1, color: '#FFD700' }}
                >
                  {l.label}
                </motion.button>
              );
            })}
            <div className="flex flex-col items-center gap-4 mt-4 w-[200px]">
              <motion.button
                onClick={() => go('#join-us', 'Join Us')}
                className="px-8 py-3 rounded-full font-bold text-black cursor-pointer bg-[#eab308] w-full"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                {lang === 'hi' ? 'हमसे जुड़ें' : 'Join Us'}
              </motion.button>
              <motion.button
                onClick={() => go('#contact', 'Contact')}
                className="px-8 py-3 rounded-full font-semibold text-white cursor-pointer w-full"
                style={{ background: 'linear-gradient(135deg,#0F5132,#1a7a4a)' }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                {lang === 'hi' ? 'अभी संपर्क करें' : 'Connect Now'}
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
