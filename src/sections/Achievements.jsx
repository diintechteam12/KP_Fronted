import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaUsers, FaAward, FaHandshake, FaStar } from 'react-icons/fa';
import SectionTitle from '../components/SectionTitle';

const counters = [
  { Icon: FaUsers, count: 34, suffix: 'K+', label: 'Followers', sub: 'Across all platforms', color: '#FFD700' },
  { Icon: FaAward, count: 38, suffix: '+', label: 'Years Leadership', sub: 'Of dedicated service', color: '#FF6B00' },
  { Icon: FaHandshake, count: 100, suffix: '+', label: 'Community Programs', sub: 'Implemented successfully', color: '#FFD700' },
  { Icon: FaStar, count: 50, suffix: '+', label: 'Social Initiatives', sub: 'Benefiting thousands', color: '#FF6B00' },
];

function AnimatedNumber({ end, suffix, color, start }) {
  const ref = useRef(null);
  const frameRef = useRef(null);

  useEffect(() => {
    if (!start) return;
    const duration = 2500;
    const startTime = performance.now();
    const tick = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(eased * end);
      if (ref.current) ref.current.textContent = current + suffix;
      if (progress < 1) frameRef.current = requestAnimationFrame(tick);
    };
    frameRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameRef.current);
  }, [start, end, suffix]);

  return (
    <div ref={ref} className="text-5xl font-bold mb-2" style={{ color, fontFamily: 'Cinzel,serif' }}>
      0{suffix}
    </div>
  );
}

export default function Achievements() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <section id="achievements" className="py-24 relative overflow-hidden"
      style={{ background: 'linear-gradient(135deg,#0B0F19 0%,#071a0e 50%,#0B0F19 100%)' }}>

      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 opacity-10"
          style={{ background: 'radial-gradient(ellipse at 50% 50%,rgba(15,81,50,0.4) 0%,transparent 70%)' }} />
        {[...Array(6)].map((_, i) => (
          <motion.div key={i} className="absolute rounded-full"
            style={{ width: 4 + i * 2, height: 4 + i * 2, left: `${15 + i * 14}%`, top: `${20 + (i % 3) * 30}%`, background: i % 2 === 0 ? '#FFD700' : '#FF6B00', opacity: 0.25 }}
            animate={{ y: [0, -20, 0], opacity: [0.15, 0.4, 0.15] }}
            transition={{ duration: 3 + i * 0.5, repeat: Infinity, delay: i * 0.3 }} />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <SectionTitle subtitle="Impact" title="Our" highlight="Achievements"
          desc="Numbers that speak for themselves — a testament to years of dedicated service." light />

        <div ref={ref} className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {counters.map((item, i) => (
            <motion.div key={item.label}
              className="relative text-center p-8 rounded-3xl overflow-hidden group border border-white/5 backdrop-blur-xl"
              style={{ background: 'rgba(255,255,255,0.03)' }}
              initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              whileHover={{ y: -8, borderColor: 'rgba(255,215,0,0.2)' }}>

              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl pointer-events-none"
                style={{ background: `radial-gradient(circle at 50% 50%,${item.color}10,transparent 70%)` }} />

              <motion.div className="w-16 h-16 rounded-2xl flex items-center justify-center text-2xl mx-auto mb-5"
                style={{ background: `${item.color}15`, border: `1px solid ${item.color}30` }}
                whileHover={{ rotate: 10, scale: 1.1 }}>
                <item.Icon style={{ color: item.color }} />
              </motion.div>

              <AnimatedNumber end={item.count} suffix={item.suffix} color={item.color} start={inView} />
              <h3 className="text-white font-semibold text-lg mb-1">{item.label}</h3>
              <p className="text-gray-500 text-xs">{item.sub}</p>

              <div className="absolute bottom-0 left-0 right-0 h-[2px]"
                style={{ background: `linear-gradient(90deg,transparent,${item.color}60,transparent)` }} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
