import { motion } from 'framer-motion';
import SectionTitle from '../components/SectionTitle';
import { initiatives } from '../data/data';

export default function Initiatives() {
  return (
    <section id="initiatives" className="py-24 relative overflow-hidden"
      style={{ background: 'linear-gradient(135deg,#0B0F19,#0d1a10,#0B0F19)' }}>
      <div className="max-w-7xl mx-auto px-6">
        <SectionTitle subtitle="Real Work" title="Initiatives That" highlight="Actually Deliver"
          desc="No big announcements. Just programs that show up, do the work, and make a difference you can see." light />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {initiatives.map((item, i) => (
            <motion.div key={item.id}
              className="relative rounded-2xl overflow-hidden group cursor-pointer"
              style={{ boxShadow: '0 10px 30px rgba(0,0,0,0.3)' }}
              initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
              whileHover={{ y: -6 }}>
              <img src={item.image} alt={item.title} className="w-full object-cover transition-transform duration-700 group-hover:scale-110" style={{ height: 260 }} />
              <div className="absolute inset-0 transition-all duration-300 group-hover:opacity-100 opacity-80"
                style={{ background: `linear-gradient(to top,rgba(11,15,25,0.95) 0%,rgba(11,15,25,0.4) 60%,transparent 100%)` }} />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold mb-2 text-white"
                  style={{ background: item.color }}>
                  {item.category}
                </span>
                <h3 className="text-white font-bold text-lg mb-2" style={{ fontFamily: 'Playfair Display,serif' }}>{item.title}</h3>
                <p className="text-gray-300 text-sm leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-300">{item.desc}</p>
              </div>
              <div className="absolute top-0 left-0 right-0 h-[3px]" style={{ background: `linear-gradient(90deg,transparent,${item.color},transparent)` }} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
