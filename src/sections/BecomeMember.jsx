import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaArrowRight, FaUser, FaPhoneAlt } from 'react-icons/fa';

export default function BecomeMember() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', phone: '' });

  // Prevent scrolling when modal is open
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isModalOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate submission
    alert(`Thank you ${formData.name}! Your request has been received.`);
    setIsModalOpen(false);
    setFormData({ name: '', phone: '' });
  };

  return (
    <section id="join-us" className="py-24 relative overflow-hidden" style={{ backgroundColor: '#0B0F19' }}>
      
      {/* Background Decor */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-[100px]"
          style={{ background: 'radial-gradient(circle, #eab308, transparent 70%)' }} />
      </div>

      <div className="max-w-[1200px] mx-auto px-6 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto"
        >
          <div className="flex items-center justify-center gap-4 mb-4">
            <span className="h-[1px] w-12 bg-[#eab308]" />
            <h4 className="text-[#eab308] uppercase tracking-widest text-sm font-semibold">BECOME A MEMBER</h4>
            <span className="h-[1px] w-12 bg-[#eab308]" />
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight" style={{ fontFamily: 'Playfair Display, serif' }}>
            Ready to Make a <br/><span className="text-[#eab308]">Real Difference?</span>
          </h2>
          
          <p className="text-gray-300 text-lg mb-10 leading-relaxed">
            Join thousands of dedicated individuals working together for the progress and betterment of our community. Your voice matters, your action matters.
          </p>

          <button
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center gap-3 bg-[#eab308] text-black px-8 py-4 rounded-full font-bold text-lg hover:bg-white hover:scale-105 transition-all shadow-[0_0_20px_rgba(234,179,8,0.3)]"
          >
            Join Us Now <FaArrowRight />
          </button>
        </motion.div>
      </div>

      {/* POPUP MODAL */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }} 
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-md"
            />
            
            {/* Modal Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-[420px] bg-[#0B0F19] border border-white/10 rounded-[2rem] overflow-hidden shadow-2xl p-8 flex flex-col items-center"
            >
              {/* Close Button */}
              <button 
                onClick={() => setIsModalOpen(false)}
                className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center bg-white/10 hover:bg-[#eab308] hover:text-black text-white rounded-full transition-colors z-20"
              >
                <FaTimes />
              </button>

              {/* Logo Circle */}
              <div className="w-20 h-20 rounded-full bg-[#eab308]/10 border-2 border-[#eab308]/30 flex items-center justify-center mb-4 shadow-sm">
                <span className="text-[#eab308] font-bold text-xl" style={{ fontFamily: 'Playfair Display, serif' }}>KPK</span>
              </div>

              {/* Title */}
              <h3 className="text-2xl font-bold text-white mb-8 text-center w-full" style={{ fontFamily: 'sans-serif' }}>
                Join Our Movement
              </h3>

              {/* Call Card */}
              <div className="w-full bg-[#eab308] rounded-2xl p-4 flex items-center justify-between mb-8 shadow-sm">
                <div className="w-12 h-12 bg-[#451a03] rounded-xl flex items-center justify-center text-[#eab308]">
                  <FaArrowRight size={20} />
                </div>
                <div className="text-right">
                  <div className="text-[10px] uppercase font-bold text-[#78350f] tracking-wider mb-1">To Join Call</div>
                  <div className="text-2xl font-extrabold text-[#451a03] tracking-tight">00000 00000</div>
                </div>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
                
                {/* Name Input */}
                <div className="w-full flex items-center bg-white/5 rounded-xl border border-white/10 px-4 py-3 shadow-sm focus-within:border-[#eab308] focus-within:ring-1 focus-within:ring-[#eab308] transition-all">
                  <FaUser className="text-gray-400 mr-3 shrink-0" />
                  <input 
                    type="text" 
                    required
                    placeholder="Full Name" 
                    className="w-full bg-transparent outline-none text-white font-medium placeholder:text-gray-500"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                  />
                </div>

                {/* Phone Input */}
                <div className="w-full flex items-center bg-white/5 rounded-xl border border-white/10 px-4 py-3 shadow-sm focus-within:border-[#eab308] focus-within:ring-1 focus-within:ring-[#eab308] transition-all">
                  <div className="flex items-center gap-2 pr-3 border-r border-white/10 shrink-0">
                    <img src="https://flagcdn.com/w20/in.png" alt="IN" className="w-5 rounded-[2px]" />
                    <span className="text-gray-400 font-bold text-sm">+91</span>
                  </div>
                  <input 
                    type="tel" 
                    required
                    placeholder="Mobile Number" 
                    className="w-full bg-transparent outline-none text-white font-medium placeholder:text-gray-500 pl-3"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  />
                </div>

                {/* Submit Button */}
                <button 
                  type="submit"
                  className="w-full bg-[#facc15] text-[#451a03] font-bold text-lg py-4 rounded-2xl mt-4 hover:bg-[#eab308] hover:shadow-lg transition-all active:scale-[0.98]"
                >
                  Continue
                </button>
              </form>

            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
