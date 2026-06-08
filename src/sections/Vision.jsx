import { useRef } from 'react';
import { motion } from 'framer-motion';
import { FaFemale, FaRocket, FaGraduationCap, FaBriefcase, FaHeartbeat, FaCity } from 'react-icons/fa';
import SectionTitle from '../components/SectionTitle';
import { visionCards } from '../data/data';

const iconMap = { FaFemale, FaRocket, FaGraduationCap, FaBriefcase, FaHeartbeat, FaCity };

function Card({ card, index }) {
  const ref = useRef(null);
  const Icon = iconMap[card.icon];

  const onMove = (e) => {
    const el = ref.current;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left - r.width / 2) / (r.width / 2);
    const y = (e.clientY - r.top - r.height / 2) / (r.height / 2);
    el.style.transform = `perspective(1000px) rotateX(${-y * 10}deg) rotateY(${x * 10}deg) translateY(-8px)`;
    el.style.transition = 'transform 0.1s ease';
  };

  const onLeave = () => {
    ref.current.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
    ref.current.style.transition = 'transform 0.5s ease';
  };

  return (
    <motion.div ref={ref} onMouseMove={onMove} onMouseLeave={onLeave}
      className="relative rounded-2xl p-6 cursor-pointer overflow-hidden group"
      style={{ background: 'rgba(255,255,255,0.03)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.07)' }}
      initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.6 }}>

      {/* Hover glow */}
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{ background: `linear-gradient(135deg,${card.color}12,transparent)`, border: `1px solid ${card.color}35` }} />

      {/* Icon */}
      <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5 text-2xl text-white"
        style={{ background: `linear-gradient(135deg,${card.color},${card.color}bb)`, boxShadow: `0 0 20px ${card.color}40` }}>
        {Icon && <Icon />}
      </div>

      <h3 className="text-white text-xl font-bold mb-3" style={{ fontFamily: 'Playfair Display,serif' }}>{card.title}</h3>
      <p className="text-gray-400 text-sm leading-relaxed">{card.desc}</p>

      {/* Number watermark */}
      <div className="absolute top-4 right-5 text-5xl font-bold text-white/5" style={{ fontFamily: 'Cinzel,serif' }}>0{index + 1}</div>

      {/* Bottom line */}
      <motion.div className="absolute bottom-0 left-6 right-6 h-[2px] rounded-full"
        style={{ background: `linear-gradient(90deg,transparent,${card.color},transparent)` }}
        initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }}
        transition={{ delay: index * 0.1 + 0.4, duration: 0.8 }} />
    </motion.div>
  );
}

export default function Vision() {
  return (
    <section id="vision" className="py-24 relative overflow-hidden"
      style={{ background: 'linear-gradient(135deg,#0B0F19 0%,#0d1a10 50%,#0B0F19 100%)' }}>

      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full opacity-10"
          style={{ backgroundImage: 'radial-gradient(circle at 20% 20%,#0F5132 0%,transparent 50%),radial-gradient(circle at 80% 80%,#FF6B00 0%,transparent 50%)' }} />
        <div className="absolute inset-0 opacity-[0.04]"
          style={{ backgroundImage: 'linear-gradient(rgba(255,215,0,0.4) 1px,transparent 1px),linear-gradient(90deg,rgba(255,215,0,0.4) 1px,transparent 1px)', backgroundSize: '80px 80px' }} />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <SectionTitle subtitle="What We Stand For" title="A Future Worth" highlight="Fighting For"
          desc="These are not campaign promises. These are the things we have been working on — and will keep working on." light />
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {visionCards.map((c, i) => <Card key={c.id} card={c} index={i} />)}
        </div>
      </div>
    </section>
  );
}
