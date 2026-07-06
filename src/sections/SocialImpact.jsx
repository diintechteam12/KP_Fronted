import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useEffect, useRef } from 'react';
import { 
  FaUsers, FaFemale, FaGraduationCap, FaStethoscope, FaRoad, FaTint,
  FaMapMarkerAlt, FaShieldAlt, FaCheckCircle, FaHandshake, FaLeaf, FaArrowUp
} from 'react-icons/fa';

// Animated Number Component
function AnimatedNumber({ end, suffix, color, start }) {
  const ref = useRef(null);
  const frameRef = useRef(null);

  useEffect(() => {
    if (!start) return;
    const duration = 2500;
    const startTime = performance.now();
    let isCancelled = false;
    
    // Parse the end value. If it contains non-numeric parts, extract the number.
    const numericMatch = String(end).match(/[\d,]+/);
    if (!numericMatch) return;
    
    const actualEnd = parseInt(numericMatch[0].replace(/,/g, ''), 10);
    
    const tick = (now) => {
      if (isCancelled) return;
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // Cubic ease out
      const current = Math.round(eased * actualEnd);
      
      if (ref.current) {
        ref.current.textContent = current.toLocaleString('en-IN') + (suffix || '');
      }
      
      if (progress < 1) {
        frameRef.current = requestAnimationFrame(tick);
      }
    };
    
    frameRef.current = requestAnimationFrame(tick);
    
    return () => {
      isCancelled = true;
      cancelAnimationFrame(frameRef.current);
    };
  }, [start, end, suffix]);

  return (
    <span ref={ref} style={{ color }} className="font-bold">
      0{suffix}
    </span>
  );
}

// Top Stats Data
const topStats = [
  { icon: FaUsers, count: "50,000", suffix: "+", label: "Lives Directly Impacted", trend: "85%", color: "#22c55e" },
  { icon: FaFemale, count: "10,000", suffix: "+", label: "Women Empowered", trend: "90%", color: "#eab308" },
  { icon: FaGraduationCap, count: "5,000", suffix: "+", label: "Youth Trained", trend: "78%", color: "#f97316" },
  { icon: FaStethoscope, count: "250", suffix: "+", label: "Medical Camps Organized", trend: "72%", color: "#3b82f6" },
  { icon: FaTint, count: "150", suffix: "+", label: "Water Projects Completed", trend: "80%", color: "#22c55e" },
];

// Progress Bars Data
const focusAreas = [
  { icon: FaGraduationCap, label: 'Education', desc: 'Promoting quality education and learning opportunities.', pct: 85, color: '#22c55e' },
  { icon: FaFemale, label: 'Women Empowerment', desc: 'Empowering women to become leaders of change.', pct: 90, color: '#eab308' },
  { icon: FaStethoscope, label: 'Healthcare', desc: 'Bringing healthcare and wellness to every doorstep.', pct: 78, color: '#3b82f6' },
  { icon: FaRoad, label: 'Development', desc: 'Building infrastructure and improving living standards.', pct: 82, color: '#a855f7' },
  { icon: FaUsers, label: 'Youth Development', desc: 'Creating opportunities and shaping a better future.', pct: 80, color: '#22c55e' },
];

// Trust Markers
const features = [
  { icon: FaShieldAlt, title: "Transparent", subtitle: "100% Transparency\nin Every Step" },
  { icon: FaCheckCircle, title: "Verified", subtitle: "Data Verified &\nImpact Measured" },
  { icon: FaHandshake, title: "Community Driven", subtitle: "Built with People,\nFor the People" },
  { icon: FaLeaf, title: "Sustainable", subtitle: "Creating Long-term\nLasting Change" },
];

export default function SocialImpact() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section id="impact" className="py-20 relative font-sans text-gray-300"
      style={{ backgroundColor: '#0B0F19' }}> {/* Deep Dark Blue/Black Background */}
      
      {/* Background Subtle Gradient */}
      <div className="absolute inset-0 pointer-events-none opacity-20"
        style={{ background: 'radial-gradient(circle at center, rgba(234, 179, 8, 0.05) 0%, transparent 70%)' }} />

      <div className="max-w-[1400px] mx-auto px-4 lg:px-8 relative z-10" ref={ref}>
        
        {/* HEADER SECTION */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-4 mb-4">
            <span className="h-[1px] w-12 bg-[#eab308]" />
            <h4 className="text-[#eab308] uppercase tracking-widest text-sm font-semibold">OUR IMPACT</h4>
            <span className="h-[1px] w-12 bg-[#eab308]" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
            Changing Lives. <span className="text-[#eab308]">Building a Better Tomorrow.</span>
          </h2>
          <p className="text-gray-400 text-lg">Real Numbers. Real Impact. Real Change.</p>
        </div>

        {/* TOP ROW: 6 STAT CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
          {topStats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <motion.div 
                key={stat.label}
                className="bg-[#111827]/80 rounded-xl p-4 border flex flex-col justify-between"
                style={{ borderColor: 'rgba(255,255,255,0.05)' }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center shrink-0 border"
                    style={{ backgroundColor: `${stat.color}15`, borderColor: `${stat.color}30` }}>
                    <Icon style={{ color: stat.color }} size={20} />
                  </div>
                  <div>
                    <div className="text-xl font-bold tracking-tight mb-1">
                      <AnimatedNumber end={stat.count} suffix={stat.suffix} color={stat.color} start={inView} />
                    </div>
                    <p className="text-white text-xs leading-tight opacity-90">
                      {stat.label.split(' ').map((word, j, arr) => (
                        <span key={j}>{word}{j === 0 ? <br/> : ' '}</span> // Break after first word usually matches design nicely
                      ))}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2 text-[10px] uppercase font-semibold mt-auto"
                  style={{ color: stat.color }}>
                  <FaArrowUp /> 
                  <span>{stat.trend} Since Last Year</span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* MIDDLE ROW: MAP & PROGRESS */}
        <div className="grid lg:grid-cols-12 gap-8 mb-8">
          
          {/* Left Panel: Uttar Pradesh Map */}
          <motion.div 
            className="lg:col-span-5 bg-[#111827]/80 rounded-2xl border p-6 relative overflow-hidden"
            style={{ borderColor: 'rgba(255,255,255,0.05)' }}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="mb-6 relative z-10">
              <h5 className="text-gray-400 text-xs uppercase tracking-widest mb-1">IMPACT ACROSS</h5>
              <h3 className="text-[#eab308] text-2xl font-bold">UTTAR PRADESH</h3>
            </div>
            
            <p className="text-gray-400 text-sm max-w-[200px] relative z-10 leading-relaxed mb-6">
              Transforming lives and strengthening communities across every district of Uttar Pradesh.
            </p>

            {/* Glowing Map Image */}
            <div className="absolute right-0 top-10 bottom-0 w-[80%] opacity-80 pointer-events-none flex items-center justify-end">
              <img src="/up_map.png" alt="Uttar Pradesh Map" className="w-full h-auto object-contain max-h-full mix-blend-screen" />
            </div>

            {/* Cities List Overlay */}
            <div className="absolute right-8 top-1/2 -translate-y-1/2 flex flex-col gap-3 text-xs text-gray-300">
              {['Lucknow', 'Kanpur', 'Varanasi', 'Agra', 'Prayagraj', 'Gorakhpur', 'Meerut', 'Bareilly'].map(city => (
                <div key={city} className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#eab308] shadow-[0_0_8px_#eab308]" />
                  {city}
                </div>
              ))}
              <div className="text-gray-500 italic mt-1 text-[10px]">And Many More...</div>
            </div>

            {/* Districts Covered Badge */}
            <div className="absolute bottom-6 left-6 border border-[#eab308]/30 rounded-xl p-3 flex items-center gap-3 bg-[#111827]/90 backdrop-blur-sm">
              <FaMapMarkerAlt className="text-[#eab308] text-xl" />
              <div>
                <div className="text-white font-bold text-lg">75+</div>
                <div className="text-gray-400 text-[10px] uppercase">Districts Covered</div>
              </div>
            </div>
          </motion.div>

          {/* Right Panel: Focus Areas Progress Bars */}
          <motion.div 
            className="lg:col-span-7 bg-[#111827]/80 rounded-2xl border p-6 px-8"
            style={{ borderColor: 'rgba(255,255,255,0.05)' }}
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h5 className="text-white text-sm font-semibold uppercase tracking-widest mb-8 border-b border-white/5 pb-4">
              IMPACT BY FOCUS AREA
            </h5>

            <div className="space-y-6">
              {focusAreas.map((area, i) => {
                const Icon = area.icon;
                return (
                  <div key={area.label} className="relative">
                    <div className="flex items-start gap-4">
                      {/* Icon */}
                      <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 border"
                        style={{ backgroundColor: `${area.color}15`, borderColor: `${area.color}30` }}>
                        <Icon style={{ color: area.color }} size={16} />
                      </div>
                      
                      {/* Content & Bar */}
                      <div className="flex-1">
                        <div className="flex justify-between items-end mb-1">
                          <h4 className="text-white font-semibold">{area.label}</h4>
                          <span style={{ color: area.color }} className="font-bold text-sm">
                            {inView ? <AnimatedNumber end={area.pct} suffix="%" color={area.color} start={inView} /> : '0%'}
                          </span>
                        </div>
                        <p className="text-gray-400 text-xs mb-3">{area.desc}</p>
                        
                        {/* Progress Track */}
                        <div className="h-1.5 w-full rounded-full bg-white/5 overflow-hidden">
                          <motion.div 
                            className="h-full rounded-full"
                            style={{ backgroundColor: area.color, boxShadow: `0 0 10px ${area.color}` }}
                            initial={{ width: 0 }}
                            whileInView={{ width: `${area.pct}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 1.5, delay: 0.2 + (i * 0.1), ease: "easeOut" }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>

        </div>

        {/* BOTTOM ROW: OVERALL SCORE & TRUST MARKERS */}
        <div className="grid lg:grid-cols-12 gap-8 items-center bg-[#111827]/80 rounded-2xl border p-8"
             style={{ borderColor: 'rgba(255,255,255,0.05)' }}>
          
          {/* Left: Overall Score */}
          <div className="lg:col-span-5 flex items-center gap-8 lg:border-r border-white/10 pr-8">
            <div className="relative shrink-0 flex items-center justify-center">
              {/* Circular Laurels using simple border/stars for now, or SVG if needed. Let's use a glowing circle */}
              <div className="w-32 h-32 rounded-full border border-[#eab308]/40 flex items-center justify-center relative shadow-[0_0_30px_rgba(234,179,8,0.15)]">
                {/* Inner ring */}
                <div className="absolute inset-2 rounded-full border border-[#eab308]/20 border-dashed animate-[spin_20s_linear_infinite]" />
                
                <div className="text-center relative z-10 flex flex-col items-center">
                  <FaLeaf className="text-[#eab308] text-sm mb-1 opacity-80" />
                  <div className="text-4xl font-bold text-white flex items-end justify-center leading-none" style={{ fontFamily: 'Cinzel, serif' }}>
                    84<span className="text-xl text-gray-400 mb-0.5">/100</span>
                  </div>
                  <FaLeaf className="text-[#eab308] text-sm mt-1 opacity-80 transform rotate-180 scale-x-[-1]" />
                </div>
              </div>
            </div>
            
            <div>
              <div className="flex items-center gap-2 mb-2">
                <div className="w-1.5 h-1.5 rounded-full bg-[#eab308]" />
                <h5 className="text-[#eab308] text-xs font-bold uppercase tracking-widest">OVERALL IMPACT SCORE</h5>
              </div>
              <p className="text-gray-400 text-xs leading-relaxed">
                Across all five impact areas — education, women, youth, healthcare, and development — the work has consistently delivered measurable, verifiable results on the ground.
              </p>
            </div>
          </div>

          {/* Right: Trust Markers */}
          <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-4 gap-6">
            {features.map((feat, i) => {
              const Icon = feat.icon;
              return (
                <div key={feat.title} className="flex flex-col items-center text-center group">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center mb-3 bg-[#eab308]/10 text-[#eab308] transition-transform duration-300 group-hover:-translate-y-1">
                    <Icon size={20} />
                  </div>
                  <h6 className="text-white text-sm font-semibold mb-1">{feat.title}</h6>
                  <p className="text-gray-500 text-[10px] whitespace-pre-line leading-tight">
                    {feat.subtitle}
                  </p>
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}
