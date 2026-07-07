import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaUsers, FaArrowRight, FaVolumeMute, FaVolumeUp } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

export default function HmareLog() {
  const [isMuted, setIsMuted] = useState(true);
  const navigate = useNavigate();

  return (
    <section id="hmare-log" className="py-20 relative z-20 bg-cover bg-center bg-no-repeat bg-fixed" style={{ backgroundImage: "url('/hmarelog4.jpeg')" }}>
      {/* Overlay for the background image */}
      <div className="absolute inset-0 bg-[#0F5132]/5 backdrop-blur-[2px]"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="bg-white/95 backdrop-blur-xl rounded-[2.5rem] shadow-2xl border border-white/50 px-8 py-6 md:px-12 md:py-8 lg:px-16 lg:py-10">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* Left Content */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <FaUsers className="text-orange-500 text-2xl" />
              <div className="w-16 h-1 bg-orange-500"></div>
            </div>
            
            <h2 className="text-5xl md:text-7xl font-bold text-[#0F5132] mb-4 tracking-tight leading-none" style={{ fontFamily: 'Playfair Display, serif' }}>
              हमारे <span style={{ background: 'linear-gradient(135deg,#FFD700,#FF6B00,#FFD700)', backgroundSize: '200% auto', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>लोग</span>
            </h2>
            
            <h3 className="text-2xl font-semibold text-gray-800 mb-6">
              जनता की आवाज़, विकास की पहचान
            </h3>
            
            <p className="text-gray-500 mb-10 leading-relaxed text-lg max-w-lg">
              हमारा संकल्प है - हर व्यक्ति का सम्मान, हर परिवार का उत्थान 
              और हर गाँव, हर नगर का समग्र विकास। आइए, मिलकर बनाएं 
              एक सशक्त, समृद्ध और आत्मनिर्भर भारत।
            </p>
            
            <motion.button 
              onClick={() => {
                window.scrollTo(0, 0);
                navigate('/hamare-log');
              }}
              className="bg-[#0F5132] text-white pl-8 pr-2 py-2 rounded-full flex items-center gap-4 w-max hover:bg-[#1a7a4a] transition-colors"
              style={{ boxShadow: '0 0 20px rgba(15,81,50,0.4)' }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="font-semibold tracking-wide">सभी देखें</span>
              <span className="bg-orange-500 rounded-full p-3 text-white flex items-center justify-center">
                <FaArrowRight size={14} />
              </span>
            </motion.button>
          </motion.div>

          {/* Right Content (Images & Video) */}
          <motion.div 
            className="relative w-full h-[280px] sm:h-[400px] lg:h-[480px] flex items-center justify-center mt-6 lg:mt-0"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {/* Left Image */}
            <motion.div 
              className="absolute left-0 sm:left-4 z-10 w-28 sm:w-44 lg:w-52 h-36 sm:h-56 lg:h-72 rounded-2xl overflow-hidden border-4 sm:border-[6px] border-white shadow-xl sm:shadow-2xl bg-gray-200"
              style={{ rotate: '-12deg', y: '10%' }}
              whileHover={{ rotate: 0, scale: 1.05, zIndex: 40 }}
            >
              <img src="/hmarelog1.jpeg" alt="Hmare Log 1" className="w-full h-full object-cover" />
            </motion.div>

            {/* Center Video */}
            <motion.div 
              className="absolute left-1/2 -translate-x-1/2 z-30 w-36 sm:w-52 lg:w-60 h-48 sm:h-72 lg:h-[360px] rounded-2xl overflow-hidden border-4 sm:border-[6px] border-white shadow-xl sm:shadow-2xl bg-gray-800 cursor-pointer group"
              whileHover={{ scale: 1.05 }}
              onClick={() => setIsMuted(!isMuted)}
            >
              <video 
                src="/HMarelogVideo.mp4" 
                autoPlay 
                loop 
                muted={isMuted}
                playsInline 
                className="w-full h-full object-cover" 
              />
              <div className="absolute bottom-2 right-2 sm:bottom-3 sm:right-3 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center text-white opacity-80 group-hover:opacity-100 transition-opacity">
                {isMuted ? <FaVolumeMute size={16} /> : <FaVolumeUp size={16} />}
              </div>
            </motion.div>

            {/* Right Image */}
            <motion.div 
              className="absolute right-0 sm:right-4 z-20 w-28 sm:w-44 lg:w-52 h-36 sm:h-56 lg:h-72 rounded-2xl overflow-hidden border-4 sm:border-[6px] border-white shadow-xl sm:shadow-2xl bg-gray-200"
              style={{ rotate: '12deg', y: '5%' }}
              whileHover={{ rotate: 0, scale: 1.05, zIndex: 40 }}
            >
              <img src="/hmarelog2.jpeg" alt="Hmare Log 2" className="w-full h-full object-cover" />
            </motion.div>

          </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
