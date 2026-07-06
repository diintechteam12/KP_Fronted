import { motion } from 'framer-motion';
import { FaQuoteLeft, FaEye } from 'react-icons/fa';

export default function CoreVision() {
  return (
    <section id="vision" className="py-24 relative overflow-hidden" style={{ background: '#0B0F19' }}>
      
      {/* Background Decor */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-1/3 h-1/2 bg-[#0F5132]/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 left-0 w-1/3 h-1/2 bg-[#FFD700]/5 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        
        <div className="text-center mb-12">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 border border-yellow-500/30 bg-yellow-500/10"
          >
            <FaEye className="text-yellow-400" />
            <span className="text-xs font-semibold tracking-widest uppercase text-yellow-400">Our Vision</span>
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight" 
            style={{ fontFamily: 'Playfair Display,serif' }}
          >
            A Future Built on <br className="md:hidden" /><span className="text-[#FFD700]">Trust & Progress</span>
          </motion.h2>
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

          <div className="relative z-10 flex flex-col gap-10 mt-4">
            
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="flex gap-5"
            >
              <div className="w-1.5 min-h-full bg-gradient-to-b from-[#FFD700] to-transparent rounded-full shrink-0" />
              <h3 className="text-2xl md:text-3xl font-medium text-white leading-relaxed" style={{ fontFamily: 'Playfair Display,serif' }}>
                "Building an educated, empowered, and prosperous society."
              </h3>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
              className="flex gap-5"
            >
              <div className="w-1.5 min-h-full bg-gradient-to-b from-[#0F5132] to-transparent rounded-full shrink-0" />
              <h3 className="text-2xl md:text-3xl font-medium text-white leading-relaxed" style={{ fontFamily: 'Playfair Display,serif' }}>
                "Leading with service, development, and trust for every citizen."
              </h3>
            </motion.div>

          </div>
        </motion.div>

      </div>
    </section>
  );
}
