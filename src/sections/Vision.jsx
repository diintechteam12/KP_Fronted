import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes } from 'react-icons/fa';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import SectionTitle from '../components/SectionTitle';
import { initiatives } from '../data/data';
import { useLocalized } from '../context/LanguageContext';

export default function Vision() {
  const [visionData, setVisionData] = useState({
    sectionSubtitle: 'What We Stand For',
    sectionTitle: 'A Future Worth',
    sectionHighlight: 'Fighting For',
    sectionDesc: 'These are the things we have been working on — and will keep working on.',
  });
  const [selectedInitiative, setSelectedInitiative] = useState(null);

  useEffect(() => {
    const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
    fetch(`${apiUrl}/portfolio-website/kp-kasana-portfolio`)
      .then(res => res.json())
      .then(data => {
        if (data.success && data.data && data.data.vision) {
          setVisionData(prev => ({ ...prev, ...data.data.vision }));
        }
      })
      .catch(err => console.error("Error fetching vision data:", err));
  }, []);

  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (selectedInitiative) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedInitiative]);

  const localizedVision = useLocalized(visionData);
  const localizedInitiatives = useLocalized(initiatives);

  return (
    <section id="initiatives" className="py-24 relative overflow-hidden"
      style={{ background: 'linear-gradient(135deg,#0B0F19 0%,#0d1a10 50%,#0B0F19 100%)' }}>
      
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full opacity-10"
          style={{ backgroundImage: 'radial-gradient(circle at 20% 20%,#0F5132 0%,transparent 50%),radial-gradient(circle at 80% 80%,#FF6B00 0%,transparent 50%)' }} />
        <div className="absolute inset-0 opacity-[0.04]"
          style={{ backgroundImage: 'linear-gradient(rgba(255,215,0,0.4) 1px,transparent 1px),linear-gradient(90deg,rgba(255,215,0,0.4) 1px,transparent 1px)', backgroundSize: '80px 80px' }} />
      </div>

      <div className="max-w-[1400px] mx-auto px-6 relative z-10">
        <SectionTitle 
          subtitle={localizedVision.sectionSubtitle} 
          title={localizedVision.sectionTitle} 
          highlight={localizedVision.sectionHighlight}
          desc={localizedVision.sectionDesc} 
          light 
        />
        
        <div className="mt-12">
          <Swiper 
            modules={[Autoplay, Pagination]} 
            spaceBetween={24} 
            slidesPerView={1.2}
            breakpoints={{ 
              640: { slidesPerView: 2.2 }, 
              768: { slidesPerView: 3.2 }, 
              1024: { slidesPerView: 4.2 },
              1280: { slidesPerView: 5 }
            }}
            autoplay={{ delay: 3500, disableOnInteraction: false }}
            pagination={{ clickable: true }} 
            className="pb-16 px-4"
          >
            {localizedInitiatives.filter(item => !item.title.toLowerCase().includes('culture') && !item.category?.toLowerCase().includes('culture')).map((item, i) => (
              <SwiperSlide key={item.id} className="h-auto">
                <motion.div
                  className="relative rounded-2xl overflow-hidden group cursor-pointer w-full h-full flex flex-col"
                  style={{ aspectRatio: '9/16', boxShadow: '0 10px 30px rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.05)' }}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  {/* Background Image */}
                  <img 
                    src={item.image} 
                    alt={item.title} 
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                    style={{ objectPosition: item.objPos || 'center center' }} 
                  />
                  
                  {/* Persistent Dark Gradient Overlay for Text Readability */}
                  <div className="absolute inset-0 transition-all duration-300 opacity-90"
                    style={{ background: `linear-gradient(to top, #0B0F19 0%, rgba(11,15,25,0.7) 60%, transparent 100%)` }} />
                  
                  {/* Content Overlay */}
                  <div className="absolute inset-0 z-10 flex flex-col justify-end p-6 pb-6">
                    <div className="transition-all duration-500">
                      <h3 className="text-white font-bold text-xl mb-2 leading-snug" style={{ fontFamily: 'Playfair Display,serif' }}>
                        {item.title}
                      </h3>
                      <p className="text-gray-300 text-sm leading-relaxed mb-4 line-clamp-3">
                        {item.desc}
                      </p>
                    </div>
                    <button 
                      onClick={() => setSelectedInitiative(item)}
                      className="bg-black/70 backdrop-blur-sm border border-[#FFD700]/40 text-[#FFD700] px-4 py-1.5 rounded-full font-semibold text-xs hover:bg-[#FFD700] hover:text-black transition-all self-start shadow-lg">
                      know more...
                    </button>
                  </div>
                  
                  {/* Subtle Top Border Highlight */}
                  <div className="absolute top-0 left-0 right-0 h-[3px] z-20" style={{ background: `linear-gradient(90deg,transparent,${item.color || '#FFD700'},transparent)` }} />
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      {/* MODAL POPUP */}
      <AnimatePresence>
        {selectedInitiative && (
          <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }} 
              onClick={() => setSelectedInitiative(null)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />
            
            {/* Modal Content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-[600px] bg-[#0B0F19] border border-white/10 rounded-2xl shadow-2xl flex flex-col my-auto mx-4"
            >
              {/* Close Button */}
              <button 
                onClick={() => setSelectedInitiative(null)}
                className="absolute top-3 right-3 md:top-4 md:right-4 w-10 h-10 flex items-center justify-center bg-white/10 hover:bg-[#FFD700] hover:text-black text-white rounded-full transition-colors z-20 backdrop-blur-sm active:scale-95"
              >
                <FaTimes size={16} />
              </button>
              {/* Text Content (Scrollable) */}
              <div 
                className="p-6 md:p-8 overflow-y-auto custom-scrollbar overscroll-contain rounded-2xl" 
                style={{ maxHeight: 'calc(100vh - 4rem)' }}
              >
                <div className="flex items-center gap-2 mb-3">
                  <span className="w-8 h-[1px] bg-[#FFD700]" />
                  <span className="text-[#FFD700] text-xs font-bold uppercase tracking-wider">Detail Overview</span>
                </div>
                
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 leading-tight" style={{ fontFamily: 'Playfair Display,serif' }}>
                  {selectedInitiative.title}
                </h3>
                
                {/* We render the full description. Since the card desc might be truncated, this shows everything. */}
                <p className="text-gray-300 text-sm md:text-base leading-relaxed whitespace-pre-wrap">
                  {selectedInitiative.desc}
                </p>
                
                {/* Action button inside modal if needed */}
                <div className="mt-8">
                  <button 
                    onClick={() => setSelectedInitiative(null)}
                    className="w-full py-3 rounded-full font-semibold text-black transition-colors"
                    style={{ background: 'linear-gradient(90deg, #FFD700, #FDB931)' }}>
                    Close
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </section>
  );
}
