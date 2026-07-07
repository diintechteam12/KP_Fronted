import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaFacebook, FaInstagram, FaYoutube, FaLinkedin, FaHeart } from 'react-icons/fa';

const links = [
  { label: 'About', href: '#about' },
  { label: 'Vision', href: '#vision' },
  { label: 'Journey', href: '#journey' },
  { label: 'Achievements', href: '#achievements' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Contact', href: '#contact' },
];

export default function Footer() {
  const go = (href) => document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });

  const [footerData, setFooterData] = useState({
    logoText: 'K. P. Kasana',
    logoImage: '/Kp image.png',
    description: 'Since 1988 — a promise that was never broken. Your pain is his pain, your progress is his progress.',
    servingYear: '1988',
    copyrightText: '© 2024 K. P. Kasana. All rights reserved.'
  });

  const [visionDesc, setVisionDesc] = useState('"A community where no child goes to bed hungry, no woman goes unheard, and no young person is left without a chance."');

  const [socials, setSocials] = useState([
    { Icon: FaFacebook, color: '#1877F2', href: '#' },
    { Icon: FaInstagram, color: '#E4405F', href: '#' },
    { Icon: FaYoutube, color: '#FF0000', href: '#' },
    { Icon: FaLinkedin, color: '#0A66C2', href: '#' }
  ]);

  useEffect(() => {
    const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
    fetch(`${apiUrl}/portfolio-website/kp-kasana-portfolio`)
      .then(res => res.json())
      .then(data => {
        if (data.success && data.data) {
          if (data.data.footer) {
            setFooterData(prev => ({ ...prev, ...data.data.footer }));
          }
          if (data.data.vision && data.data.vision.sectionDesc) {
            setVisionDesc(data.data.vision.sectionDesc);
          }
          if (data.data.contact) {
            const { facebook, instagram, youtube, linkedin } = data.data.contact;
            setSocials([
              { Icon: FaFacebook, color: '#1877F2', href: facebook || '#' },
              { Icon: FaInstagram, color: '#E4405F', href: instagram || '#' },
              { Icon: FaYoutube, color: '#FF0000', href: youtube || '#' },
              { Icon: FaLinkedin, color: '#0A66C2', href: linkedin || '#' }
            ]);
          }
        }
      })
      .catch(err => console.error("Error fetching footer data:", err));
  }, []);

  // Filter out empty social links
  const activeSocials = socials.filter(s => s.href && s.href !== '#');

  return (
    <footer className="relative overflow-hidden pt-16 pb-8" style={{ backgroundColor: '#0b140f' }}>
      {/* Divider top */}
      <div className="absolute top-0 left-0 right-0 h-[2px]"
        style={{ background: 'linear-gradient(90deg,transparent,#FFD700,#0F5132,#FF6B00,transparent)' }} />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-5">
              <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-green-700 bg-white"
                style={{ boxShadow: '0 0 20px rgba(15,81,50,0.5)' }}>
                <img src={footerData.logoImage} alt="Logo" className="w-full h-full object-cover" />
              </div>
              <span className="text-white text-xl font-bold uppercase tracking-wide" style={{ fontFamily: 'Cinzel,serif' }}>
                {footerData.logoText}
              </span>
            </div>
              <p className="text-gray-400 text-sm leading-relaxed mb-5">
                {footerData.description}
              </p>
              <div className="flex gap-3 flex-wrap">
                {activeSocials.map(({ Icon, color, href }, i) => (
                  <motion.a key={i} href={href} target="_blank" rel="noopener noreferrer"
                    className="w-9 h-9 rounded-lg flex items-center justify-center text-white cursor-pointer"
                    style={{ background: `${color}20`, border: `1px solid ${color}25` }}
                    whileHover={{ scale: 1.15, background: color }}>
                    <Icon size={14} />
                  </motion.a>
                ))}
              </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-[#FFD700] font-bold mb-5 tracking-wider text-sm uppercase">Quick Links</h4>
            <ul className="space-y-3">
              {links.map(l => (
                <li key={l.label}>
                  <button onClick={() => go(l.href)}
                    className="text-gray-400 hover:text-white text-sm transition-colors cursor-pointer flex items-center gap-2 group">
                    <span className="w-1 h-1 rounded-full bg-orange-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                    {l.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Vision */}
          <div>
            <h4 className="text-[#FFD700] font-bold mb-5 tracking-wider text-sm uppercase">Vision Statement</h4>
            <p className="text-gray-400 text-sm leading-relaxed italic">
              {visionDesc}
            </p>
            <div className="mt-6 p-4 rounded-xl border border-green-900/30 bg-green-900/10 inline-block">
              <p className="text-green-400 text-xs font-semibold tracking-widest uppercase mb-1">Serving Since</p>
              <p className="text-white font-bold text-2xl" style={{ fontFamily: 'Cinzel,serif' }}>{footerData.servingYear}</p>
            </div>
          </div>
        </div>

        {/* Large Text */}
        <div className="w-full text-center mb-12 flex flex-col gap-0 sm:gap-2">
          <h1 className="text-white font-black leading-tight text-4xl sm:text-6xl md:text-8xl lg:text-9xl" style={{ fontFamily: 'sans-serif' }}>
            के. पी.
          </h1>
          <h1 className="text-white font-black leading-tight text-4xl sm:text-6xl md:text-8xl lg:text-9xl" style={{ fontFamily: 'sans-serif' }}>
            कसाना
          </h1>
          
          <h2 className="text-gray-300 font-bold mt-4 whitespace-nowrap text-[15vw] sm:text-[12vw] md:text-[10vw] lg:text-[8vw] xl:text-[7vw] 2xl:text-[6vw]" style={{ fontFamily: 'sans-serif' }}>
            हर दिल का ठिकाना के. पी. कसाना
          </h2>
        </div>

        {/* Bottom */}
        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-600 text-sm">
            {footerData.copyrightText}
          </p>
          <p className="text-gray-600 text-sm flex flex-wrap items-center gap-1 justify-center md:justify-end text-center md:text-right">
            Made with <FaHeart className="text-red-500 text-xs mx-1" /> for the people <span className="mx-1 hidden sm:inline">|</span><br className="sm:hidden" /> Developed & Manages By <a href="https://diintech.com" target="_blank" rel="noopener noreferrer" className="text-[#FFD700] transition-colors ml-1 font-semibold">Diintech.com</a>
          </p>
        </div>
      </div>
    </footer>
  );
}
