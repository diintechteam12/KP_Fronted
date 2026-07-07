import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useEffect, useRef } from 'react';
import { 
  FaUsers, FaFemale, FaGraduationCap, FaStethoscope, FaRoad, FaTint,
  FaMapMarkerAlt, FaShieldAlt, FaCheckCircle, FaHandshake, FaLeaf, FaArrowUp
} from 'react-icons/fa';
import { useLocalized, useLanguage } from '../context/LanguageContext';

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
  { icon: FaGraduationCap, label: 'Education', labelHi: 'शिक्षा', desc: 'Promoting quality education and learning opportunities.', descHi: 'गुणवत्तापूर्ण शिक्षा और सीखने के अवसरों को बढ़ावा देना।', pct: 85, color: '#22c55e' },
  { icon: FaFemale, label: 'Women Empowerment', labelHi: 'महिला सशक्तिकरण', desc: 'Empowering women to become leaders of change.', descHi: 'महिलाओं को परिवर्तन के नेता बनने के लिए सशक्त बनाना।', pct: 90, color: '#eab308' },
  { icon: FaStethoscope, label: 'Healthcare', labelHi: 'स्वास्थ्य सेवा', desc: 'Bringing healthcare and wellness to every doorstep.', descHi: 'हर घर तक स्वास्थ्य सेवा और कल्याण पहुंचाना।', pct: 78, color: '#3b82f6' },
  { icon: FaRoad, label: 'Development', labelHi: 'विकास', desc: 'Building infrastructure and improving living standards.', descHi: 'बुनियादी ढांचे का निर्माण और जीवन स्तर में सुधार।', pct: 82, color: '#a855f7' },
  { icon: FaUsers, label: 'Youth Development', labelHi: 'युवा विकास', desc: 'Creating opportunities and shaping a better future.', descHi: 'अवसर पैदा करना और बेहतर भविष्य को आकार देना।', pct: 80, color: '#22c55e' },
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
  const { lang } = useLanguage();
  const localizedFocusAreas = useLocalized(focusAreas);

  return (
    <section id="impact" className="py-20 relative font-sans text-gray-700 bg-white">
      
      {/* Background Subtle Gradient */}
      <div className="absolute inset-0 pointer-events-none opacity-20"
        style={{ background: 'radial-gradient(circle at center, rgba(234, 179, 8, 0.05) 0%, transparent 70%)' }} />

      <div className="max-w-[1400px] mx-auto px-4 lg:px-8 relative z-10" ref={ref}>
        
        {/* HEADER SECTION */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-4 mb-4">
            <span className="h-[1px] w-12 bg-[#eab308]" />
            <h4 className="text-[#eab308] uppercase tracking-widest text-sm font-semibold">
              {lang === 'hi' ? 'हमारा प्रभाव' : 'OUR IMPACT'}
            </h4>
            <span className="h-[1px] w-12 bg-[#eab308]" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
            {lang === 'hi' ? 'जीवन बदलना.' : 'Changing Lives.'} <span className="text-[#eab308]">{lang === 'hi' ? 'एक बेहतर कल का निर्माण।' : 'Building a Better Tomorrow.'}</span>
          </h2>
          <p className="text-gray-600 text-lg">
            {lang === 'hi' ? 'वास्तविक आँकड़े। वास्तविक प्रभाव। वास्तविक बदलाव।' : 'Real Numbers. Real Impact. Real Change.'}
          </p>
        </div>


        {/* MIDDLE ROW: PROGRESS */}
        <div className="mb-8 max-w-4xl mx-auto">
          
          {/* Right Panel: Focus Areas Progress Bars */}
          <motion.div 
            className="bg-[#FAF8F5] rounded-2xl border border-[#EFEBE1] shadow-xl p-6 px-8"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h5 className="text-gray-900 text-sm font-bold uppercase tracking-widest mb-8 border-b border-gray-100 pb-4">
              {lang === 'hi' ? 'फोकस क्षेत्र के अनुसार प्रभाव' : 'IMPACT BY FOCUS AREA'}
            </h5>

            <div className="space-y-6">
              {localizedFocusAreas.map((area, i) => {
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
                          <h4 className="text-gray-900 font-bold">{area.label}</h4>
                          <span style={{ color: area.color }} className="font-bold text-sm">
                            {inView ? <AnimatedNumber end={area.pct} suffix="%" color={area.color} start={inView} /> : '0%'}
                          </span>
                        </div>
                        <p className="text-gray-600 text-xs mb-3">{area.desc}</p>
                        
                        {/* Progress Track */}
                        <div className="h-1.5 w-full rounded-full bg-gray-100 overflow-hidden">
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


      </div>
    </section>
  );
}
