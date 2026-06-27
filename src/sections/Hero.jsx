import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FaUsers, FaAward, FaStar, FaHandshake, FaChevronDown } from 'react-icons/fa';

const titles = ['A Leader Who Listens', 'A Voice for the People', 'Building from the Ground Up', '38 Years, Still Going'];

function TypingText({ words }) {
  const [idx, setIdx] = useState(0);
  const [text, setText] = useState('');
  const [del, setDel] = useState(false);

  useEffect(() => {
    const word = words[idx];
    let t;
    if (!del && text.length < word.length) t = setTimeout(() => setText(word.slice(0, text.length + 1)), 80);
    else if (!del && text.length === word.length) t = setTimeout(() => setDel(true), 2000);
    else if (del && text.length > 0) t = setTimeout(() => setText(text.slice(0, -1)), 50);
    else if (del && text.length === 0) { setDel(false); setIdx((idx + 1) % words.length); }
    return () => clearTimeout(t);
  }, [text, del, idx, words]);

  return <span>{text}<span className="text-yellow-400 animate-pulse">|</span></span>;
}

const badges = [
  { icon: FaUsers, value: '34K+', label: 'Followers', color: '#0F5132', pos: 'top-6 right-0' },
  { icon: FaAward, value: '38+', label: 'Yrs Leadership', color: '#FF6B00', pos: 'top-6 left-0' },
  { icon: FaStar, value: '100+', label: 'Programs', color: '#FFD700', pos: 'bottom-20 right-0' },
  { icon: FaHandshake, value: '50+', label: 'Initiatives', color: '#0F5132', pos: 'bottom-20 left-0' },
];

export default function Hero() {
  const [heroData, setHeroData] = useState({
    titleLine1: 'K P Singh',
    titleLine2: 'Kasana',
    subtitle: 'Since 1988, I have stood beside the people — not above them. Every step has been for the community I call home.',
    buttonText: 'Our Vision',
    buttonLink: '#vision'
  });

  useEffect(() => {
    const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
    fetch(`${apiUrl}/portfolio-website/kp-kasana-portfolio`)
      .then(res => res.json())
      .then(data => {
        if (data.success && data.data && data.data.hero) {
          setHeroData(data.data.hero);
        }
      })
      .catch(err => console.error("Error fetching hero data:", err));
  }, []);

  const go = (id) => document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section id="hero" className="relative min-h-screen flex items-center overflow-hidden"
      style={{ background: '#0B0F19' }}>

      {/* Full screen video background */}
      {heroData.backgroundVideoUrl && (
        <video
          className="absolute inset-0 w-full h-full object-cover"
          src={heroData.backgroundVideoUrl}
          autoPlay muted loop playsInline
        />
      )}

      {/* Dark overlay */}
      <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg,rgba(11,15,25,0.88) 0%,rgba(13,31,18,0.75) 40%,rgba(11,15,25,0.88) 100%)' }} />

      {/* Background blobs on top of video */}
      <motion.div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full pointer-events-none opacity-10"
        style={{ background: 'radial-gradient(circle,#0F5132,transparent)' }}
        animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 8, repeat: Infinity }} />
      <motion.div className="absolute bottom-0 left-0 w-96 h-96 rounded-full pointer-events-none opacity-8"
        style={{ background: 'radial-gradient(circle,#FF6B00,transparent)' }}
        animate={{ scale: [1, 1.15, 1] }} transition={{ duration: 10, repeat: Infinity, delay: 2 }} />

      {/* Grid overlay */}
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{ backgroundImage: 'linear-gradient(rgba(255,215,0,0.5) 1px,transparent 1px),linear-gradient(90deg,rgba(255,215,0,0.5) 1px,transparent 1px)', backgroundSize: '60px 60px' }} />

      {/* Particles */}
      {[...Array(18)].map((_, i) => (
        <motion.div key={i} className="absolute rounded-full pointer-events-none"
          style={{ width: 2 + (i % 3), height: 2 + (i % 3), left: `${5 + i * 5}%`, top: `${10 + (i * 17) % 80}%`, background: i % 3 === 0 ? '#FFD700' : i % 3 === 1 ? '#0F5132' : '#FF6B00', opacity: 0.35 }}
          animate={{ y: [0, -25, 0], opacity: [0.2, 0.6, 0.2] }}
          transition={{ duration: 3 + (i % 4), repeat: Infinity, delay: i * 0.2 }} />
      ))}

      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-24 pb-20 w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">

          {/* LEFT */}
          <div>
            <motion.div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 border border-green-800/40"
              style={{ background: 'rgba(15,81,50,0.2)' }}
              initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-xs font-semibold tracking-widest uppercase text-green-400">{heroData.tagline || 'SERVING THE PEOPLE SINCE 1988'}</span>
            </motion.div>

            <motion.h1 className="text-5xl md:text-6xl xl:text-7xl font-bold text-white leading-tight mb-4"
              style={{ fontFamily: 'Cinzel,serif' }}
              initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.2 }}>
              {heroData.titleLine1}
              <br />
              <span style={{ background: 'linear-gradient(135deg,#FFD700,#FF6B00,#FFD700)', backgroundSize: '200% auto', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                {heroData.titleLine2}
              </span>
            </motion.h1>

            <motion.div className="text-xl md:text-2xl font-semibold text-orange-500 mb-6 h-8"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }}>
              <TypingText words={titles} />
            </motion.div>

            <motion.p className="text-gray-400 text-base md:text-lg leading-relaxed mb-8 max-w-lg"
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9 }}>
              {heroData.subtitle}
            </motion.p>

            {/* Buttons */}
            <motion.div className="flex flex-wrap gap-4 mb-10"
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.1 }}>
              {(heroData.buttons || []).map((btn, idx) => {
                const styles = [
                  { bg: 'linear-gradient(135deg,#0F5132,#1a7a4a)', shadow: 'rgba(15,81,50,0.5)', border: false },
                  { bg: 'transparent', shadow: null, border: true },
                  { bg: 'linear-gradient(135deg,#FF6B00,#ff8c00)', shadow: 'rgba(255,107,0,0.4)', border: false }
                ];
                const btnStyle = styles[idx % styles.length];
                return (
                  <motion.button key={btn.label + idx} onClick={() => go(btn.link)}
                    className="px-7 py-3.5 rounded-full text-sm font-semibold tracking-wider uppercase cursor-pointer text-white"
                    style={{ background: btnStyle.bg, border: btnStyle.border ? '2px solid #FFD700' : 'none', color: btnStyle.border ? '#FFD700' : '#fff', boxShadow: btnStyle.shadow ? `0 0 20px ${btnStyle.shadow}` : 'none' }}
                    whileHover={{ scale: 1.06, boxShadow: btnStyle.shadow ? `0 0 35px ${btnStyle.shadow}` : 'none' }}
                    whileTap={{ scale: 0.97 }}>
                    {btn.label}
                  </motion.button>
                );
              })}
            </motion.div>

            {/* Stats row */}
            <motion.div className="flex gap-8" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.3 }}>
              {[{ v: '34K+', l: 'People With Us' }, { v: '38+', l: 'Years Served' }, { v: '100+', l: 'Programs' }].map(s => (
                <div key={s.l}>
                  <div className="text-2xl font-bold" style={{ fontFamily: 'Cinzel,serif', background: 'linear-gradient(135deg,#FFD700,#FF6B00)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{s.v}</div>
                  <div className="text-xs text-gray-500 tracking-wider">{s.l}</div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* RIGHT - Portrait */}
          <div className="relative flex items-center justify-center">
            {/* Rotating rings */}
            <motion.div className="absolute w-[420px] h-[420px] rounded-full border border-dashed border-yellow-400/15"
              animate={{ rotate: 360 }} transition={{ duration: 30, repeat: Infinity, ease: 'linear' }} />
            <motion.div className="absolute w-[360px] h-[360px] rounded-full border border-green-800/20"
              animate={{ rotate: -360 }} transition={{ duration: 20, repeat: Infinity, ease: 'linear' }} />
            <div className="absolute w-[300px] h-[300px] rounded-full pointer-events-none"
              style={{ background: 'radial-gradient(circle,rgba(15,81,50,0.2),transparent)' }} />

            {/* Image */}
            <motion.div
              className="relative z-10"
              style={{ animation: 'float 6s ease-in-out infinite' }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, duration: 1, ease: 'backOut' }}
            >
              <div className="relative rounded-full p-[3px]"
                style={{ background: 'linear-gradient(45deg,#FFD700,#FF6B00,#0F5132,#FFD700)', backgroundSize: '300% 300%', animation: 'borderAnim 4s linear infinite' }}>
                <div className="rounded-full overflow-hidden w-[280px] h-[280px]"
                  style={{ boxShadow: '0 0 60px rgba(15,81,50,0.4),0 0 100px rgba(255,215,0,0.08)' }}>
                  <img src={heroData.profileImageUrl || '/Kp image.png'} alt="Profile" className="w-full h-full object-cover" />
                </div>
              </div>
            </motion.div>

            {/* Badges */}
            {badges.map((b, i) => {
              const Icon = b.icon;
              return (
                <motion.div key={b.label}
                  className={`absolute ${b.pos} flex items-center gap-2 px-3 py-2 rounded-2xl backdrop-blur-xl min-w-[120px]`}
                  style={{ background: 'rgba(255,255,255,0.05)', border: `1px solid ${b.color}30` }}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.5 + i * 0.15, type: 'spring', stiffness: 200 }}
                  whileHover={{ scale: 1.08 }}
                >
                  <Icon style={{ color: b.color }} className="text-lg" />
                  <div>
                    <div className="text-white font-bold text-sm leading-none">{b.value}</div>
                    <div className="text-gray-400 text-xs">{b.label}</div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Scroll down */}
      <motion.button onClick={() => go('#about')}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer"
        animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity }}>
        <span className="text-xs tracking-widest text-gray-500 uppercase">Scroll Down</span>
        <FaChevronDown className="text-yellow-400" />
      </motion.button>

      {/* Marquee strip */}
      <div className="absolute bottom-0 left-0 right-0 overflow-hidden py-3 border-t border-yellow-400/10"
        style={{ background: 'rgba(15,81,50,0.12)' }}>
        <div className="flex gap-12 whitespace-nowrap" style={{ animation: 'marquee 20s linear infinite' }}>
          {[...Array(6)].map((_, i) => (
            <span key={i} className="flex items-center gap-4 text-sm font-medium text-white/30">
              <span className="text-yellow-400">✦</span> A Leader Who Listens
              <span className="text-yellow-400">✦</span> Voice for the People
              <span className="text-yellow-400">✦</span> Building from the Ground
              <span className="text-yellow-400">✦</span> 38 Years, Still Going
            </span>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-18px)} }
        @keyframes borderAnim { 0%,100%{background-position:0% 50%} 50%{background-position:100% 50%} }
        @keyframes marquee { 0%{transform:translateX(0)} 100%{transform:translateX(-50%)} }
      `}</style>
    </section>
  );
}
