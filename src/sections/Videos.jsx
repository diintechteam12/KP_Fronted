import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPlay, FaTimes, FaClock } from 'react-icons/fa';
import SectionTitle from '../components/SectionTitle';

const localVideos = [
  { id: 'local1', title: 'K P Singh Kasana - Introduction', src: '/K_P_Singh_Kasana_introduction_202606081445.mp4', duration: 'Watch Now' },
  { id: 'local2', title: 'K P Singh Kasana - Introduction Part 2', src: '/K_P_Singh_Kasana_introduction_202606081445 (1).mp4', duration: 'Watch Now' },
  { id: 'local3', title: 'Hero Section Reels', src: '/Hero section reels.mp4', duration: 'Watch Now' },
  { id: 'local4', title: 'Community Reels', src: '/reels for vedio galry.mp4', duration: 'Watch Now' },
  { id: 'local5', title: 'New Reels', src: '/Vedio galry new reels.mp4', duration: 'Watch Now' },
];

export default function Videos() {
  const [modal, setModal] = useState(null);

  return (
    <section id="videos" className="py-24 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <SectionTitle subtitle="Watch & Listen" title="See the Work" highlight="For Yourself"
          desc="In rallies, in villages, among the people — these videos are proof of what actually happened." />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {localVideos.map((v, i) => (
            <motion.div key={v.id}
              className="relative rounded-2xl overflow-hidden cursor-pointer group bg-black"
              style={{ boxShadow: '0 10px 30px rgba(0,0,0,0.15)' }}
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
              whileHover={{ y: -6, boxShadow: '0 20px 50px rgba(0,0,0,0.25)' }}
              onClick={() => setModal(v)}>

              {/* Video preview */}
              <video
                className="w-full object-cover transition-transform duration-700 group-hover:scale-105"
                style={{ height: 220, display: 'block' }}
                src={v.src}
                muted
                playsInline
                preload="metadata"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all duration-300" />

              {/* Play button */}
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  className="w-16 h-16 rounded-full flex items-center justify-center"
                  style={{ background: 'rgba(255,215,0,0.9)', boxShadow: '0 0 30px rgba(255,215,0,0.5)' }}
                  whileHover={{ scale: 1.15 }}>
                  <FaPlay style={{ color: '#0B0F19', marginLeft: 4 }} size={18} />
                </motion.div>
              </div>

              {/* Title */}
              <div className="absolute bottom-0 left-0 right-0 p-4"
                style={{ background: 'linear-gradient(to top,rgba(0,0,0,0.85),transparent)' }}>
                <p className="text-white font-semibold text-sm leading-snug">{v.title}</p>
                <div className="flex items-center gap-1 text-xs text-gray-300 mt-1">
                  <FaClock size={10} /><span>{v.duration}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {modal && (
          <motion.div className="fixed inset-0 z-[99999] flex items-center justify-center p-4 bg-black/95"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setModal(null)}>
            <motion.div className="relative w-full max-w-3xl rounded-2xl overflow-hidden"
              initial={{ scale: 0.85 }} animate={{ scale: 1 }} exit={{ scale: 0.85 }} onClick={e => e.stopPropagation()}>
              <video
                className="w-full rounded-2xl"
                src={modal.src}
                controls
                autoPlay
                style={{ maxHeight: '82vh' }}
              />
              <button onClick={() => setModal(null)}
                className="absolute top-3 right-3 w-9 h-9 rounded-full flex items-center justify-center text-white cursor-pointer bg-black/50 z-10">
                <FaTimes />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
