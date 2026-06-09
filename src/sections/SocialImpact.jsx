import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useEffect, useRef } from 'react';
import SectionTitle from '../components/SectionTitle';
import {
  FaUsers, FaGraduationCap, FaFemale, FaRocket, FaCity,
} from 'react-icons/fa';

const impactStats = [
  { icon: FaUsers, label: 'Lives Directly Impacted', count: '50,000+', value: 85, color: '#0F5132', bg: 'rgba(15,81,50,0.08)' },
  { icon: FaGraduationCap, label: 'Education Programs Run', count: '200+', value: 72, color: '#FF6B00', bg: 'rgba(255,107,0,0.08)' },
  { icon: FaFemale, label: 'Women Supported', count: '10,000+', value: 90, color: '#FFD700', bg: 'rgba(255,215,0,0.08)' },
  { icon: FaRocket, label: 'Youth Given Opportunities', count: '5,000+', value: 78, color: '#0F5132', bg: 'rgba(15,81,50,0.08)' },
  { icon: FaCity, label: 'Villages Developed', count: '100+', value: 95, color: '#FF6B00', bg: 'rgba(255,107,0,0.08)' },
];

const circleStats = [
  { label: 'People Helped', value: '50K+', pct: 85, color: '#0F5132' },
  { label: 'Programs Run', value: '200+', pct: 72, color: '#FF6B00' },
  { label: 'Women Empowered', value: '10K+', pct: 90, color: '#FFD700' },
  { label: 'Youth Trained', value: '5K+', pct: 78, color: '#0F5132' },
];

function AnimatedBar({ value, color, inView }) {
  return (
    <div className="relative h-3 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.08)' }}>
      <motion.div
        className="h-full rounded-full"
        style={{ background: `linear-gradient(90deg, ${color}, ${color}bb)` }}
        initial={{ width: 0 }}
        animate={inView ? { width: `${value}%` } : { width: 0 }}
        transition={{ duration: 1.5, ease: 'easeOut' }}
      />
      {/* Shine effect */}
      <motion.div
        className="absolute inset-y-0 w-8 rounded-full"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)' }}
        animate={inView ? { left: ['-10%', '110%'] } : {}}
        transition={{ duration: 1.5, ease: 'easeOut' }}
      />
    </div>
  );
}

function CircleProgress({ pct, color, value, label, inView, index }) {
  const r = 38;
  const circ = 2 * Math.PI * r;

  return (
    <motion.div
      className="flex flex-col items-center gap-3 p-6 rounded-2xl border group cursor-default"
      style={{ background: `${color}08`, borderColor: `${color}20` }}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      whileHover={{ y: -6, boxShadow: `0 20px 40px ${color}20`, borderColor: `${color}50` }}
    >
      <div className="relative w-24 h-24">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 90 90">
          {/* Track */}
          <circle cx="45" cy="45" r={r} fill="none" stroke={`${color}18`} strokeWidth="7" />
          {/* Progress */}
          <motion.circle
            cx="45" cy="45" r={r}
            fill="none"
            stroke={color}
            strokeWidth="7"
            strokeLinecap="round"
            strokeDasharray={circ}
            initial={{ strokeDashoffset: circ }}
            animate={inView ? { strokeDashoffset: circ - (circ * pct) / 100 } : { strokeDashoffset: circ }}
            transition={{ duration: 2, delay: index * 0.15, ease: 'easeOut' }}
            style={{ filter: `drop-shadow(0 0 6px ${color}80)` }}
          />
        </svg>
        {/* Center value */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="font-bold text-lg leading-none" style={{ color, fontFamily: 'Cinzel,serif' }}>{value}</span>
          <span className="text-xs font-semibold mt-0.5" style={{ color: `${color}99` }}>{pct}%</span>
        </div>
      </div>
      <p className="text-sm font-semibold text-center text-white/80">{label}</p>
    </motion.div>
  );
}

export default function SocialImpact() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <section id="impact" className="py-24 relative overflow-hidden"
      style={{ background: 'linear-gradient(135deg,#0B0F19 0%,#081510 50%,#0B0F19 100%)' }}>

      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 opacity-[0.07]"
          style={{ backgroundImage: 'linear-gradient(rgba(255,215,0,0.4) 1px,transparent 1px),linear-gradient(90deg,rgba(255,215,0,0.4) 1px,transparent 1px)', backgroundSize: '70px 70px' }} />
        <motion.div className="absolute top-0 left-0 w-[600px] h-[600px] rounded-full opacity-10"
          style={{ background: 'radial-gradient(circle,#0F5132,transparent)' }}
          animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 8, repeat: Infinity }} />
        <motion.div className="absolute bottom-0 right-0 w-96 h-96 rounded-full opacity-10"
          style={{ background: 'radial-gradient(circle,#FF6B00,transparent)' }}
          animate={{ scale: [1, 1.15, 1] }} transition={{ duration: 10, repeat: Infinity, delay: 2 }} />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <SectionTitle
          subtitle="On the Ground"
          title="How Much Has"
          highlight="Actually Changed"
          desc="These bars are not just metrics. Behind every line is a home that changed, a life that was saved."
          light
        />

        <div className="grid lg:grid-cols-2 gap-16 items-start">

          {/* LEFT — Progress Bars */}
          <div ref={ref} className="space-y-6">
            <p className="text-gray-400 text-sm uppercase tracking-widest font-semibold mb-8 flex items-center gap-3">
              <span className="h-[1px] w-8 bg-yellow-400/50 inline-block" />
              Impact Progress
              <span className="h-[1px] flex-1 bg-yellow-400/10 inline-block" />
            </p>

            {impactStats.map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div key={item.label}
                  className="p-5 rounded-2xl border group"
                  style={{ background: item.bg, borderColor: `${item.color}20` }}
                  initial={{ opacity: 0, x: -40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ borderColor: `${item.color}50`, boxShadow: `0 10px 30px ${item.color}15` }}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                        style={{ background: `${item.color}20`, border: `1px solid ${item.color}30` }}>
                        <Icon style={{ color: item.color }} size={16} />
                      </div>
                      <span className="text-white font-semibold text-sm">{item.label}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="font-bold text-lg" style={{ color: item.color, fontFamily: 'Cinzel,serif' }}>
                        {item.count}
                      </span>
                      <span className="text-xs font-bold px-2 py-0.5 rounded-full"
                        style={{ background: `${item.color}20`, color: item.color }}>
                        {item.value}%
                      </span>
                    </div>
                  </div>
                  <AnimatedBar value={item.value} color={item.color} inView={inView} />
                </motion.div>
              );
            })}
          </div>

          {/* RIGHT — Circle Stats */}
          <div>
            <p className="text-gray-400 text-sm uppercase tracking-widest font-semibold mb-8 flex items-center gap-3">
              <span className="h-[1px] w-8 bg-yellow-400/50 inline-block" />
              Key Metrics
              <span className="h-[1px] flex-1 bg-yellow-400/10 inline-block" />
            </p>

            <div className="grid grid-cols-2 gap-5">
              {circleStats.map((s, i) => (
                <CircleProgress key={s.label} {...s} inView={inView} index={i} />
              ))}
            </div>

            {/* Bottom summary card */}
            <motion.div
              className="mt-6 p-6 rounded-2xl border"
              style={{ background: 'rgba(255,215,0,0.05)', borderColor: 'rgba(255,215,0,0.15)' }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-2 h-2 rounded-full bg-yellow-400 animate-pulse" />
                <span className="text-yellow-400 text-xs font-bold uppercase tracking-widest">Overall Impact Score</span>
              </div>
              <div className="flex items-end gap-3 mb-3">
                <span className="text-5xl font-bold text-white" style={{ fontFamily: 'Cinzel,serif' }}>84</span>
                <span className="text-yellow-400 text-2xl font-bold mb-1">/ 100</span>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed">
                Across all five impact areas — education, women, youth, healthcare, and development — the work has consistently delivered measurable, verifiable results on the ground.
              </p>
              <div className="mt-4 h-2 rounded-full overflow-hidden bg-white/5">
                <motion.div className="h-full rounded-full"
                  style={{ background: 'linear-gradient(90deg,#0F5132,#FFD700,#FF6B00)' }}
                  initial={{ width: 0 }}
                  whileInView={{ width: '84%' }}
                  viewport={{ once: true }}
                  transition={{ duration: 2, ease: 'easeOut', delay: 0.6 }} />
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
