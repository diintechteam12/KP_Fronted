import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaFacebook, FaInstagram, FaYoutube, FaLinkedin, FaEdit, FaSave } from 'react-icons/fa';

const platforms = [
  { key: 'facebook', label: 'Facebook', icon: FaFacebook, color: '#1877F2' },
  { key: 'instagram', label: 'Instagram', icon: FaInstagram, color: '#E4405F' },
  { key: 'youtube', label: 'YouTube', icon: FaYoutube, color: '#FF0000' },
  { key: 'linkedin', label: 'LinkedIn', icon: FaLinkedin, color: '#0A66C2' },
];

const initialStats = {
  facebook: { followers: '34,000', posts: '128', engagement: '4.2%', url: 'https://facebook.com/kpsinghkasana' },
  instagram: { followers: '12,000', posts: '89', engagement: '5.8%', url: 'https://instagram.com/kpsinghkasana' },
  youtube: { followers: '8,000', posts: '45', engagement: '6.1%', url: 'https://youtube.com/kpsinghkasana' },
  linkedin: { followers: '5,000', posts: '67', engagement: '3.4%', url: 'https://linkedin.com/in/kpsinghkasana' },
};

export default function SocialMedia() {
  const [stats, setStats] = useState(initialStats);
  const [editing, setEditing] = useState(null);
  const [temp, setTemp] = useState({});

  return (
    <div className="p-4 md:p-6 space-y-5">
      <div>
        <h2 className="text-gray-900 text-lg font-bold">Social Media</h2>
        <p className="text-gray-400 text-xs mt-0.5">Monitor and manage social platform stats</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {platforms.map((p, i) => (
          <motion.div key={p.key} className="p-3 rounded-xl border border-gray-200 bg-white text-center"
            style={{ boxShadow: '0 1px 4px rgba(0,0,0,0.05)' }}
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}>
            <div className="w-9 h-9 rounded-lg flex items-center justify-center mx-auto mb-2 text-white" style={{ background: p.color }}>
              <p.icon size={15} />
            </div>
            <div className="text-lg font-bold text-black">{stats[p.key].followers}</div>
            <div className="text-gray-500 text-xs mt-0.5">{p.label}</div>
          </motion.div>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {platforms.map((p, i) => (
          <motion.div key={p.key} className="rounded-xl border border-gray-200 bg-white overflow-hidden"
            style={{ boxShadow: '0 1px 4px rgba(0,0,0,0.05)' }}
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.09 }}>
            <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white" style={{ background: p.color }}>
                  <p.icon size={13} />
                </div>
                <span className="text-gray-900 font-semibold text-sm">{p.label}</span>
              </div>
              {editing === p.key
                ? <button onClick={() => { setStats({ ...stats, [p.key]: temp }); setEditing(null); }}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs text-white cursor-pointer bg-green-600">
                    <FaSave size={10} /> Save
                  </button>
                : <button onClick={() => { setEditing(p.key); setTemp(stats[p.key]); }}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs text-gray-600 cursor-pointer bg-gray-100 hover:bg-gray-200">
                    <FaEdit size={10} /> Edit
                  </button>
              }
            </div>
            <div className="p-4 space-y-3">
              {[{ label: 'Followers', field: 'followers' }, { label: 'Posts', field: 'posts' }, { label: 'Engagement', field: 'engagement' }, { label: 'URL', field: 'url' }].map(f => (
                <div key={f.field} className="flex items-center justify-between gap-3">
                  <span className="text-gray-400 text-xs font-medium shrink-0">{f.label}</span>
                  {editing === p.key
                    ? <input value={temp[f.field]} onChange={e => setTemp({ ...temp, [f.field]: e.target.value })}
                        className="flex-1 px-2.5 py-1.5 rounded-lg bg-gray-50 border border-gray-200 text-gray-900 text-xs outline-none focus:border-green-500 text-right" />
                    : <span className="text-gray-900 text-xs font-semibold truncate text-right">{stats[p.key][f.field]}</span>
                  }
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
