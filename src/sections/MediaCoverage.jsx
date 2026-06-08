import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import { FaNewspaper, FaCalendar, FaArrowRight } from 'react-icons/fa';
import SectionTitle from '../components/SectionTitle';
import { mediaNews } from '../data/data';

export default function MediaCoverage() {
  return (
    <section id="media" className="py-24 relative overflow-hidden"
      style={{ background: 'linear-gradient(135deg,#0B0F19,#071a0e,#0B0F19)' }}>
      <div className="max-w-7xl mx-auto px-6">
        <SectionTitle subtitle="Media Coverage" title="In The" highlight="News"
          desc="National and regional media coverage of our impactful initiatives." light />

        <Swiper modules={[Autoplay, Pagination]} spaceBetween={24} slidesPerView={1}
          breakpoints={{ 640: { slidesPerView: 2 }, 1024: { slidesPerView: 3 } }}
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          pagination={{ clickable: true }} loop className="pb-12">
          {mediaNews.map((news, i) => (
            <SwiperSlide key={news.id}>
              <motion.div className="rounded-2xl overflow-hidden border border-white/5 backdrop-blur-xl"
                style={{ background: 'rgba(255,255,255,0.03)' }}
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                whileHover={{ y: -5, borderColor: 'rgba(255,215,0,0.2)' }}>
                <div className="relative overflow-hidden" style={{ height: 200 }}>
                  <img src={news.image} alt={news.title} className="w-full h-full object-cover transition-transform duration-700 hover:scale-110" />
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
