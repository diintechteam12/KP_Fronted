import { motion } from 'framer-motion';

export default function StatCard({ icon: Icon, label, value, sub, color, index }) {
  return (
    <motion.div
      className="p-3 rounded-xl border border-gray-200 bg-white relative overflow-hidden"
      style={{ boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.06 }}
      whileHover={{ y: -2, boxShadow: '0 4px 14px rgba(0,0,0,0.1)' }}
    >
      <div className="flex items-center justify-between mb-2">
        <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-gray-100">
          <Icon style={{ color }} size={14} />
        </div>
        <span className="text-[10px] font-semibold text-gray-400">Live</span>
      </div>
      <div className="text-xl font-bold text-black leading-tight">{value}</div>
      <div className="text-gray-600 text-xs mt-0.5">{label}</div>
      {sub && <div className="text-gray-400 text-[10px] mt-0.5">{sub}</div>}
      <div className="absolute bottom-0 left-0 right-0 h-[2px]"
        style={{ background: `linear-gradient(90deg,transparent,${color},transparent)` }} />
    </motion.div>
  );
}
