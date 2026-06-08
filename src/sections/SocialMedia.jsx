import { motion } from 'framer-motion';
import { FaFacebook, FaInstagram, FaYoutube, FaLinkedin, FaArrowRight } from 'react-icons/fa';
import SectionTitle from '../components/SectionTitle';
import { socialStats } from '../data/data';

const iconMap = { FaFacebook, FaInstagram, FaYoutube, FaLinkedin };

export default function SocialMedia() {
  return (
    <section id="social" className="py-24 bg-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{ backgroundImage: 'radial-gradient(circle at 50% 50%,#0F5132 0%,transparent 60%)' }} />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <SectionTitle subtitle="Join the Family" title="34,000 Already" highlight="With Us"
          desc="Follow along and stay part of everything that is happening on the ground." />

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {socialStats.map((s, i) => {
            const Icon = iconMap[s.icon];
            return (
              <motion.a key={s.platform} href={s.url || '#'} target="_blank" rel="noopener noreferrer"
                className="group relative p-8 rounded-2xl text-center overflow-hidden cursor-pointer block"
                style={{ background: `${s.color}08`, border: `1px solid ${s.color}20` }}
                initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.12 }}
                whileHover={{ y: -8, boxShadow: `0 20px 50px ${s.color}25` }}>
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{ background: `radial-gradient(circle at 50% 50%,${s.color}12,transparent 70%)` }} />

                <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-5 text-white transition-transform duration-300 group-hover:scale-110"
                  style={{ background: s.color, boxShadow: `0 0 20px ${s.color}50` }}>
                  {Icon && <Icon />}
                </div>

                <h3 className="text-gray-900 font-bold text-lg mb-1">{s.platform}</h3>
                <p className="text-gray-400 text-sm mb-3">{s.handle}</p>
                <div className="text-3xl font-bold mb-4" style={{ color: s.color, fontFamily: 'Cinzel,serif' }}>{s.followers}</div>
                <p className="text-gray-500 text-xs mb-4">Followers</p>

                <div className="flex items-center justify-center gap-2 text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: s.color }}>
                  Follow Now <FaArrowRight size={12} />
                </div>

                <div className="absolute bottom-0 left-0 right-0 h-[2px]"
                  style={{ background: `linear-gradient(90deg,transparent,${s.color},transparent)` }} />
              </motion.a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
