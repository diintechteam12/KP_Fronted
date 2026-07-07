import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaExpand, FaPlay } from 'react-icons/fa';
import SectionTitle from '../components/SectionTitle';
import { useLanguage, useLocalized } from '../context/LanguageContext';

const catsEn = ['All', 'Public Meetings', 'Community Events', 'Social Service', 'Education Programs'];
const catsHi = ['सभी', 'सार्वजनिक बैठकें', 'सामुदायिक कार्यक्रम', 'समाज सेवा', 'शिक्षा कार्यक्रम'];

const renderVideo = (videoUrl) => {
    if (!videoUrl) return null;
    
    // Handle YouTube
    const ytMatch = videoUrl.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/i);
    if (ytMatch && ytMatch[1]) {
        return (
            <iframe 
                className="w-full aspect-video bg-black"
                src={`https://www.youtube.com/embed/${ytMatch[1]}?autoplay=1`}
                title="YouTube video player" 
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen
            ></iframe>
        );
    }
    
    // Handle Vimeo
    const vimeoMatch = videoUrl.match(/vimeo\.com\/(?:.*#|.*\/videos\/)?([0-9]+)/i);
    if (vimeoMatch && vimeoMatch[1]) {
        return (
            <iframe 
                className="w-full aspect-video bg-black"
                src={`https://player.vimeo.com/video/${vimeoMatch[1]}?autoplay=1`}
                frameBorder="0" 
                allow="autoplay; fullscreen; picture-in-picture" 
                allowFullScreen
            ></iframe>
        );
    }

    // Handle direct MP4 / WebM
    return (
        <video 
            className="w-full aspect-video bg-black"
            controls 
            autoPlay 
            src={videoUrl}
        >
            Your browser does not support the video tag.
        </video>
    );
};

export default function Gallery() {
  const { lang } = useLanguage();
  const cats = lang === 'hi' ? catsHi : catsEn;
  const [active, setActive] = useState('All');
  const [lb, setLb] = useState(null);
  const [images, setImages] = useState([]);

  useEffect(() => {
    const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
    fetch(`${apiUrl}/gallery`, {
      headers: { 'x-client-slug': 'kp-kasana-portfolio' }
    })
      .then(res => res.json())
      .then(res => {
        if (res.success && res.data) {
          setImages(res.data.filter(img => img.status === 'active'));
        }
      })
      .catch(err => console.error("Error fetching gallery:", err));
  }, []);

  // Keep active filter logic independent of language by mapping it if needed,
  // but since active state is just a string, let's map the 'active' back to English to filter if DB images are English.
  // Actually, images might come from DB with English categories, so we filter by English category.
  const activeEn = catsEn[cats.indexOf(active)] || 'All';
  const filtered = active === 'All' || active === 'सभी' ? images : images.filter(g => g.category === activeEn);

  return (
    <section id="gallery" className="py-24 relative overflow-hidden"
      style={{ background: 'linear-gradient(135deg,#0B0F19,#0d1a10,#0B0F19)' }}>

      <div className="max-w-7xl mx-auto px-6">
        <SectionTitle 
          subtitle={lang === 'hi' ? 'प्रगति पर कार्य' : 'The Work In Progress'} 
          title={lang === 'hi' ? 'मैदान के कुछ' : 'Moments From'} 
          highlight={lang === 'hi' ? 'खास पल' : 'The Field'}
          desc={lang === 'hi' ? 'यह कोई फोटो शूट नहीं है। ये असली जगहों से, असली लोगों के साथ बिताए गए असली पल हैं।' : 'Not a photo shoot. These are real moments from real places with real people.'} 
          light 
        />

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
              <motion.div key={img._id || i}
                className="break-inside-avoid relative group cursor-pointer rounded-2xl overflow-hidden"
                style={{ boxShadow: '0 10px 30px rgba(0,0,0,0.3)' }}
                initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }} transition={{ duration: 0.4, delay: i * 0.06 }}
                onClick={() => setLb(img)} whileHover={{ y: -4 }}>
                <img src={img.image || img.src} alt={img.title} className="w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  style={{ minHeight: i % 3 === 0 ? 280 : 200 }} />
                
                {img.mediaType === 'video' && (
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
                    <div className="w-12 h-12 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center text-white shadow-lg">
                      <FaPlay className="ml-1" size={18} />
                    </div>
                  </div>
                )}

                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-end p-5 z-20"
                  style={{ background: 'linear-gradient(to top,rgba(11,15,25,0.9) 0%,transparent 60%)' }}>
                  <div className="flex items-end justify-between w-full">
                    <div>
                      <p className="text-white font-semibold">{lang === 'hi' && img.titleHi ? img.titleHi : img.title}</p>
                      <p className="text-xs text-yellow-400">{lang === 'hi' ? catsHi[catsEn.indexOf(img.category)] || img.category : img.category}</p>
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
              {lb.mediaType === 'video' && lb.videoUrl ? (
                  renderVideo(lb.videoUrl)
              ) : (
                  <img src={lb.image || lb.src} alt={lb.title} className="w-full object-cover" />
              )}
              <div className={`absolute bottom-0 left-0 right-0 p-6 ${lb.mediaType === 'video' ? 'opacity-0 hover:opacity-100 transition-opacity' : ''}`}
                style={{ background: 'linear-gradient(to top,rgba(0,0,0,0.9),transparent)' }}>
                <p className="text-white font-bold text-xl" style={{ fontFamily: 'Playfair Display,serif' }}>{lang === 'hi' && lb.titleHi ? lb.titleHi : lb.title}</p>
                <p className="text-yellow-400 text-sm">{lang === 'hi' ? catsHi[catsEn.indexOf(lb.category)] || lb.category : lb.category}</p>
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
