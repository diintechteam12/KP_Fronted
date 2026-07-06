import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaEdit, FaSave, FaTimes, FaCheckCircle } from 'react-icons/fa';

const initialData = {
  name: 'K. P. Kasana', title: 'Visionary Leader & Social Reformer',
  phone: '+91 98765 43210', email: 'contact@kpsinghkasana.in', address: 'New Delhi, India',
  facebook: 'https://facebook.com/kpsinghkasana', instagram: 'https://instagram.com/kpsinghkasana',
  youtube: 'https://youtube.com/kpsinghkasana', linkedin: 'https://linkedin.com/in/kpsinghkasana',
  bio: 'K. P. Kasana is a dedicated political leader and social reformer who has spent over 38 years serving communities with unwavering commitment.',
};

export default function Profile() {
  const [data, setData] = useState(initialData);
  const [editing, setEditing] = useState(false);
  const [temp, setTemp] = useState(initialData);
  const [saved, setSaved] = useState(false);

  const onSave = () => { setData(temp); setEditing(false); setSaved(true); setTimeout(() => setSaved(false), 2500); };

  const Field = ({ label, field, type = 'text' }) => (
    <div>
      <label className="text-gray-500 text-xs font-medium uppercase tracking-wide mb-1 block">{label}</label>
      {editing
        ? <input type={type} value={temp[field]} onChange={e => setTemp({ ...temp, [field]: e.target.value })}
            className="w-full px-3 py-2.5 rounded-lg bg-gray-50 border border-gray-200 text-gray-900 text-sm outline-none focus:border-green-500" />
        : <p className="text-gray-800 text-sm px-3 py-2.5 rounded-lg bg-gray-50 border border-gray-100">{data[field]}</p>
      }
    </div>
  );

  return (
    <div className="p-4 md:p-6 max-w-3xl space-y-4">
      <div>
        <h2 className="text-gray-900 text-lg font-bold">Profile</h2>
        <p className="text-gray-400 text-xs mt-0.5">Manage public profile information</p>
      </div>

      {saved && (
        <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-green-50 border border-green-200 text-green-700 text-sm">
          <FaCheckCircle size={14} /> Profile updated successfully
        </div>
      )}

      <motion.div className="rounded-xl border border-gray-200 bg-white p-4 flex flex-wrap items-center gap-4"
        style={{ boxShadow: '0 1px 4px rgba(0,0,0,0.05)' }}
        initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
        <div className="w-14 h-14 rounded-xl overflow-hidden border-2 border-green-600 shrink-0">
          <img src="/Kp image.png" alt="KP" className="w-full h-full object-cover" />
        </div>
        <div className="flex-1 min-w-0">
          <h2 className="text-gray-900 text-base font-bold truncate">{data.name}</h2>
          <p className="text-green-600 text-sm">{data.title}</p>
          <p className="text-gray-400 text-xs mt-0.5">{data.email}</p>
        </div>
        {!editing
          ? <button onClick={() => { setEditing(true); setTemp(data); }}
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold text-white cursor-pointer shrink-0"
              style={{ background: 'linear-gradient(135deg,#0F5132,#1a7a4a)' }}>
              <FaEdit size={12} /> Edit
            </button>
          : <div className="flex gap-2 shrink-0">
              <button onClick={onSave} className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold text-white cursor-pointer bg-green-600">
                <FaSave size={12} /> Save
              </button>
              <button onClick={() => setEditing(false)} className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold text-gray-600 cursor-pointer bg-gray-100">
                <FaTimes size={12} /> Cancel
              </button>
            </div>
        }
      </motion.div>

      <motion.div className="rounded-xl border border-gray-200 bg-white p-5 space-y-4"
        style={{ boxShadow: '0 1px 4px rgba(0,0,0,0.05)' }}
        initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
        <h3 className="text-gray-900 font-semibold text-sm">Personal Information</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <Field label="Full Name" field="name" />
          <Field label="Title" field="title" />
          <Field label="Phone" field="phone" type="tel" />
          <Field label="Email" field="email" type="email" />
          <Field label="Address" field="address" />
        </div>
        <div>
          <label className="text-gray-500 text-xs font-medium uppercase tracking-wide mb-1 block">Bio</label>
          {editing
            ? <textarea value={temp.bio} onChange={e => setTemp({ ...temp, bio: e.target.value })} rows={3}
                className="w-full px-3 py-2.5 rounded-lg bg-gray-50 border border-gray-200 text-gray-900 text-sm outline-none focus:border-green-500 resize-none" />
            : <p className="text-gray-700 text-sm px-3 py-2.5 rounded-lg bg-gray-50 border border-gray-100 leading-relaxed">{data.bio}</p>
          }
        </div>
        <h3 className="text-gray-900 font-semibold text-sm pt-1">Social Media Links</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <Field label="Facebook" field="facebook" />
          <Field label="Instagram" field="instagram" />
          <Field label="YouTube" field="youtube" />
          <Field label="LinkedIn" field="linkedin" />
        </div>
      </motion.div>
    </div>
  );
}
