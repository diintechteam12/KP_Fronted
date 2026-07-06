import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaFacebook, FaInstagram, FaYoutube, FaLinkedin, FaPaperPlane, FaTimes } from 'react-icons/fa';
import SectionTitle from '../components/SectionTitle';

export default function Contact() {
  const [form, setForm] = useState({ name: '', phone: '', email: '', message: '' });
  const [status, setStatus] = useState({ loading: false, sent: false, error: null });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [contactData, setContactData] = useState({
    email: 'kpkasanait@gmail.com',
    phone: '+91 98765 43210',
    address: 'New Delhi, India',
    mapLink: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3501.669!2d77.2090!3d28.6139!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfd5b347eb62d%3A0x52c2b7494e204dce!2sNew%20Delhi%2C%20Delhi!5e0!3m2!1sen!2sin!4v1717862400000!5m2!1sen!2sin',
    facebook: '#',
    instagram: '#',
    youtube: '#',
    linkedin: '#'
  });

  useEffect(() => {
    const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
    fetch(`${apiUrl}/portfolio-website/kp-kasana-portfolio`)
      .then(res => res.json())
      .then(data => {
        if (data.success && data.data && data.data.contact) {
          setContactData(prev => ({ ...prev, ...data.data.contact }));
        }
      })
      .catch(err => console.error("Error fetching contact data:", err));
  }, []);

  const onChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    setStatus({ loading: true, sent: false, error: null });
    
    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
      const res = await fetch(`${apiUrl}/contact-messages/submit`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      
      const data = await res.json();
      
      if (data.success) {
        setStatus({ loading: false, sent: true, error: null });
        setTimeout(() => {
          setStatus(prev => ({ ...prev, sent: false }));
          setIsModalOpen(false); // Close modal on success
        }, 3000);
        setForm({ name: '', phone: '', email: '', message: '' });
      } else {
        setStatus({ loading: false, sent: false, error: data.message || 'Failed to send message' });
      }
    } catch (error) {
      console.error("Error submitting contact form:", error);
      setStatus({ loading: false, sent: false, error: 'Network error. Please try again later.' });
    }
  };

  const info = [
    { Icon: FaPhone, label: 'Phone', value: contactData.phone, color: '#0F5132' },
    { Icon: FaEnvelope, label: 'Email', value: contactData.email, color: '#FF6B00' },
  ];

  const socials = [
    { Icon: FaFacebook, color: '#1877F2', href: contactData.facebook },
    { Icon: FaInstagram, color: '#E4405F', href: contactData.instagram },
    { Icon: FaYoutube, color: '#FF0000', href: contactData.youtube },
    { Icon: FaLinkedin, color: '#0A66C2', href: contactData.linkedin },
  ].filter(s => s.href && s.href !== '#');

  return (
    <section id="contact" className="py-24 relative overflow-hidden">

      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full opacity-10"
          style={{ backgroundImage: 'radial-gradient(circle at 20% 50%,#0F5132 0%,transparent 50%)' }} />
        <div className="absolute inset-0 opacity-[0.03]"
          style={{ backgroundImage: 'linear-gradient(rgba(255,215,0,0.4) 1px,transparent 1px),linear-gradient(90deg,rgba(255,215,0,0.4) 1px,transparent 1px)', backgroundSize: '60px 60px' }} />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <SectionTitle subtitle="Get in Touch" title="The Door Is" highlight="Always Open"
          desc="Any question, any concern, or just want to be part of what we are doing — reach out directly." />

        {/* Top layout — info + button */}
        <div className="flex flex-col lg:flex-row items-center gap-8 mb-8 bg-white/50 backdrop-blur-md border border-gray-100 p-6 md:p-8 rounded-3xl shadow-xl max-w-5xl mx-auto">
          {/* Left - Info */}
          <motion.div className="flex-1 w-full" initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
            <h3 className="text-gray-900 text-2xl font-bold mb-4" style={{ fontFamily: 'Playfair Display,serif' }}>You Are Welcome Here</h3>
            <p className="text-gray-600 leading-relaxed mb-6">
              Big issue or small — we listen. Because that is what real service looks like.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 mb-2">
              {info.map(({ Icon, label, value, color }) => (
                <div key={label} className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                    style={{ background: `${color}15`, border: `1px solid ${color}30` }}>
                    <Icon style={{ color }} size={14} />
                  </div>
                  <div>
                    <p className="text-gray-500 text-xs mb-0.5">{label}</p>
                    <p className="text-gray-900 text-sm font-medium">{value}</p>
                  </div>
                </div>
              ))}
            </div>

          </motion.div>

          {/* Right - Contact Now Button */}
          <motion.div className="flex-1 w-full flex justify-center lg:justify-end" initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
             <motion.button 
               onClick={() => setIsModalOpen(true)}
               className="py-4 px-10 rounded-xl font-bold text-white flex items-center justify-center gap-3 cursor-pointer shadow-2xl text-lg"
               style={{ background: 'linear-gradient(135deg,#0F5132,#1a7a4a)', boxShadow: '0 0 30px rgba(15,81,50,0.3)' }}
               whileHover={{ scale: 1.05, boxShadow: '0 0 40px rgba(15,81,50,0.5)' }}
               whileTap={{ scale: 0.95 }}>
               <FaPaperPlane />
               Contact Now
             </motion.button>
          </motion.div>
        </div>

      </div>

      {/* MODAL FORM */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }} 
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-[500px] bg-white border border-gray-100 rounded-2xl shadow-2xl overflow-hidden"
            >
              <button 
                onClick={() => setIsModalOpen(false)}
                className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full transition-colors z-20"
              >
                <FaTimes />
              </button>

              <div className="p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6" style={{ fontFamily: 'Playfair Display,serif' }}>Send a Message</h3>
                
                {status.error && (
                  <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">
                    {status.error}
                  </div>
                )}
                
                <form onSubmit={onSubmit} className="space-y-4">
                  {[
                    { name: 'name', placeholder: 'Your Full Name', type: 'text' },
                    { name: 'phone', placeholder: 'Phone Number', type: 'tel' },
                    { name: 'email', placeholder: 'Email Address', type: 'email' },
                  ].map(f => (
                    <input key={f.name} name={f.name} type={f.type} placeholder={f.placeholder}
                      value={form[f.name]} onChange={onChange} required
                      className="w-full px-5 py-4 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-500 text-sm outline-none focus:border-green-600/50 focus:ring-1 focus:ring-green-600/50 transition-all duration-300" />
                  ))}
                  <textarea name="message" placeholder="Your Message" rows={4} value={form.message} onChange={onChange} required
                    className="w-full px-5 py-4 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-500 text-sm outline-none focus:border-green-600/50 focus:ring-1 focus:ring-green-600/50 transition-all duration-300 resize-none" />

                  <motion.button type="submit" disabled={status.loading}
                    className="w-full py-4 rounded-xl font-semibold text-white flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 mt-2"
                    style={{ background: status.sent ? 'linear-gradient(135deg,#1a7a4a,#0F5132)' : 'linear-gradient(135deg,#0F5132,#1a7a4a)', boxShadow: '0 0 25px rgba(15,81,50,0.4)' }}
                    whileHover={{ scale: 1.02, boxShadow: '0 0 40px rgba(15,81,50,0.6)' }}
                    whileTap={{ scale: 0.98 }}>
                    <FaPaperPlane />
                    {status.loading ? 'Sending...' : status.sent ? 'Message Sent ✓' : 'Send Message'}
                  </motion.button>
                </form>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </section>
  );
}
