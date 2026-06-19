import { FaUsers, FaEye, FaShareAlt, FaBullhorn, FaImages, FaCalendarAlt, FaArrowUp, FaArrowDown } from 'react-icons/fa';
import StatCard from '../components/StatCard';
import { motion } from 'framer-motion';

const stats = [
  { icon: FaUsers, label: 'Total Followers', value: '34K+', sub: 'Across all platforms', color: '#0F5132' },
  { icon: FaEye, label: 'Profile Views', value: '12.4K', sub: 'This month', color: '#FF6B00' },
  { icon: FaShareAlt, label: 'Social Mentions', value: '842', sub: 'Last 30 days', color: '#FFD700' },
  { icon: FaBullhorn, label: 'Active Campaigns', value: '3', sub: 'Currently running', color: '#0F5132' },
  { icon: FaImages, label: 'Gallery Photos', value: '11', sub: 'Total uploaded', color: '#FF6B00' },
  { icon: FaCalendarAlt, label: 'Upcoming Events', value: '2', sub: 'Scheduled', color: '#FFD700' },
];

const recentActivity = [
  { action: 'New contact form submission', time: '2 mins ago', type: 'info' },
  { action: 'Gallery image uploaded', time: '1 hour ago', type: 'success' },
  { action: 'Campaign "Vision 2030" updated', time: '3 hours ago', type: 'warning' },
  { action: 'New follower milestone: 34K', time: '1 day ago', type: 'success' },
  { action: 'Event "Youth Summit" created', time: '2 days ago', type: 'info' },
];

const typeColor = { info: '#3B82F6', success: '#0F5132', warning: '#FF6B00' };

export default function Overview() {
  return (
    <div className="p-4 md:p-6 space-y-5">
      <div>
        <h2 className="text-gray-900 text-lg font-bold">Overview</h2>
        <p className="text-gray-400 text-xs mt-0.5">Welcome back — here is what is happening today</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
        {stats.map((s, i) => <StatCard key={s.label} {...s} index={i} />)}
      </div>

      <div className="grid lg:grid-cols-3 gap-4">
        <motion.div className="lg:col-span-2 rounded-xl border border-gray-200 bg-white overflow-hidden"
          style={{ boxShadow: '0 1px 4px rgba(0,0,0,0.05)' }}
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <div className="px-5 py-3.5 border-b border-gray-100 flex items-center justify-between">
            <h3 className="text-gray-900 font-semibold text-sm">Recent Activity</h3>
            <span className="text-xs text-gray-400">Last 7 days</span>
          </div>
          <div className="divide-y divide-gray-50">
            {recentActivity.map((a, i) => (
              <div key={i} className="flex items-center gap-3 px-5 py-3">
                <div className="w-2 h-2 rounded-full shrink-0" style={{ background: typeColor[a.type] }} />
                <p className="text-gray-700 text-sm flex-1">{a.action}</p>
                <span className="text-gray-400 text-xs shrink-0">{a.time}</span>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div className="rounded-xl border border-gray-200 bg-white overflow-hidden"
          style={{ boxShadow: '0 1px 4px rgba(0,0,0,0.05)' }}
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <div className="px-5 py-3.5 border-b border-gray-100">
            <h3 className="text-gray-900 font-semibold text-sm">Platform Reach</h3>
          </div>
          <div className="p-5 space-y-4">
            {[
              { label: 'Facebook', value: '34K', change: '+12%', up: true, color: '#1877F2' },
              { label: 'Instagram', value: '12K', change: '+8%', up: true, color: '#E4405F' },
              { label: 'YouTube', value: '8K', change: '+5%', up: true, color: '#FF0000' },
              { label: 'LinkedIn', value: '5K', change: '-2%', up: false, color: '#0A66C2' },
            ].map(p => (
              <div key={p.label} className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-3 h-3 rounded-full shrink-0" style={{ background: p.color }} />
                  <span className="text-gray-700 text-sm">{p.label}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-gray-900 font-semibold text-sm">{p.value}</span>
                  <span className={`text-xs flex items-center gap-0.5 font-medium ${p.up ? 'text-green-600' : 'text-red-500'}`}>
                    {p.up ? <FaArrowUp size={9} /> : <FaArrowDown size={9} />}{p.change}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
