import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaFacebook, FaInstagram, FaYoutube, FaLinkedin, FaArrowRight, FaTwitter } from 'react-icons/fa';
import SectionTitle from '../components/SectionTitle';

const iconMap = { FaFacebook, FaInstagram, FaYoutube, FaLinkedin, FaTwitter };

export default function SocialMedia() {
  const [data, setData] = useState({
    sectionSubtitle: 'Join the Family',
    sectionTitle: '34,000 Already',
    sectionHighlight: 'With Us',
    sectionDesc: 'Follow along and stay part of everything that is happening on the ground.',
    cards: [
        { platform: 'Facebook', handle: '@kpsinghkasana', followers: '34K+', icon: 'FaFacebook', color: '#1877F2', url: 'https://facebook.com' },
        { platform: 'Instagram', handle: '@kpkasanait', followers: '12K+', icon: 'FaInstagram', color: '#E4405F', url: 'https://instagram.com' },
        { platform: 'YouTube', handle: '@KPKasana-o8o', followers: '8K+', icon: 'FaYoutube', color: '#FF0000', url: 'https://youtube.com' },
        { platform: 'LinkedIn', handle: 'K P Singh Kasana', followers: '5K+', icon: 'FaLinkedin', color: '#0A66C2', url: 'https://linkedin.com' }
    ]
  });

  useEffect(() => {
    const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
    
    // Fetch both portfolio settings and live social stats
    Promise.all([
      fetch(`${apiUrl}/portfolio-website/kp-kasana-portfolio`).then(res => res.json()),
      fetch(`${apiUrl}/social/dashboard`, { headers: { 'x-client-slug': 'kp-kasana-portfolio' } }).then(res => res.json())
    ]).then(([portfolioRes, statsRes]) => {
      let newData = { ...data };
      
      // Update from portfolio settings (Title, Subtitle, etc.)
      if (portfolioRes.success && portfolioRes.data && portfolioRes.data.socialMedia) {
        newData = { ...newData, ...portfolioRes.data.socialMedia };
      }

      // Update follower counts from live stats if available
      if (statsRes.success && statsRes.data && statsRes.data.connectedAccounts) {
        const liveAccounts = statsRes.data.connectedAccounts;
        
        newData.cards = newData.cards.map(card => {
          // Find matching live account by platform name
          const match = liveAccounts.find(acc => acc.platform.toLowerCase() === card.platform.toLowerCase());
          if (match && match.followers > 0) {
            // Format number to 'K', 'M' etc.
            const formatNumber = (num) => {
              if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
              if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
              return num;
            };
            return { ...card, followers: formatNumber(match.followers) + '+' };
          }
          return card;
        });
      }
      
      setData(newData);
    }).catch(err => console.error("Error fetching social media data:", err));
  }, []);

  return (
    <section id="social" className="py-24 bg-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{ backgroundImage: 'radial-gradient(circle at 50% 50%,#0F5132 0%,transparent 60%)' }} />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <SectionTitle subtitle={data.sectionSubtitle} title={data.sectionTitle} highlight={data.sectionHighlight}
          desc={data.sectionDesc} />

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {data.cards.map((s, i) => {
            const Icon = iconMap[s.icon];
            return (
              <motion.a key={i} href={s.url || '#'} target="_blank" rel="noopener noreferrer"
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
