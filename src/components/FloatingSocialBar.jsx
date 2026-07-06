import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaFacebook, FaInstagram, FaLinkedin, FaYoutube } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6'; // FontAwesome 6 has the X icon

export default function FloatingSocialBar() {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const socials = [
    { name: 'Facebook', icon: FaFacebook, color: '#1877F2', href: '#' },
    { name: 'Instagram', icon: FaInstagram, color: '#E4405F', href: '#' }, // We will use a gradient background for Instagram to match the image, but solid color for text if needed. Image shows solid bg for icons.
    { name: 'LinkedIn', icon: FaLinkedin, color: '#0A66C2', href: '#' },
    { name: 'X', icon: FaXTwitter, color: '#000000', href: '#' },
    { name: 'YouTube', icon: FaYoutube, color: '#FF0000', href: '#' },
  ];

  return (
    <div className="fixed right-0 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-3 bg-[#eab308] p-2 rounded-l-2xl shadow-[0_0_15px_rgba(234,179,8,0.5)]">
      {socials.map((social, i) => (
        <div 
          key={social.name}
          className="relative flex items-center justify-center"
          onMouseEnter={() => setHoveredIndex(i)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          {/* Tooltip */}
          <AnimatePresence>
            {hoveredIndex === i && (
              <motion.div
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                transition={{ duration: 0.2 }}
                className="absolute right-[calc(100%+12px)] bg-[#1a1a1a] text-white text-sm font-bold px-3 py-1.5 rounded-md whitespace-nowrap shadow-lg flex items-center"
              >
                {social.name}
                {/* Arrow pointing to the right */}
                <div className="absolute top-1/2 -translate-y-1/2 -right-1 w-2 h-2 bg-[#1a1a1a] rotate-45" />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Social Icon Button */}
          <a
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-full flex items-center justify-center text-white shadow-md transition-transform hover:scale-110"
            style={{ 
              background: social.name === 'Instagram' 
                ? 'linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)' 
                : social.color 
            }}
          >
            <social.icon size={18} />
          </a>
        </div>
      ))}
    </div>
  );
}
