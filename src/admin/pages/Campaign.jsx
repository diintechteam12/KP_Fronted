import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaBullhorn, FaPlus, FaTrash, FaCalendar, FaUsers } from 'react-icons/fa';

const initial = [
  { id: 1, title: 'Vision 2030', goal: 'Complete infrastructure development across all villages', startDate: '2024-01-01', endDate: '2030-12-31', status: 'Active', reach: '50,000+', type: 'Development' },
  { id: 2, title: 'Women Forward', goal: 'Empower 10,000 women with skills and microfinance', startDate: '2024-03-01', endDate: '2025-03-01', status: 'Active', reach: '10,000+', type: 'Welfare' },
  { id: 3, title: 'Youth Skill Drive', goal: 'Train 5,000 youth in vocational skills', startDate: '2024-06-01', endDate: '2025-06-01', status: 'Active', reach: '5,000+', type: 'Education' },
  { id: 4, title: 'Free Education Initiative', goal: 'Provide scholarships to 500 underprivileged students', startDate: '2023-01-01', endDate: '2023-12-31', status: 'Completed', reach: '500+', type: 'Education' },
];

const statusColor = { Active: '#0F5132', Completed: '#FF6B00', Paused: '#FFD700' };
const typeColor = { Development: '#0F5132', Welfare: '#FF6B00', Education: '#FFD700' };

export default function Campaign() {
  const [campaigns, setCampaigns] = useState(initial);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ title: '', goal: '', startDate: '', endDate: '', status: 'Active', reach: '', type: 'Development' });

  const onAdd = () => {
    if (!form.title) return;
    setCampaigns([{ id: Date.now(), ...form }, ...campaigns]);
    setForm({ title: '', goal: '', startDate: '', endDate: '', status: 'Active', reach: '', type: 'Development' });
    setShowForm(false);
  };

  return (
    <div className="p-4 md:p-6 space-y-4">
      <div>
        <h2 className="text-gray-900 text-lg font-bold">Campaign</h2>
        <p className="text-gray-400 text-xs mt-0.5">Manage active and past campaigns</p>
      </div>

      <div className="grid grid-cols-3 gap-3">
        {[
          { label: 'Total', value: campaigns.length },
          { label: 'Active', value: campaigns.filter(c => c.status === 'Active').length },
          { label: 'Completed', value: campaigns.filter(c => c.status === 'Completed').length },
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
        <h3 className="text-gray-900 font-semibold text-sm">All Campaigns</h3>
        <button onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold text-white cursor-pointer"
          style={{ background: 'linear-gradient(135deg,#0F5132,#1a7a4a)' }}>
          <FaPlus size={10} /> New Campaign
        </button>
      </div>

      {showForm && (
        <motion.div className="rounded-xl border border-gray-200 bg-white p-4 grid md:grid-cols-2 gap-3"
          style={{ boxShadow: '0 1px 4px rgba(0,0,0,0.05)' }}
          initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}>
          <input placeholder="Campaign Title" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })}
            className="px-3 py-2.5 rounded-lg bg-gray-50 border border-gray-200 text-gray-900 text-sm outline-none focus:border-green-500 placeholder-gray-400" />
          <input placeholder="Expected Reach" value={form.reach} onChange={e => setForm({ ...form, reach: e.target.value })}
            className="px-3 py-2.5 rounded-lg bg-gray-50 border border-gray-200 text-gray-900 text-sm outline-none focus:border-green-500 placeholder-gray-400" />
          <input type="date" value={form.startDate} onChange={e => setForm({ ...form, startDate: e.target.value })}
            className="px-3 py-2.5 rounded-lg bg-gray-50 border border-gray-200 text-gray-900 text-sm outline-none" />
          <input type="date" value={form.endDate} onChange={e => setForm({ ...form, endDate: e.target.value })}
            className="px-3 py-2.5 rounded-lg bg-gray-50 border border-gray-200 text-gray-900 text-sm outline-none" />
          <select value={form.type} onChange={e => setForm({ ...form, type: e.target.value })}
            className="px-3 py-2.5 rounded-lg bg-gray-50 border border-gray-200 text-gray-900 text-sm outline-none">
            {['Development', 'Welfare', 'Education'].map(t => <option key={t} value={t}>{t}</option>)}
          </select>
          <select value={form.status} onChange={e => setForm({ ...form, status: e.target.value })}
            className="px-3 py-2.5 rounded-lg bg-gray-50 border border-gray-200 text-gray-900 text-sm outline-none">
            {['Active', 'Paused', 'Completed'].map(s => <option key={s} value={s}>{s}</option>)}
          </select>
          <textarea placeholder="Campaign Goal" value={form.goal} onChange={e => setForm({ ...form, goal: e.target.value })} rows={2}
            className="md:col-span-2 w-full px-3 py-2.5 rounded-lg bg-gray-50 border border-gray-200 text-gray-900 text-sm outline-none focus:border-green-500 placeholder-gray-400 resize-none" />
          <button onClick={onAdd} className="px-5 py-2.5 rounded-lg text-white text-sm font-semibold cursor-pointer"
            style={{ background: 'linear-gradient(135deg,#0F5132,#1a7a4a)' }}>Create Campaign</button>
        </motion.div>
      )}

      <div className="space-y-2">
        {campaigns.map((c, i) => (
          <motion.div key={c.id} className="p-4 rounded-xl border border-gray-200 bg-white"
            style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}
            whileHover={{ boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }}>
            <div className="flex items-start justify-between gap-3 mb-2">
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0 bg-gray-50 border border-gray-100">
                  <FaBullhorn style={{ color: typeColor[c.type] }} size={13} />
                </div>
                <div>
                  <div className="flex items-center gap-2 flex-wrap mb-0.5">
                    <h4 className="text-gray-900 font-bold text-sm">{c.title}</h4>
                    <span className="px-2 py-0.5 rounded-full text-[9px] font-bold text-white" style={{ background: statusColor[c.status] }}>{c.status}</span>
                    <span className="px-2 py-0.5 rounded-full text-[9px] font-bold text-white" style={{ background: typeColor[c.type] }}>{c.type}</span>
                  </div>
                  <p className="text-gray-500 text-xs">{c.goal}</p>
                </div>
              </div>
              <button onClick={() => setCampaigns(campaigns.filter(x => x.id !== c.id))}
                className="w-7 h-7 rounded-lg bg-red-50 flex items-center justify-center text-red-400 hover:bg-red-100 cursor-pointer shrink-0">
                <FaTrash size={11} />
              </button>
            </div>
            <div className="flex items-center gap-4 text-xs text-gray-400 pl-12">
              <span className="flex items-center gap-1"><FaCalendar size={9} />{c.startDate} → {c.endDate}</span>
              <span className="flex items-center gap-1"><FaUsers size={9} />Reach: <strong className="text-gray-700 ml-1">{c.reach}</strong></span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
