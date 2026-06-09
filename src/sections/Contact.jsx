import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaFacebook, FaInstagram, FaYoutube, FaLinkedin, FaPaperPlane } from 'react-icons/fa';
import SectionTitle from '../components/SectionTitle';
import { personalInfo } from '../data/data';

export default function Contact() {
  const [form, setForm] = useState({ name: '', phone: '', email: '', message: '' });
  const [sent, setSent] = useState(false);

  const onChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 3000);
    setForm({ name: '', phone: '', email: '', message: '' });
  };

  const info = [
    { Icon: FaPhone, label: 'Phone', value: personalInfo.phone, color: '#0F5132' },
    { Icon: FaEnvelope, label: 'Email', value: personalInfo.email, color: '#FF6B00' },
    { Icon: FaMapMarkerAlt, label: 'Address', value: personalInfo.address, color: '#FFD700' },
  ];

  const socials = [
    { Icon: FaFacebook, color: '#1877F2', href: personalInfo.facebook },
    { Icon: FaInstagram, color: '#E4405F', href: personalInfo.instagram },
    { Icon: FaYoutube, color: '#FF0000', href: personalInfo.youtube },
    { Icon: FaLinkedin, color: '#0A66C2', href: personalInfo.linkedin },
  ];

  return (
    <section id="contact" className="py-24 relative overflow-hidden"
      style={{ background: 'linear-gradient(135deg,#0B0F19 0%,#071a0e 50%,#0B0F19 100%)' }}>

      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full opacity-10"
          style={{ backgroundImage: 'radial-gradient(circle at 20% 50%,#0F5132 0%,transparent 50%)' }} />
        <div className="absolute inset-0 opacity-[0.03]"
          style={{ backgroundImage: 'linear-gradient(rgba(255,215,0,0.4) 1px,transparent 1px),linear-gradient(90deg,rgba(255,215,0,0.4) 1px,transparent 1px)', backgroundSize: '60px 60px' }} />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <SectionTitle subtitle="Get in Touch" title="The Door Is" highlight="Always Open"
          desc="Any question, any concern, or just want to be part of what we are doing — reach out directly." light />

        {/* Top grid — info + form */}
        <div className="grid lg:grid-cols-2 gap-12 mb-12">
          {/* Left - Info */}
          <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
            <h3 className="text-white text-2xl font-bold mb-4" style={{ fontFamily: 'Playfair Display,serif' }}>You Are Welcome Here</h3>
            <p className="text-gray-400 leading-relaxed mb-6">
              Big issue or small — we listen. Because that is what real service looks like.
            </p>

            <div className="space-y-4 mb-6">
              {info.map(({ Icon, label, value, color }) => (
                <div key={label} className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                    style={{ background: `${color}15`, border: `1px solid ${color}30` }}>
                    <Icon style={{ color }} size={14} />
                  </div>
                  <div>
                    <p className="text-gray-500 text-xs mb-0.5">{label}</p>
                    <p className="text-white text-sm font-medium">{value}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Small Map */}
            <motion.div
              className="rounded-2xl overflow-hidden border border-white/10 mb-6"
              style={{ boxShadow: '0 10px 30px rgba(0,0,0,0.4)' }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <div className="flex items-center gap-2 px-4 py-2 border-b border-white/10"
                style={{ background: 'rgba(255,255,255,0.04)' }}>
                <FaMapMarkerAlt className="text-green-400" size={12} />
                <span className="text-gray-400 text-xs">New Delhi, India</span>
                <span className="ml-auto w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              </div>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3501.669!2d77.2090!3d28.6139!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfd5b347eb62d%3A0x52c2b7494e204dce!2sNew%20Delhi%2C%20Delhi!5e0!3m2!1sen!2sin!4v1717862400000!5m2!1sen!2sin"
                width="100%"
                height="200"
                style={{ border: 0, display: 'block', filter: 'grayscale(30%) contrast(1.1)' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="K P Singh Kasana Location"
              />
            </motion.div>

            <div>
              <p className="text-gray-500 text-sm mb-3">Follow on Social Media</p>
              <div className="flex gap-3">
                {socials.map(({ Icon, color, href }, i) => (
                  <motion.a key={i} href={href} target="_blank" rel="noopener noreferrer"
                    className="w-10 h-10 rounded-xl flex items-center justify-center text-white cursor-pointer"
                    style={{ background: `${color}20`, border: `1px solid ${color}30` }}
                    whileHover={{ scale: 1.15, background: color, boxShadow: `0 0 20px ${color}50` }}
                    whileTap={{ scale: 0.95 }}>
                    <Icon size={14} />
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right - Form */}
          <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
            <div className="p-8 rounded-3xl backdrop-blur-xl bg-white/[0.04] border border-white/10">
              <form onSubmit={onSubmit} className="space-y-5">
                {[
                  { name: 'name', placeholder: 'Your Full Name', type: 'text' },
                  { name: 'phone', placeholder: 'Phone Number', type: 'tel' },
                  { name: 'email', placeholder: 'Email Address', type: 'email' },
                ].map(f => (
                  <input key={f.name} name={f.name} type={f.type} placeholder={f.placeholder}
                    value={form[f.name]} onChange={onChange} required
                    className="w-full px-5 py-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 text-sm outline-none focus:border-yellow-400/50 transition-all duration-300" />
                ))}
                <textarea name="message" placeholder="Your Message" rows={4} value={form.message} onChange={onChange} required
                  className="w-full px-5 py-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 text-sm outline-none focus:border-yellow-400/50 transition-all duration-300 resize-none" />

                <motion.button type="submit"
                  className="w-full py-4 rounded-xl font-semibold text-white flex items-center justify-center gap-2 cursor-pointer"
                  style={{ background: sent ? 'linear-gradient(135deg,#1a7a4a,#0F5132)' : 'linear-gradient(135deg,#0F5132,#1a7a4a)', boxShadow: '0 0 25px rgba(15,81,50,0.4)' }}
                  whileHover={{ scale: 1.02, boxShadow: '0 0 40px rgba(15,81,50,0.6)' }}
                  whileTap={{ scale: 0.98 }}>
                  <FaPaperPlane />
                  {sent ? 'Message Sent ✓' : 'Send Message'}
                </motion.button>
              </form>
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
