import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaCalendarAlt, FaMapMarkerAlt, FaPlus, FaTrash } from 'react-icons/fa';

const initial = [
  { id: 1, title: 'Youth Empowerment Summit', date: '2024-12-25', location: 'New Delhi', status: 'Upcoming', desc: 'Annual summit for youth skill development.' },
  { id: 2, title: 'Women Welfare Camp', date: '2024-12-18', location: 'Haryana', status: 'Upcoming', desc: 'Free health checkup and welfare program for women.' },
  { id: 3, title: 'Community Rally', date: '2024-11-30', location: 'UP', status: 'Completed', desc: 'Public gathering to discuss Vision 2030.' },
  { id: 4, title: 'Free Medical Camp', date: '2024-11-15', location: 'Rajasthan', status: 'Completed', desc: 'Free medical checkup camp.' },
];

const statusColor = { Upcoming: '#0F5132', Completed: '#FF6B00', Cancelled: '#ef4444' };

export default function Events() {
  const [events, setEvents] = useState(initial);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ title: '', date: '', location: '', status: 'Upcoming', desc: '' });

  const onAdd = () => {
    if (!form.title || !form.date) return;
    setEvents([{ id: Date.now(), ...form }, ...events]);
    setForm({ title: '', date: '', location: '', status: 'Upcoming', desc: '' });
    setShowForm(false);
  };

  return (
    <div className="p-4 md:p-6 space-y-4">
      <div>
        <h2 className="text-gray-900 text-lg font-bold">Events</h2>
        <p className="text-gray-400 text-xs mt-0.5">Manage upcoming and past events</p>
      </div>

      <div className="grid grid-cols-3 gap-3">
        {[{ label: 'Total Events', value: events.length }, { label: 'Upcoming', value: events.filter(e => e.status === 'Upcoming').length }, { label: 'Completed', value: events.filter(e => e.status === 'Completed').length }].map((s, i) => (
          <motion.div key={s.label} className="p-3 rounded-xl border border-gray-200 bg-white text-center"
            style={{ boxShadow: '0 1px 4px rgba(0,0,0,0.05)' }}
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}>
            <div className="text-xl font-bold text-black">{s.value}</div>
            <div className="text-gray-500 text-xs mt-0.5">{s.label}</div>
          </motion.div>
        ))}
      </div>

      <div className="flex justify-between items-center">
        <h3 className="text-gray-900 font-semibold text-sm">All Events</h3>
        <button onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold text-white cursor-pointer"
          style={{ background: 'linear-gradient(135deg,#0F5132,#1a7a4a)' }}>
          <FaPlus size={10} /> Add Event
        </button>
      </div>

      {showForm && (
        <motion.div className="rounded-xl border border-gray-200 bg-white p-4 space-y-3"
          style={{ boxShadow: '0 1px 4px rgba(0,0,0,0.05)' }}
          initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}>
          <div className="grid md:grid-cols-2 gap-3">
            <input placeholder="Event Title" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })}
              className="px-3 py-2.5 rounded-lg bg-gray-50 border border-gray-200 text-gray-900 text-sm outline-none focus:border-green-500 placeholder-gray-400" />
            <input placeholder="Location" value={form.location} onChange={e => setForm({ ...form, location: e.target.value })}
              className="px-3 py-2.5 rounded-lg bg-gray-50 border border-gray-200 text-gray-900 text-sm outline-none focus:border-green-500 placeholder-gray-400" />
            <input type="date" value={form.date} onChange={e => setForm({ ...form, date: e.target.value })}
              className="px-3 py-2.5 rounded-lg bg-gray-50 border border-gray-200 text-gray-900 text-sm outline-none" />
            <select value={form.status} onChange={e => setForm({ ...form, status: e.target.value })}
              className="px-3 py-2.5 rounded-lg bg-gray-50 border border-gray-200 text-gray-900 text-sm outline-none">
              <option value="Upcoming">Upcoming</option>
              <option value="Completed">Completed</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>
          <textarea placeholder="Description" value={form.desc} onChange={e => setForm({ ...form, desc: e.target.value })} rows={2}
            className="w-full px-3 py-2.5 rounded-lg bg-gray-50 border border-gray-200 text-gray-900 text-sm outline-none focus:border-green-500 placeholder-gray-400 resize-none" />
          <button onClick={onAdd} className="px-5 py-2 rounded-lg text-white text-sm font-semibold cursor-pointer"
            style={{ background: 'linear-gradient(135deg,#0F5132,#1a7a4a)' }}>Add Event</button>
        </motion.div>
      )}

      <div className="space-y-2">
        {events.map((ev, i) => (
          <motion.div key={ev.id} className="flex items-start gap-3 p-4 rounded-xl border border-gray-200 bg-white"
            style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}
            initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.06 }}
            whileHover={{ boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }}>
            <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0 bg-gray-50 border border-gray-100">
              <FaCalendarAlt style={{ color: statusColor[ev.status] }} size={13} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1 flex-wrap">
                <h4 className="text-gray-900 font-semibold text-sm">{ev.title}</h4>
                <span className="px-2 py-0.5 rounded-full text-[9px] font-bold text-white" style={{ background: statusColor[ev.status] }}>{ev.status}</span>
              </div>
              <div className="flex items-center gap-3 text-xs text-gray-400 mb-1">
                <span className="flex items-center gap-1"><FaCalendarAlt size={9} />{ev.date}</span>
                <span className="flex items-center gap-1"><FaMapMarkerAlt size={9} />{ev.location}</span>
              </div>
              <p className="text-gray-500 text-xs">{ev.desc}</p>
            </div>
            <button onClick={() => setEvents(events.filter(x => x.id !== ev.id))}
              className="w-7 h-7 rounded-lg bg-red-50 flex items-center justify-center text-red-400 hover:bg-red-100 cursor-pointer shrink-0">
              <FaTrash size={11} />
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
