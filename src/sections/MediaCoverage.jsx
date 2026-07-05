import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import { FaNewspaper, FaCalendar, FaArrowRight } from 'react-icons/fa';
import SectionTitle from '../components/SectionTitle';
import { mediaNews } from '../data/data';

export default function MediaCoverage() {
  const [events, setEvents] = useState(mediaNews); // start with dummy data

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
        const res = await fetch(`${apiUrl}/events`, {
          headers: {
            'x-client-slug': 'kp-kasana-portfolio'
          }
        });
        const json = await res.json();
        
        if (json.success && json.data) {
          // Filter active events
          const activeEvents = json.data.filter(e => e.isActive);
          
          // Map to match the frontend card structure
          const mappedEvents = activeEvents.map(e => ({
            id: e._id,
            title: e.title,
            date: new Date(e.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
            source: e.status.toUpperCase(), // Using status as the tag instead of newspaper source
            desc: e.description.replace(/<[^>]*>?/gm, ''), // strip HTML tags from RTE
            image: e.coverImage
          }));

          // Combine: real events first, then dummy data
          setEvents([...mappedEvents, ...mediaNews]);
        }
      } catch (err) {
        console.error('Failed to fetch events:', err);
      }
    };
    fetchEvents();
  }, []);

  return (
    <section id="media" className="py-24 relative overflow-hidden"
      style={{ background: 'linear-gradient(135deg,#0B0F19,#071a0e,#0B0F19)' }}>
      <div className="max-w-7xl mx-auto px-6">
        <SectionTitle subtitle="Our Events" title="Our Events &" highlight="Highlights"
          desc="Real work gets noticed. Here is what the press has been saying about the initiatives on the ground." light />

        <Swiper modules={[Autoplay, Pagination]} spaceBetween={24} slidesPerView={1}
          breakpoints={{ 640: { slidesPerView: 2 }, 1024: { slidesPerView: 3 } }}
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          pagination={{ clickable: true }} loop={events.length >= 4} className="pb-12">
          {events.map((news, i) => (
            <SwiperSlide key={news.id}>
              <motion.div className="rounded-2xl overflow-hidden border border-white/5 backdrop-blur-xl"
                style={{ background: 'rgba(255,255,255,0.03)' }}
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                whileHover={{ y: -5, borderColor: 'rgba(255,215,0,0.2)' }}>
                <div className="relative overflow-hidden" style={{ height: 200 }}>
                  <img src={news.image || undefined} alt={news.title} className="w-full h-full object-cover transition-transform duration-700 hover:scale-110" />
                  <div className="absolute inset-0" style={{ background: 'linear-gradient(to top,rgba(11,15,25,0.8),transparent)' }} />
                  <div className="absolute top-4 left-4 flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold bg-green-900/90 text-white">
                    <FaNewspaper size={10} />{news.source}
                  </div>
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-2 text-xs text-yellow-400 mb-3">
                    <FaCalendar size={10} />{news.date}
                  </div>
                  <h3 className="text-white font-bold text-base leading-snug mb-3" style={{ fontFamily: 'Playfair Display,serif' }}>{news.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed mb-4">{news.desc}</p>
                  <button className="flex items-center gap-2 text-sm font-semibold text-orange-500 cursor-pointer">
                    Read More <FaArrowRight size={12} />
                  </button>
                </div>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
