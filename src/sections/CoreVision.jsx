import { motion, AnimatePresence } from 'framer-motion';
import { FaQuoteLeft, FaEye } from 'react-icons/fa';
import { useLanguage } from '../context/LanguageContext';

export default function CoreVision() {
  const { lang } = useLanguage();
  return (
    <section id="vision" className="py-24 relative overflow-hidden" style={{ background: '#0B0F19' }}>
      
      {/* Background Decor */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-1/3 h-1/2 bg-[#0F5132]/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 left-0 w-1/3 h-1/2 bg-[#FFD700]/5 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        <div className="text-center mb-12 flex flex-col items-center">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 border border-yellow-500/30 bg-yellow-500/10"
          >
            <FaEye className="text-yellow-400" />
            <span className="text-xs font-semibold tracking-widest uppercase text-yellow-400">
              {lang === 'hi' ? 'हमारा दृष्टिकोण' : 'Our Vision'}
            </span>
          </motion.div>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="relative rounded-3xl p-8 md:p-14 overflow-hidden border border-white/5"
          style={{ 
            background: 'linear-gradient(135deg, rgba(15,81,50,0.15) 0%, rgba(11,15,25,0.9) 100%)',
            boxShadow: '0 20px 50px rgba(15,81,50,0.1)' 
          }}
        >
          {/* Decorative Elements inside card */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-green-500/10 rounded-full blur-[80px]" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-yellow-500/10 rounded-full blur-[80px]" />
          
          <FaQuoteLeft className="text-6xl text-white/5 absolute top-8 left-8" />

          <div className="relative z-10 flex flex-col mt-4">
            
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="flex gap-5"
            >
              <div className="w-1.5 min-h-full bg-gradient-to-b from-[#FFD700] to-[#0F5132] rounded-full shrink-0" />
              <div className="flex flex-col gap-8 min-h-[120px] justify-center">
                <AnimatePresence mode="wait">
                  {lang === 'en' ? (
                    <motion.h3 
                      key="en" 
                      initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3 }}
                      className="text-2xl md:text-3xl font-medium text-white leading-relaxed" style={{ fontFamily: 'Playfair Display,serif' }}
                    >
                      To build an educated, empowered, and prosperous society by leading with service, development, and trust.
                    </motion.h3>
                  ) : (
                    <motion.h3 
                      key="hi" 
                      initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3 }}
                      className="text-2xl md:text-3xl font-medium text-white leading-relaxed" style={{ fontFamily: 'Playfair Display,serif' }}
                    >
                      सेवा, विकास और विश्वास के साथ नेतृत्व करते हुए शिक्षित, सशक्त और समृद्ध समाज का निर्माण।
                    </motion.h3>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>

          </div>
        </motion.div>

      </div>
    </section>
  );
}
