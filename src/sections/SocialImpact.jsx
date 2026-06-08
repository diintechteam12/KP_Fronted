import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import SectionTitle from '../components/SectionTitle';
import { socialImpact } from '../data/data';

export default function SocialImpact() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 });

  return (
    <section id="impact" className="py-24 bg-white relative overflow-hidden">
      <div className="absolute top-0 left-0 w-96 h-96 rounded-full opacity-[0.04] pointer-events-none"
        style={{ background: 'radial-gradient(circle,#0F5132,transparent)' }} />

      <div className="max-w-7xl mx-auto px-6">
        <SectionTitle subtitle="On the Ground" title="How Much Has" highlight="Actually Changed"
          desc="These bars are not just metrics. Behind every line is a home that changed, a life that was saved." />

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Progress bars */}
          <div ref={ref} className="space-y-7">
            {socialImpact.map((item, i) => (
              <motion.div key={item.label}
                initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.12 }}>
                <div className="flex justify-between mb-2">
                  <span className="font-semibold text-gray-800">{item.label}</span>
                  <span className="font-bold text-green-800">{item.count}</span>
                </div>
                <div className="h-3 rounded-full bg-gray-100 overflow-hidden">
                  <motion.div className="h-full rounded-full"
                    style={{ background: 'linear-gradient(90deg,#0F5132,#FFD700)' }}
                    initial={{ width: 0 }}
                    animate={inView ? { width: `${item.value}%` } : { width: 0 }}
                    transition={{ duration: 1.5, delay: i * 0.2, ease: 'easeOut' }} />
                </div>
                <div className="text-right text-xs text-gray-400 mt-1">{item.value}%</div>
              </motion.div>
            ))}
          </div>

          {/* Circle stats */}
          <div className="grid grid-cols-2 gap-6">
            {[
              { value: '50K+', label: 'People Helped', color: '#0F5132', pct: 75 },
              { value: '200+', label: 'Programs Run', color: '#FF6B00', pct: 72 },
              { value: '10K+', label: 'Women Empowered', color: '#FFD700', pct: 90 },
              { value: '5K+', label: 'Youth Trained', color: '#0F5132', pct: 78 },
            ].map((item, i) => (
              <motion.div key={item.label} className="text-center p-6 rounded-2xl"
                style={{ background: `${item.color}08`, border: `1px solid ${item.color}20` }}
                initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
                transition={{ delay: i * 0.1, type: 'spring' }}
                whileHover={{ y: -5, boxShadow: `0 15px 40px ${item.color}20` }}>
                <div className="relative w-20 h-20 mx-auto mb-4">
                  <svg className="w-full h-full -rotate-90" viewBox="0 0 80 80">
                    <circle cx="40" cy="40" r="34" fill="none" stroke={`${item.color}20`} strokeWidth="6" />
                    <motion.circle cx="40" cy="40" r="34" fill="none" stroke={item.color} strokeWidth="6"
                      strokeLinecap="round" strokeDasharray={`${2 * Math.PI * 34}`}
                      initial={{ strokeDashoffset: 2 * Math.PI * 34 }}
                      whileInView={{ strokeDashoffset: 2 * Math.PI * 34 * (1 - item.pct / 100) }}
                      viewport={{ once: true }} transition={{ duration: 2, delay: i * 0.2 }} />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-xs font-bold" style={{ color: item.color }}>{item.pct}%</span>
                  </div>
                </div>
                <div className="font-bold text-2xl" style={{ color: item.color, fontFamily: 'Cinzel,serif' }}>{item.value}</div>
                <div className="text-gray-600 text-sm mt-1">{item.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
