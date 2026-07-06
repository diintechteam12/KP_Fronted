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
              className="relative w-full max-w-[420px] bg-white border border-gray-100 rounded-3xl overflow-hidden shadow-2xl p-6 md:p-8 flex flex-col items-center mx-4"
            >
              {/* Close Button */}
              <button 
                onClick={() => setIsModalOpen(false)}
                className="absolute top-3 right-3 md:top-4 md:right-4 w-10 h-10 flex items-center justify-center bg-gray-100 hover:bg-gray-200 text-gray-600 hover:text-gray-900 rounded-full transition-colors z-20 active:scale-95"
              >
                <FaTimes size={16} />
              </button>

              {/* Logo Circle */}
              <div className="w-24 h-24 rounded-full border-4 border-green-100 flex items-center justify-center mb-4 shadow-sm overflow-hidden bg-gray-100">
                <img src="/Kp%20image.png" alt="K.P. Kasana" className="w-full h-full object-cover" />
              </div>

              {/* Title */}
              <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center w-full" style={{ fontFamily: 'sans-serif' }}>
                Join Our Movement
              </h3>

              {/* Call Card */}
              <div className="w-full bg-[#0F5132] rounded-2xl p-4 flex items-center justify-between mb-8 shadow-sm">
                <div className="text-left ml-2">
                  <div className="text-[10px] uppercase font-bold text-green-200 tracking-wider mb-1">To Join Call</div>
                  <div className="text-2xl font-extrabold text-white tracking-tight">+91 98765 43210</div>
                </div>
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center text-white shrink-0">
                  <FaPhoneAlt size={18} />
                </div>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
                
                {/* Name Input */}
                <div className="w-full flex items-center bg-gray-50 rounded-xl border border-gray-200 px-4 py-3 shadow-sm focus-within:border-green-600 focus-within:ring-1 focus-within:ring-green-600 transition-all">
                  <FaUser className="text-gray-400 mr-3 shrink-0" />
                  <input 
                    type="text" 
                    required
                    placeholder="Full Name" 
                    className="w-full bg-transparent outline-none text-gray-900 font-medium placeholder-gray-500"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                  />
                </div>

                {/* Phone Input */}
                <div className="w-full flex items-center bg-gray-50 rounded-xl border border-gray-200 px-4 py-3 shadow-sm focus-within:border-green-600 focus-within:ring-1 focus-within:ring-green-600 transition-all">
                  <div className="flex items-center gap-2 pr-3 border-r border-gray-200 shrink-0">
                    <img src="https://flagcdn.com/w20/in.png" alt="IN" className="w-5 rounded-[2px]" />
                    <span className="text-gray-600 font-bold text-sm">+91</span>
                  </div>
                  <input 
                    type="tel" 
                    required
                    placeholder="Mobile Number" 
                    className="w-full bg-transparent outline-none text-gray-900 font-medium placeholder-gray-500 pl-3"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  />
                </div>

                {/* Submit Button */}
                <button 
                  type="submit"
                  className="w-full text-white font-bold text-lg py-4 rounded-2xl mt-4 hover:shadow-lg transition-all active:scale-[0.98]"
                  style={{ background: 'linear-gradient(135deg,#0F5132,#1a7a4a)' }}
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
