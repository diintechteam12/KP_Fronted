import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import { FaQuoteLeft, FaStar } from 'react-icons/fa';
import SectionTitle from '../components/SectionTitle';
import { testimonials } from '../data/data';

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-24 bg-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{ backgroundImage: 'radial-gradient(circle at 20% 50%,#0F5132 0%,transparent 50%),radial-gradient(circle at 80% 50%,#FF6B00 0%,transparent 50%)' }} />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <SectionTitle subtitle="People Say It Best" title="Straight From" highlight="Their Mouths"
          desc="No award means more than what the people you served actually say about you." />

        <Swiper modules={[Autoplay, Pagination]} spaceBetween={24} slidesPerView={1}
          breakpoints={{ 768: { slidesPerView: 2 }, 1280: { slidesPerView: 3 } }}
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          pagination={{ clickable: true }} loop className="pb-12">
          {testimonials.map((t, i) => (
            <SwiperSlide key={t.id}>
              <motion.div className="p-6 rounded-2xl relative overflow-hidden h-full"
                style={{ background: 'linear-gradient(135deg,rgba(15,81,50,0.03),rgba(255,215,0,0.03))', border: '1px solid rgba(15,81,50,0.1)', boxShadow: '0 8px 30px rgba(15,81,50,0.05)' }}
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                whileHover={{ y: -5, boxShadow: '0 20px 50px rgba(15,81,50,0.1)' }}>

                <FaQuoteLeft className="text-4xl mb-4 text-green-800/15" />
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, s) => <FaStar key={s} size={13} className="text-yellow-400" />)}
                </div>
                <p className="text-gray-600 text-sm leading-relaxed mb-6 italic">"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <img src={t.avatar} alt={t.name} className="w-12 h-12 rounded-full object-cover border-2 border-green-800" />
                  <div>
                    <p className="font-bold text-gray-900">{t.name}</p>
                    <p className="text-xs text-green-800">{t.role}</p>
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-[2px]"
                  style={{ background: 'linear-gradient(90deg,#0F5132,#FFD700,#FF6B00)' }} />
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
