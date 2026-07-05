import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaCheckCircle } from 'react-icons/fa';
import SectionTitle from '../components/SectionTitle';

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

  const [aboutData, setAboutData] = useState({
    sectionSubtitle: 'The Man Behind the Work',
    sectionTitle: 'K P Singh',
    sectionHighlight: 'Kasana',
    sectionDesc: '38 years on the ground — no shortcuts. A story of a man who stayed when others left.',
    imageUrl: '/Kp image.png',
    yearsOfService: '38',
    paragraph1: "K P Singh Kasana is not someone you only see at election time. For 38 years, he has been in the streets, in the villages, at people's doorsteps. He did not wait for a position to start helping — he started helping and the recognition followed.",
    paragraph2: "No big office in the beginning. Just a promise — that as long as one child goes to bed hungry, one woman has no voice, one young person is jobless, there will be no rest. Today 34,000+ people walk this journey with him.",
    qualities: [
      'A Leader Who Actually Shows Up', 'Voice for Women in the Community',
      'Education for Every Child', 'Building Better Villages',
      'Mentor for Young People', 'Grassroots Welfare Worker'
    ],
    buttonText: 'View Leadership Journey',
    buttonLink: '#journey',
    stats: [
      { count: 34, suffix: 'K+', label: 'Followers', color: '#0F5132' },
      { count: 38, suffix: '+', label: 'Years Experience', color: '#FF6B00' },
      { count: 100, suffix: '+', label: 'Community Programs', color: '#FFD700' },
      { count: 50, suffix: '+', label: 'Social Initiatives', color: '#0F5132' }
    ]
  });

  useEffect(() => {
    const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
    fetch(`${apiUrl}/portfolio-website/kp-kasana-portfolio`)
      .then(res => res.json())
      .then(data => {
        if (data.success && data.data && data.data.about) {
          // Merge with default values in case some are missing in early DB records
          setAboutData(prev => ({ ...prev, ...data.data.about }));
        }
      })
      .catch(err => console.error("Error fetching about data:", err));
  }, []);

  return (
    <section id="about" className="py-24 bg-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-[0.04] pointer-events-none"
        style={{ background: 'radial-gradient(circle,#0F5132,transparent)' }} />

      <div className="max-w-7xl mx-auto px-6">
        <SectionTitle subtitle={aboutData.sectionSubtitle} title={aboutData.sectionTitle} highlight={aboutData.sectionHighlight}
          desc={aboutData.sectionDesc} />

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Image */}
          <motion.div className="relative"
            initial={{ opacity: 0, x: -60 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.9 }}>
            <div className="relative rounded-3xl overflow-hidden" style={{ boxShadow: '0 30px 80px rgba(15,81,50,0.15)' }}>
              <img src={aboutData.imageUrl || '/Kp image.png'} alt={aboutData.sectionTitle} className="w-full object-cover" style={{ height: 520 }} />
              <div className="absolute inset-0" style={{ background: 'linear-gradient(to top,rgba(11,15,25,0.7) 0%,transparent 60%)' }} />
              <div className="absolute bottom-6 left-6 right-6">
                <div className="rounded-2xl px-5 py-3 backdrop-blur-xl bg-white/10 border border-white/10">
                  <p className="text-white font-semibold text-lg" style={{ fontFamily: 'Playfair Display,serif' }}>{aboutData.sectionTitle} {aboutData.sectionHighlight}</p>
                  <p className="text-sm text-yellow-400">{aboutData.sectionSubtitle}</p>
                </div>
              </div>
            </div>
            <motion.div className="absolute -top-6 -right-6 w-28 h-28 rounded-full flex flex-col items-center justify-center text-white font-bold"
              style={{ background: 'linear-gradient(135deg,#0F5132,#1a7a4a)', boxShadow: '0 0 30px rgba(15,81,50,0.5)' }}
              animate={{ rotate: [0, 5, -5, 0] }} transition={{ duration: 4, repeat: Infinity }}>
              <span className="text-3xl leading-none">{aboutData.yearsOfService}</span>
              <span className="text-[10px] text-center text-yellow-400 leading-tight">Years of<br />Service</span>
            </motion.div>
          </motion.div>

          {/* Content */}
          <motion.div initial={{ opacity: 0, x: 60 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.9 }}>
            <p className="text-gray-600 text-lg leading-relaxed mb-5">
              {aboutData.paragraph1}
            </p>
            <p className="text-gray-500 text-base leading-relaxed mb-8">
              {aboutData.paragraph2}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-10">
              {(aboutData.qualities || []).map((q, i) => (
                <motion.div key={i} className="flex items-center gap-3"
                  initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                  <FaCheckCircle className="text-green-800 shrink-0" />
                  <span className="text-sm text-gray-700 font-medium">{q}</span>
                </motion.div>
              ))}
            </div>

            <motion.button
              onClick={() => document.querySelector(aboutData.buttonLink)?.scrollIntoView({ behavior: 'smooth' })}
              className="px-8 py-4 rounded-full font-semibold text-white tracking-wider text-sm uppercase cursor-pointer"
              style={{ background: 'linear-gradient(135deg,#0F5132,#1a7a4a)', boxShadow: '0 0 20px rgba(15,81,50,0.4)' }}
              whileHover={{ scale: 1.05, boxShadow: '0 0 35px rgba(15,81,50,0.6)' }}
              whileTap={{ scale: 0.97 }}>
              {aboutData.buttonText}
            </motion.button>
          </motion.div>
        </div>

        {/* Stats */}
        <div ref={ref} className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-20">
          {(aboutData.stats || []).map((s, i) => (
            <motion.div key={i} className="text-center p-6 rounded-2xl relative overflow-hidden"
              style={{ background: `${s.color || '#FFD700'}08`, border: `1px solid ${s.color || '#FFD700'}20` }}
              initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
              whileHover={{ y: -5, boxShadow: `0 20px 40px ${s.color || '#FFD700'}20` }}>
              <AnimatedNumber end={s.count} suffix={s.suffix} color={s.color || '#FFD700'} start={inView} />
              <div className="text-gray-600 text-sm font-medium">{s.label}</div>
              <div className="absolute bottom-0 left-0 right-0 h-[2px] rounded-full"
                style={{ background: `linear-gradient(90deg,transparent,${s.color || '#FFD700'},transparent)` }} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
