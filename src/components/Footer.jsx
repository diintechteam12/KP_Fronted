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

const socials = [
  { Icon: FaFacebook, color: '#1877F2', href: '#' },
  { Icon: FaInstagram, color: '#E4405F', href: '#' },
  { Icon: FaYoutube, color: '#FF0000', href: '#' },
  { Icon: FaLinkedin, color: '#0A66C2', href: '#' },
];

export default function Footer() {
  const go = (href) => document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <footer className="relative overflow-hidden pt-16 pb-8" style={{ background: '#060A12' }}>
      {/* Divider top */}
      <div className="absolute top-0 left-0 right-0 h-[2px]"
        style={{ background: 'linear-gradient(90deg,transparent,#FFD700,#0F5132,#FF6B00,transparent)' }} />

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-5">
              <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-green-700"
                style={{ boxShadow: '0 0 20px rgba(15,81,50,0.5)' }}>
                <img src="/Kp image.png" alt="KP" className="w-full h-full object-cover" />
              </div>
              <span className="text-white text-xl font-bold" style={{ fontFamily: 'Cinzel,serif' }}>
                KP Singh{' '}
                <span style={{ background: 'linear-gradient(135deg,#FFD700,#FF6B00)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                  Kasana
                </span>
              </span>
            </div>
            <p className="text-gray-500 text-sm leading-relaxed mb-5">
              Dedicated to empowering communities, supporting education, and creating a stronger future for society since 1988.
            </p>
            <div className="flex gap-3">
              {socials.map(({ Icon, color, href }, i) => (
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
            <h4 className="text-white font-bold mb-5 tracking-wider text-sm uppercase" style={{ color: '#FFD700' }}>Quick Links</h4>
            <ul className="space-y-3">
              {links.map(l => (
                <li key={l.label}>
                  <button onClick={() => go(l.href)}
                    className="text-gray-500 hover:text-white text-sm transition-colors cursor-pointer flex items-center gap-2 group">
                    <span className="w-1 h-1 rounded-full bg-orange-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                    {l.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Vision */}
          <div>
            <h4 className="text-white font-bold mb-5 tracking-wider text-sm uppercase" style={{ color: '#FFD700' }}>Vision Statement</h4>
            <p className="text-gray-500 text-sm leading-relaxed italic">
              "A society where every individual has the opportunity to grow, contribute, and live with dignity and purpose."
            </p>
            <div className="mt-6 p-4 rounded-xl border border-green-900/30 bg-green-900/10">
              <p className="text-green-400 text-xs font-semibold tracking-widest uppercase mb-1">Serving Since</p>
              <p className="text-white font-bold text-2xl" style={{ fontFamily: 'Cinzel,serif' }}>1988</p>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-600 text-sm">
            © 2024 K P Singh Kasana. All rights reserved.
          </p>
          <p className="text-gray-600 text-sm flex items-center gap-1">
            Made with <FaHeart className="text-red-500 text-xs" /> for the community
          </p>
        </div>
      </div>
    </footer>
  );
}
