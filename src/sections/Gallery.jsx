import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaExpand } from 'react-icons/fa';
import SectionTitle from '../components/SectionTitle';
import { galleryImages } from '../data/data';

const cats = ['All', 'Public Meetings', 'Community Events', 'Social Service', 'Education Programs'];

export default function Gallery() {
  const [active, setActive] = useState('All');
  const [lb, setLb] = useState(null);
  const filtered = active === 'All' ? galleryImages : galleryImages.filter(g => g.category === active);

  return (
    <section id="gallery" className="py-24 relative overflow-hidden"
      style={{ background: 'linear-gradient(135deg,#0B0F19,#0d1a10,#0B0F19)' }}>

      <div className="max-w-7xl mx-auto px-6">
        <SectionTitle subtitle="Photo Gallery" title="Moments of" highlight="Service & Leadership" light />

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {cats.map(c => (
            <motion.button key={c} onClick={() => setActive(c)}
              className="px-5 py-2 rounded-full text-sm font-semibold cursor-pointer transition-all"
              style={{
                background: active === c ? 'linear-gradient(135deg,#0F5132,#1a7a4a)' : 'rgba(255,255,255,0.05)',
                color: active === c ? '#fff' : 'rgba(255,255,255,0.55)',
                border: active === c ? 'none' : '1px solid rgba(255,255,255,0.1)',
                boxShadow: active === c ? '0 0 20px rgba(15,81,50,0.5)' : 'none',
              }}
              whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
              {c}
            </motion.button>
          ))}
        </div>

        {/* Masonry */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
          <AnimatePresence>
            {filtered.map((img, i) => (
              <motion.div key={img.id}
                className="break-inside-avoid relative group cursor-pointer rounded-2xl overflow-hidden"
                style={{ boxShadow: '0 10px 30px rgba(0,0,0,0.3)' }}
                initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }} transition={{ duration: 0.4, delay: i * 0.06 }}
                onClick={() => setLb(img)} whileHover={{ y: -4 }}>
                <img src={img.src} alt={img.title} className="w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  style={{ minHeight: i % 3 === 0 ? 280 : 200 }} />
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-end p-5"
                  style={{ background: 'linear-gradient(to top,rgba(11,15,25,0.9) 0%,transparent 60%)' }}>
                  <div className="flex items-end justify-between w-full">
                    <div>
                      <p className="text-white font-semibold">{img.title}</p>
                      <p className="text-xs text-yellow-400">{img.category}</p>
                    </div>
                    <FaExpand className="text-white/70" />
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lb && (
          <motion.div className="fixed inset-0 z-[99999] flex items-center justify-center p-4 bg-black/95"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setLb(null)}>
            <motion.div className="relative max-w-4xl w-full rounded-2xl overflow-hidden"
              initial={{ scale: 0.8 }} animate={{ scale: 1 }} exit={{ scale: 0.8 }}
              onClick={e => e.stopPropagation()}>
              <img src={lb.src} alt={lb.title} className="w-full object-cover" />
              <div className="absolute bottom-0 left-0 right-0 p-6"
                style={{ background: 'linear-gradient(to top,rgba(0,0,0,0.9),transparent)' }}>
                <p className="text-white font-bold text-xl" style={{ fontFamily: 'Playfair Display,serif' }}>{lb.title}</p>
                <p className="text-yellow-400 text-sm">{lb.category}</p>
              </div>
              <button onClick={() => setLb(null)}
                className="absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center text-white cursor-pointer bg-white/10">
                <FaTimes />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
