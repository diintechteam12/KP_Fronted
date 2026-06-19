import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaNewspaper, FaLink, FaCalendar, FaPlus, FaTrash } from 'react-icons/fa';

const initialMentions = [
  { id: 1, title: 'KP Singh Kasana Creates Jobs for 10,000 Young People', source: 'Dainik Jagran', date: 'Dec 15, 2024', url: '#', type: 'News' },
  { id: 2, title: 'National Honor for 38 Years of Community Service', source: 'Amar Ujala', date: 'Nov 28, 2024', url: '#', type: 'Award' },
  { id: 3, title: '10,000 Women Achieve Financial Independence', source: 'Navbharat Times', date: 'Oct 10, 2024', url: '#', type: 'News' },
  { id: 4, title: 'Vision 2030 — A Real Plan, Not a Manifesto', source: 'Hindustan Times', date: 'Sep 5, 2024', url: '#', type: 'Feature' },
];

const typeColor = { News: '#0F5132', Award: '#FFD700', Feature: '#FF6B00' };

export default function DigitalMention() {
  const [mentions, setMentions] = useState(initialMentions);
  const [showAdd, setShowAdd] = useState(false);
  const [form, setForm] = useState({ title: '', source: '', date: '', url: '', type: 'News' });

  const onAdd = () => {
    if (!form.title || !form.source) return;
    setMentions([{ id: Date.now(), ...form }, ...mentions]);
    setForm({ title: '', source: '', date: '', url: '', type: 'News' });
    setShowAdd(false);
  };

  return (
    <div className="p-4 md:p-6 space-y-4">
      <div>
        <h2 className="text-gray-900 text-lg font-bold">Digital Mentions</h2>
        <p className="text-gray-400 text-xs mt-0.5">Track media coverage and press mentions</p>
      </div>

      <div className="grid grid-cols-3 gap-3">
        {[
          { label: 'Total Mentions', value: mentions.length },
          { label: 'This Month', value: 2 },
          { label: 'News Articles', value: mentions.filter(m => m.type === 'News').length },
        ].map((s, i) => (
          <motion.div key={s.label} className="p-3 rounded-xl border border-gray-200 bg-white text-center"
            style={{ boxShadow: '0 1px 4px rgba(0,0,0,0.05)' }}
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}>
            <div className="text-xl font-bold text-black">{s.value}</div>
            <div className="text-gray-500 text-xs mt-0.5">{s.label}</div>
          </motion.div>
        ))}
      </div>

      <div className="flex justify-between items-center">
        <h3 className="text-gray-900 font-semibold text-sm">All Mentions</h3>
        <button onClick={() => setShowAdd(!showAdd)}
          className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold text-white cursor-pointer"
          style={{ background: 'linear-gradient(135deg,#0F5132,#1a7a4a)' }}>
          <FaPlus size={10} /> Add Mention
        </button>
      </div>

      {showAdd && (
        <motion.div className="rounded-xl border border-gray-200 bg-white p-4 grid md:grid-cols-2 gap-3"
          style={{ boxShadow: '0 1px 4px rgba(0,0,0,0.05)' }}
          initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}>
          {[
            { placeholder: 'Headline / Title', field: 'title' },
            { placeholder: 'Source', field: 'source' },
            { placeholder: 'Date', field: 'date', type: 'date' },
            { placeholder: 'URL', field: 'url' },
          ].map(f => (
            <input key={f.field} placeholder={f.placeholder} type={f.type || 'text'} value={form[f.field]}
              onChange={e => setForm({ ...form, [f.field]: e.target.value })}
              className="px-3 py-2.5 rounded-lg bg-gray-50 border border-gray-200 text-gray-900 text-sm outline-none focus:border-green-500 placeholder-gray-400" />
          ))}
          <select value={form.type} onChange={e => setForm({ ...form, type: e.target.value })}
            className="px-3 py-2.5 rounded-lg bg-gray-50 border border-gray-200 text-gray-900 text-sm outline-none">
            <option value="News">News</option>
            <option value="Award">Award</option>
            <option value="Feature">Feature</option>
          </select>
          <button onClick={onAdd} className="px-4 py-2.5 rounded-lg text-white text-sm font-semibold cursor-pointer"
            style={{ background: 'linear-gradient(135deg,#0F5132,#1a7a4a)' }}>Add Mention</button>
        </motion.div>
      )}

      <div className="space-y-2">
        {mentions.map((m, i) => (
          <motion.div key={m.id} className="flex items-start gap-3 p-4 rounded-xl border border-gray-200 bg-white"
            style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}
            initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.06 }}
            whileHover={{ boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }}>
            <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0 bg-gray-50 border border-gray-100">
              <FaNewspaper style={{ color: typeColor[m.type] }} size={13} />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="text-gray-900 text-sm font-semibold leading-snug mb-1 truncate">{m.title}</h4>
              <div className="flex flex-wrap items-center gap-2 text-xs text-gray-400">
                <span className="font-semibold" style={{ color: typeColor[m.type] }}>{m.type}</span>
                <span>{m.source}</span>
                <span className="flex items-center gap-1"><FaCalendar size={9} />{m.date}</span>
              </div>
            </div>
            <div className="flex items-center gap-1.5 shrink-0">
              <a href={m.url} className="w-7 h-7 rounded-lg flex items-center justify-center bg-gray-100 text-gray-500 hover:bg-gray-200 cursor-pointer">
                <FaLink size={11} />
              </a>
              <button onClick={() => setMentions(mentions.filter(x => x.id !== m.id))}
                className="w-7 h-7 rounded-lg flex items-center justify-center bg-red-50 text-red-400 hover:bg-red-100 cursor-pointer">
                <FaTrash size={11} />
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
