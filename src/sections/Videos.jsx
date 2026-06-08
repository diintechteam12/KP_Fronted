import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPlay, FaTimes, FaClock } from 'react-icons/fa';
import SectionTitle from '../components/SectionTitle';
import { videos } from '../data/data';

const localVideos = [
  {
    id: 'local1',
    title: 'K P Singh Kasana - Introduction',
    thumb: '/Kp image.png',
    src: '/K_P_Singh_Kasana_introduction_202606081445.mp4',
    duration: 'Local Video',
    isLocal: true,
  },
  {
    id: 'local2',
    title: 'K P Singh Kasana - Introduction Part 2',
    thumb: '/Kp image.png',
    src: '/K_P_Singh_Kasana_introduction_202606081445 (1).mp4',
    duration: 'Local Video',
    isLocal: true,
  },
];

const allVideos = [...localVideos, ...videos];

export default function Videos() {
  const [modal, setModal] = useState(null);

  return (
    <section id="videos" className="py-24 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <SectionTitle subtitle="Watch & Listen" title="See the Work" highlight="For Yourself"
          desc="In rallies, in villages, among the people — these videos are proof of what actually happened." />

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {allVideos.map((v, i) => (
            <motion.div key={v.id}
              className="relative rounded-2xl overflow-hidden cursor-pointer group"
              style={{ boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
              whileHover={{ y: -6, boxShadow: '0 20px 50px rgba(0,0,0,0.2)' }}
              onClick={() => setModal(v)}>
              <img src={v.thumb} alt={v.title} className="w-full object-cover transition-transform duration-700 group-hover:scale-110" style={{ height: 200 }} />
              <div className="absolute inset-0 transition-all duration-300"
                style={{ background: 'linear-gradient(to top,rgba(11,15,25,0.88) 0%,rgba(0,0,0,0.2) 100%)' }} />
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div className="w-14 h-14 rounded-full flex items-center justify-center bg-yellow-400/90" whileHover={{ scale: 1.15 }}>
                  <FaPlay style={{ color: '#0B0F19', marginLeft: 3 }} />
                </motion.div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <p className="text-white font-semibold text-sm leading-snug mb-1">{v.title}</p>
                <div className="flex items-center gap-1 text-xs text-gray-400">
                  <FaClock size={10} /><span>{v.duration}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {modal && (
          <motion.div className="fixed inset-0 z-[99999] flex items-center justify-center p-4 bg-black/95"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setModal(null)}>
            <motion.div className="relative w-full max-w-3xl rounded-2xl overflow-hidden"
              initial={{ scale: 0.8 }} animate={{ scale: 1 }} exit={{ scale: 0.8 }} onClick={e => e.stopPropagation()}>

              {modal.isLocal ? (
                <video
                  className="w-full rounded-2xl"
                  src={modal.src}
                  controls
                  autoPlay
                  style={{ maxHeight: '80vh' }}
                />
              ) : (
                <div className="relative" style={{ paddingTop: '56.25%' }}>
                  <iframe className="absolute inset-0 w-full h-full"
                    src={`https://www.youtube.com/embed/${modal.url.split('v=')[1]}?autoplay=1`}
                    title={modal.title} allow="autoplay; fullscreen" frameBorder="0" />
                </div>
              )}

              <button onClick={() => setModal(null)}
                className="absolute top-3 right-3 w-9 h-9 rounded-full flex items-center justify-center text-white cursor-pointer bg-white/15 z-10">
                <FaTimes />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
