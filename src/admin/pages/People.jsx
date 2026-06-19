import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaUser, FaPhone, FaMapMarkerAlt, FaPlus, FaTrash, FaSearch } from 'react-icons/fa';

const initial = [
  { id: 1, name: 'Rajesh Kumar', role: 'Community Leader', location: 'Haryana', phone: '+91 98001 11111', type: 'Leader' },
  { id: 2, name: 'Priya Sharma', role: 'Education Advocate', location: 'Delhi', phone: '+91 98002 22222', type: 'Volunteer' },
  { id: 3, name: 'Amit Singh', role: 'Youth Leader', location: 'UP', phone: '+91 98003 33333', type: 'Leader' },
  { id: 4, name: 'Sunita Devi', role: 'Self Help Group Leader', location: 'Rajasthan', phone: '+91 98004 44444', type: 'Volunteer' },
  { id: 5, name: 'Vikram Yadav', role: 'Local Businessman', location: 'UP', phone: '+91 98005 55555', type: 'Supporter' },
  { id: 6, name: 'Mohan Lal', role: 'Village Head', location: 'Haryana', phone: '+91 98006 66666', type: 'Leader' },
];

const typeColor = { Leader: '#0F5132', Volunteer: '#FF6B00', Supporter: '#FFD700' };

export default function People() {
  const [people, setPeople] = useState(initial);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('All');
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: '', role: '', location: '', phone: '', type: 'Volunteer' });

  const filtered = people.filter(p => {
    const ms = p.name.toLowerCase().includes(search.toLowerCase()) || p.role.toLowerCase().includes(search.toLowerCase());
    return ms && (filter === 'All' || p.type === filter);
  });

  const onAdd = () => {
    if (!form.name) return;
    setPeople([{ id: Date.now(), ...form }, ...people]);
    setForm({ name: '', role: '', location: '', phone: '', type: 'Volunteer' });
    setShowForm(false);
  };

  return (
    <div className="p-4 md:p-6 space-y-4">
      <div>
        <h2 className="text-gray-900 text-lg font-bold">People</h2>
        <p className="text-gray-400 text-xs mt-0.5">Manage supporters, volunteers and leaders</p>
      </div>

      <div className="grid grid-cols-3 gap-3">
        {[
          { label: 'Total', value: people.length },
          { label: 'Leaders', value: people.filter(p => p.type === 'Leader').length },
          { label: 'Volunteers', value: people.filter(p => p.type === 'Volunteer').length },
        ].map((s, i) => (
          <motion.div key={s.label} className="p-3 rounded-xl border border-gray-200 bg-white text-center"
            style={{ boxShadow: '0 1px 4px rgba(0,0,0,0.05)' }}
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}>
            <div className="text-xl font-bold text-black">{s.value}</div>
            <div className="text-gray-500 text-xs mt-0.5">{s.label}</div>
          </motion.div>
        ))}
      </div>

      <div className="flex flex-wrap gap-2">
        <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-50 border border-gray-200 flex-1 min-w-[160px]">
          <FaSearch size={11} className="text-gray-400 shrink-0" />
          <input placeholder="Search people..." value={search} onChange={e => setSearch(e.target.value)}
            className="bg-transparent text-gray-700 text-sm outline-none flex-1 placeholder-gray-400" />
        </div>
        {['All', 'Leader', 'Volunteer', 'Supporter'].map(t => (
          <button key={t} onClick={() => setFilter(t)}
            className="px-3 py-2 rounded-lg text-xs font-semibold cursor-pointer border transition-all"
            style={{ background: filter === t ? '#0F5132' : '#fff', color: filter === t ? '#fff' : '#6b7280', borderColor: filter === t ? '#0F5132' : '#e5e7eb' }}>
            {t}
          </button>
        ))}
        <button onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold text-white cursor-pointer"
          style={{ background: 'linear-gradient(135deg,#0F5132,#1a7a4a)' }}>
          <FaPlus size={10} /> Add Person
        </button>
      </div>

      {showForm && (
        <motion.div className="rounded-xl border border-gray-200 bg-white p-4 grid md:grid-cols-2 gap-3"
          style={{ boxShadow: '0 1px 4px rgba(0,0,0,0.05)' }}
          initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}>
          {[{ p: 'Full Name', f: 'name' }, { p: 'Role', f: 'role' }, { p: 'Location', f: 'location' }, { p: 'Phone', f: 'phone' }].map(f => (
            <input key={f.f} placeholder={f.p} value={form[f.f]} onChange={e => setForm({ ...form, [f.f]: e.target.value })}
              className="px-3 py-2.5 rounded-lg bg-gray-50 border border-gray-200 text-gray-900 text-sm outline-none focus:border-green-500 placeholder-gray-400" />
          ))}
          <select value={form.type} onChange={e => setForm({ ...form, type: e.target.value })}
            className="px-3 py-2.5 rounded-lg bg-gray-50 border border-gray-200 text-gray-900 text-sm outline-none">
            <option value="Leader">Leader</option>
            <option value="Volunteer">Volunteer</option>
            <option value="Supporter">Supporter</option>
          </select>
          <button onClick={onAdd} className="px-4 py-2.5 rounded-lg text-white text-sm font-semibold cursor-pointer"
            style={{ background: 'linear-gradient(135deg,#0F5132,#1a7a4a)' }}>Add Person</button>
        </motion.div>
      )}

      <div className="grid md:grid-cols-2 gap-2">
        {filtered.map((p, i) => (
          <motion.div key={p.id} className="flex items-center gap-3 p-3.5 rounded-xl border border-gray-200 bg-white"
            style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
            whileHover={{ boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }}>
            <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0 bg-gray-50 border border-gray-100">
              <FaUser style={{ color: typeColor[p.type] }} size={13} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5 mb-0.5">
                <h4 className="text-gray-900 font-semibold text-sm truncate">{p.name}</h4>
                <span className="px-1.5 py-0.5 rounded text-[9px] font-bold text-white shrink-0"
                  style={{ background: typeColor[p.type] }}>{p.type}</span>
              </div>
              <p className="text-gray-500 text-xs truncate">{p.role}</p>
              <div className="flex items-center gap-3 mt-0.5 text-xs text-gray-400">
                <span className="flex items-center gap-1"><FaMapMarkerAlt size={8} />{p.location}</span>
                <span className="flex items-center gap-1 truncate"><FaPhone size={8} />{p.phone}</span>
              </div>
            </div>
            <button onClick={() => setPeople(people.filter(x => x.id !== p.id))}
              className="w-7 h-7 rounded-lg bg-red-50 flex items-center justify-center text-red-400 hover:bg-red-100 cursor-pointer shrink-0">
              <FaTrash size={11} />
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
