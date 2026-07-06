import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import SectionTitle from '../components/SectionTitle';
import {
  FaMapMarkerAlt, FaHandHoldingHeart, FaFemale, FaGraduationCap,
  FaMedal, FaTools, FaWifi, FaFlag, FaUsers, FaGlobe
} from 'react-icons/fa';

const iconMap = {
  FaMapMarkerAlt, FaHandHoldingHeart, FaFemale, FaGraduationCap,
  FaMedal, FaTools, FaWifi, FaFlag, FaUsers, FaGlobe
};

export default function Journey() {
  const [journeyData, setJourneyData] = useState({
    sectionSubtitle: '38 Years on the Ground',
    sectionTitle: 'Step by Step,',
    sectionHighlight: 'We Kept Going',
    sectionDesc: 'It started in a small village in 1988. It has never stopped. Here is how it happened.',
    cards: [
      {
        year: "1988", title: "The First Step",
        desc: "It started with going door to door, listening to people's problems. No office, no budget — just a promise to show up.",
        icon: 'FaMapMarkerAlt', color: "#0F5132", tag: "Beginning",
        image: "/step1.jpeg",
      },
      {
        year: "1995", title: "First Community Program",
        desc: "Arranged food and medicine for 50 families using personal savings. People said — this one is different. He actually came.",
        icon: 'FaHandHoldingHeart', color: "#FF6B00", tag: "Welfare",
        image: "/step2.jpeg",
      }
    ]
  });

  useEffect(() => {
    const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
    fetch(`${apiUrl}/portfolio-website/kp-kasana-portfolio`)
      .then(res => res.json())
      .then(data => {
        if (data.success && data.data && data.data.journey) {
          setJourneyData(prev => ({ ...prev, ...data.data.journey }));
        }
      })
      .catch(err => console.error("Error fetching journey data:", err));
  }, []);

  return (
    <section id="journey" className="py-24 bg-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full opacity-[0.03] pointer-events-none"
        style={{ background: 'radial-gradient(circle,#0F5132,transparent)' }} />
      <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full opacity-[0.03] pointer-events-none"
        style={{ background: 'radial-gradient(circle,#FF6B00,transparent)' }} />

      <div className="max-w-6xl mx-auto px-6">
        <SectionTitle
          subtitle={journeyData.sectionSubtitle}
          title={journeyData.sectionTitle}
          highlight={journeyData.sectionHighlight}
          desc={journeyData.sectionDesc}
        />

        <div className="relative">
          {/* Center vertical line */}
          <motion.div
            className="absolute left-1/2 top-0 bottom-0 w-[2px] -translate-x-1/2 hidden md:block"
            style={{ background: 'linear-gradient(to bottom,transparent,#FFD700 10%,#0F5132 50%,#FF6B00 90%,transparent)' }}
            initial={{ scaleY: 0, originY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 2, ease: 'easeInOut' }}
          />

          <div className="space-y-10">
            {(journeyData.cards || []).map((item, i) => {
              const isLeft = i % 2 === 0;
              const Icon = iconMap[item.icon] || FaFlag;
              return (
                <div key={i} className={`relative flex flex-col md:flex-row items-center gap-0 ${isLeft ? 'md:flex-row' : 'md:flex-row-reverse'}`}>

                  {/* Card */}
                  <motion.div
                    className={`w-full md:w-[45%] ${isLeft ? 'md:pr-12' : 'md:pl-12'}`}
                    initial={{ opacity: 0, y: 100 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
                  >
                    <motion.div
                      className="bg-white rounded-2xl overflow-hidden border border-gray-100 group"
                      style={{ boxShadow: '0 8px 30px rgba(0,0,0,0.07)' }}
                      whileHover={{ y: -5, boxShadow: `0 20px 50px ${item.color}25` }}
                      transition={{ duration: 0.3 }}
                    >
                      {/* Image */}
                      <div className="relative w-full overflow-hidden rounded-t-2xl" style={{ height: 200 }}>
                        <img
                          src={item.image}
                          alt={item.title}
                          className="absolute inset-0 w-full h-full transition-transform duration-700 group-hover:scale-105"
                          style={{ objectFit: 'cover', objectPosition: 'center top' }}
                        />
                        <div className="absolute inset-0"
                          style={{ background: `linear-gradient(to top,${item.color}cc 0%,transparent 60%)` }} />
                        <div className="absolute top-3 left-3">
                          <span className="px-3 py-1 rounded-full text-xs font-bold text-white"
                            style={{ background: item.color }}>
                            {item.tag}
                          </span>
                        </div>
                        <div className="absolute bottom-3 right-4">
                          <span className="text-white font-bold text-2xl opacity-90"
                            style={{ fontFamily: 'Cinzel,serif' }}>
                            {item.year}
                          </span>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-5">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white shrink-0"
                            style={{ background: `linear-gradient(135deg,${item.color},${item.color}bb)`, boxShadow: `0 4px 15px ${item.color}40` }}>
                            <Icon size={16} />
                          </div>
                          <h3 className="font-bold text-gray-900 text-lg leading-snug"
                            style={{ fontFamily: 'Playfair Display,serif' }}>
                            {item.title}
                          </h3>
                        </div>
                        <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
                      </div>

                      <div className="h-[3px]"
                        style={{ background: `linear-gradient(90deg,transparent,${item.color},transparent)` }} />
                    </motion.div>
                  </motion.div>

                  {/* Center icon dot */}
                  <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 z-10">
                    <motion.div
                      className="w-14 h-14 rounded-full flex items-center justify-center text-white border-4 border-white"
                      style={{
                        background: `linear-gradient(135deg,${item.color},${item.color}bb)`,
                        boxShadow: `0 0 0 4px ${item.color}25, 0 0 25px ${item.color}50`,
                      }}
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
                      whileHover={{ scale: 1.2 }}
                    >
                      <Icon size={18} />
                    </motion.div>
                  </div>

                  {/* Spacer */}
                  <div className="hidden md:block w-[45%]" />
                </div>
              );
            })}
          </div>

          {/* Present Day */}
          <motion.div
            className="flex flex-col items-center mt-12 gap-3"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="w-[2px] h-10"
              style={{ background: 'linear-gradient(to bottom,#FF6B00,#0F5132)' }} />
            <motion.div
              className="px-8 py-3 rounded-full font-bold text-white flex items-center gap-2"
              style={{
                background: 'linear-gradient(135deg,#0F5132,#1a7a4a)',
                boxShadow: '0 0 30px rgba(15,81,50,0.4)',
                fontFamily: 'Cinzel,serif',
              }}
              animate={{ boxShadow: ['0 0 20px rgba(15,81,50,0.3)', '0 0 40px rgba(15,81,50,0.7)', '0 0 20px rgba(15,81,50,0.3)'] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <FaFlag size={14} style={{ color: '#FFD700' }} />
              Present Day — Still Going Strong
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
