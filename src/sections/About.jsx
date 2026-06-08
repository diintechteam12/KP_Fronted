import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaCheckCircle } from 'react-icons/fa';
import SectionTitle from '../components/SectionTitle';
const heroImg = '/Kp image.png';

const stats = [
  { count: 34, suffix: 'K+', label: 'Followers', color: '#0F5132' },
  { count: 38, suffix: '+', label: 'Years Experience', color: '#FF6B00' },
  { count: 100, suffix: '+', label: 'Community Programs', color: '#FFD700' },
  { count: 50, suffix: '+', label: 'Social Initiatives', color: '#0F5132' },
];

const qualities = [
  'Political Leader & Public Servant', 'Social Reformer & Change Maker',
  'Education Supporter & Advocate', 'Community Builder & Developer',
  'Business Leader & Entrepreneur', 'Public Welfare Advocate',
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
    <div className="text-4xl font-bold mb-1" ref={ref} style={{ color, fontFamily: 'Cinzel,serif' }}>
      0{suffix}
    </div>
  );
}

export default function About() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <section id="about" className="py-24 bg-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-[0.04] pointer-events-none"
        style={{ background: 'radial-gradient(circle,#0F5132,transparent)' }} />

      <div className="max-w-7xl mx-auto px-6">
        <SectionTitle subtitle="Who I Am" title="About" highlight="K P Singh Kasana"
          desc="A lifelong journey of service, leadership, and dedication to building a better society for all." />

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Image */}
          <motion.div className="relative"
            initial={{ opacity: 0, x: -60 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.9 }}>
            <div className="relative rounded-3xl overflow-hidden" style={{ boxShadow: '0 30px 80px rgba(15,81,50,0.15)' }}>
              <img src={heroImg} alt="K P Singh Kasana" className="w-full object-cover" style={{ height: 520 }} />
              <div className="absolute inset-0" style={{ background: 'linear-gradient(to top,rgba(11,15,25,0.7) 0%,transparent 60%)' }} />
              <div className="absolute bottom-6 left-6 right-6">
                <div className="rounded-2xl px-5 py-3 backdrop-blur-xl bg-white/10 border border-white/10">
                  <p className="text-white font-semibold text-lg" style={{ fontFamily: 'Playfair Display,serif' }}>K P Singh Kasana</p>
                  <p className="text-sm text-yellow-400">Visionary Leader & Social Reformer</p>
                </div>
              </div>
            </div>
            <motion.div className="absolute -top-6 -right-6 w-28 h-28 rounded-full flex flex-col items-center justify-center text-white font-bold"
              style={{ background: 'linear-gradient(135deg,#0F5132,#1a7a4a)', boxShadow: '0 0 30px rgba(15,81,50,0.5)' }}
              animate={{ rotate: [0, 5, -5, 0] }} transition={{ duration: 4, repeat: Infinity }}>
              <span className="text-3xl leading-none">38</span>
              <span className="text-[10px] text-center text-yellow-400 leading-tight">Years of<br />Service</span>
            </motion.div>
          </motion.div>

          {/* Content */}
          <motion.div initial={{ opacity: 0, x: 60 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.9 }}>
            <p className="text-gray-600 text-lg leading-relaxed mb-5">
              K P Singh Kasana is a dedicated political leader and social reformer who has spent over
              <strong className="text-green-800"> 38 years </strong>
              serving communities with unwavering commitment. Born with a vision to create positive change, he has consistently worked to uplift the underprivileged, empower women, and invest in youth development.
            </p>
            <p className="text-gray-500 text-base leading-relaxed mb-8">
              His journey from grassroots community work to nationally recognized leader reflects his deep-rooted values of integrity, service, and vision. With
              <strong className="text-orange-500"> 34,000+ followers </strong>
              and a legacy of impactful initiatives, he continues to inspire millions.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-10">
              {qualities.map((q, i) => (
                <motion.div key={q} className="flex items-center gap-3"
                  initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                  <FaCheckCircle className="text-green-800 shrink-0" />
                  <span className="text-sm text-gray-700 font-medium">{q}</span>
                </motion.div>
              ))}
            </div>

            <motion.button
              onClick={() => document.querySelector('#journey')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-8 py-4 rounded-full font-semibold text-white tracking-wider text-sm uppercase cursor-pointer"
              style={{ background: 'linear-gradient(135deg,#0F5132,#1a7a4a)', boxShadow: '0 0 20px rgba(15,81,50,0.4)' }}
              whileHover={{ scale: 1.05, boxShadow: '0 0 35px rgba(15,81,50,0.6)' }}
              whileTap={{ scale: 0.97 }}>
              View Leadership Journey
            </motion.button>
          </motion.div>
        </div>

        {/* Stats */}
        <div ref={ref} className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-20">
          {stats.map((s, i) => (
            <motion.div key={s.label} className="text-center p-6 rounded-2xl relative overflow-hidden"
              style={{ background: `${s.color}08`, border: `1px solid ${s.color}20` }}
              initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
              whileHover={{ y: -5, boxShadow: `0 20px 40px ${s.color}20` }}>
              <AnimatedNumber end={s.count} suffix={s.suffix} color={s.color} start={inView} />
              <div className="text-gray-600 text-sm font-medium">{s.label}</div>
              <div className="absolute bottom-0 left-0 right-0 h-[2px] rounded-full"
                style={{ background: `linear-gradient(90deg,transparent,${s.color},transparent)` }} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
