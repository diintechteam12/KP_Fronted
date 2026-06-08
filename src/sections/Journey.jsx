import { motion } from 'framer-motion';
import SectionTitle from '../components/SectionTitle';
import { timeline } from '../data/data';

export default function Journey() {
  return (
    <section id="journey" className="py-24 bg-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-80 h-80 rounded-full opacity-[0.04] pointer-events-none"
        style={{ background: 'radial-gradient(circle,#0F5132,transparent)' }} />

      <div className="max-w-5xl mx-auto px-6">
        <SectionTitle subtitle="My Journey" title="Leadership" highlight="Timeline"
          desc="38 years of dedicated service, transformative leadership, and community development." />

        <div className="relative">
          {/* Center line */}
          <motion.div className="absolute left-1/2 top-0 bottom-0 w-[2px] -translate-x-1/2 origin-top"
            style={{ background: 'linear-gradient(to bottom,transparent,#FFD700,#0F5132,transparent)' }}
            initial={{ scaleY: 0 }} whileInView={{ scaleY: 1 }} viewport={{ once: true }}
            transition={{ duration: 2, ease: 'easeInOut' }} />

          {timeline.map((item, i) => {
            const left = i % 2 === 0;
            return (
              <div key={i} className={`relative flex items-center mb-12 ${left ? 'flex-row' : 'flex-row-reverse'}`}>
                {/* Card */}
                <motion.div className={`w-5/12 ${left ? 'pr-10 text-right' : 'pl-10'}`}
                  initial={{ opacity: 0, x: left ? -50 : 50 }} whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }} transition={{ duration: 0.7 }}>
                  <div className="inline-block p-5 rounded-2xl bg-gray-50 border border-gray-100 group hover:shadow-xl transition-shadow duration-300"
                    style={{ boxShadow: '0 8px 25px rgba(0,0,0,0.05)' }}>
                    <h3 className="font-bold text-gray-900 text-lg mb-2" style={{ fontFamily: 'Playfair Display,serif' }}>{item.title}</h3>
                    <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </motion.div>

                {/* Center dot */}
                <div className="absolute left-1/2 -translate-x-1/2 z-10">
                  <motion.div className="w-12 h-12 rounded-full flex items-center justify-center text-white text-xs font-bold"
                    style={{ background: 'linear-gradient(135deg,#0F5132,#1a7a4a)', boxShadow: '0 0 20px rgba(15,81,50,0.5)', fontFamily: 'Cinzel,serif' }}
                    initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: true }}
                    transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
                    whileHover={{ scale: 1.2 }}>
                    {item.year.slice(2)}
                  </motion.div>
                </div>

                {/* Year badge */}
                <motion.div className={`w-5/12 ${left ? 'pl-10' : 'pr-10 text-right'}`}
                  initial={{ opacity: 0, x: left ? 30 : -30 }} whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.15 }}>
                  <span className="inline-block px-4 py-1.5 rounded-full text-sm font-bold text-white"
                    style={{ background: 'linear-gradient(135deg,#FFD700,#FF6B00)', fontFamily: 'Cinzel,serif' }}>
                    {item.year}
                  </span>
                </motion.div>
              </div>
            );
          })}

          {/* End marker */}
          <div className="flex justify-center mt-4">
            <motion.div className="px-6 py-3 rounded-full font-bold text-white"
              style={{ background: 'linear-gradient(135deg,#0F5132,#1a7a4a)', boxShadow: '0 0 25px rgba(15,81,50,0.5)', fontFamily: 'Cinzel,serif' }}
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              Present Day ✦
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
