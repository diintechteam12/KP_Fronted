import { motion } from 'framer-motion';

export default function SectionTitle({ subtitle, title, highlight, desc, light = false, center = true }) {
  return (
    <motion.div
      className={`mb-16 ${center ? 'text-center' : ''}`}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7 }}
    >
      {subtitle && (
        <span className="inline-block text-sm font-semibold tracking-[4px] uppercase mb-4 text-orange-500">
          {subtitle}
        </span>
      )}
      <h2 className={`text-4xl md:text-5xl font-bold mb-5 leading-tight ${light ? 'text-white' : 'text-gray-900'}`}
        style={{ fontFamily: 'Playfair Display, serif' }}>
        {title}{' '}
        {highlight && (
          <span style={{ background: 'linear-gradient(135deg,#FFD700,#FF6B00,#FFD700)', backgroundSize: '200% auto', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
            {highlight}
          </span>
        )}
      </h2>
      {desc && (
        <p className={`max-w-2xl text-lg leading-relaxed ${center ? 'mx-auto' : ''} ${light ? 'text-gray-300' : 'text-gray-500'}`}>
          {desc}
        </p>
      )}
      <div className={`flex items-center gap-2 mt-5 ${center ? 'justify-center' : ''}`}>
        <div className="h-1 w-12 rounded-full bg-green-800" />
        <div className="h-1 w-6 rounded-full bg-yellow-400" />
        <div className="h-1 w-3 rounded-full bg-orange-500" />
      </div>
    </motion.div>
  );
}
