import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaLock, FaBell, FaShieldAlt, FaSave } from 'react-icons/fa';

export default function Settings() {
  const [password, setPassword] = useState({ current: '', newPass: '', confirm: '' });
  const [notifications, setNotifications] = useState({ email: true, browser: false, weekly: true });
  const [saved, setSaved] = useState('');

  const onSave = (id) => { setSaved(id); setTimeout(() => setSaved(''), 2000); };

  const Section = ({ title, icon: Icon, color, id, children }) => (
    <motion.div className="rounded-xl border border-gray-200 bg-white overflow-hidden"
      style={{ boxShadow: '0 1px 4px rgba(0,0,0,0.05)' }}
      initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
      <div className="flex items-center gap-3 px-5 py-3.5 border-b border-gray-100">
        <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-gray-100">
          <Icon style={{ color }} size={14} />
        </div>
        <h3 className="text-gray-900 font-semibold text-sm flex-1">{title}</h3>
        {saved === id && <span className="text-green-600 text-xs font-semibold">✓ Saved</span>}
      </div>
      <div className="p-5">{children}</div>
    </motion.div>
  );

  return (
    <div className="p-4 md:p-6">
      <div className="mb-5">
        <h2 className="text-gray-900 text-lg font-bold">Settings</h2>
        <p className="text-gray-400 text-xs mt-0.5">Configure dashboard preferences</p>
      </div>
      <div className="max-w-2xl space-y-4">
        <Section title="Change Password" icon={FaLock} color="#0F5132" id="password">
          <div className="space-y-3">
            {[{ label: 'Current Password', field: 'current' }, { label: 'New Password', field: 'newPass' }, { label: 'Confirm New Password', field: 'confirm' }].map(f => (
              <div key={f.field}>
                <label className="text-gray-500 text-xs font-medium uppercase tracking-wide mb-1 block">{f.label}</label>
                <input type="password" value={password[f.field]} onChange={e => setPassword({ ...password, [f.field]: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-lg bg-gray-50 border border-gray-200 text-gray-900 text-sm outline-none focus:border-green-500" />
              </div>
            ))}
            <button onClick={() => onSave('password')}
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-white text-sm font-semibold cursor-pointer mt-1"
              style={{ background: 'linear-gradient(135deg,#0F5132,#1a7a4a)' }}>
              <FaSave size={12} /> Update Password
            </button>
          </div>
        </Section>

        <Section title="Notifications" icon={FaBell} color="#FF6B00" id="notif">
          <div className="space-y-4">
            {[
              { label: 'Email Notifications', sub: 'Receive alerts via email', key: 'email' },
              { label: 'Browser Notifications', sub: 'Push notifications in browser', key: 'browser' },
              { label: 'Weekly Summary', sub: 'Get weekly activity report', key: 'weekly' },
            ].map(n => (
              <div key={n.key} className="flex items-center justify-between">
                <div>
                  <p className="text-gray-900 text-sm font-medium">{n.label}</p>
                  <p className="text-gray-400 text-xs">{n.sub}</p>
                </div>
                <button onClick={() => setNotifications({ ...notifications, [n.key]: !notifications[n.key] })}
                  className="w-10 h-5 rounded-full transition-all duration-300 relative cursor-pointer shrink-0"
                  style={{ background: notifications[n.key] ? '#0F5132' : '#e5e7eb' }}>
                  <div className="w-3.5 h-3.5 bg-white rounded-full absolute top-[3px] transition-all duration-300 shadow-sm"
                    style={{ left: notifications[n.key] ? '22px' : '3px' }} />
                </button>
              </div>
            ))}
            <button onClick={() => onSave('notif')}
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-white text-sm font-semibold cursor-pointer"
              style={{ background: 'linear-gradient(135deg,#FF6B00,#ff8c00)' }}>
              <FaSave size={12} /> Save Preferences
            </button>
          </div>
        </Section>

        <Section title="Security" icon={FaShieldAlt} color="#FFD700" id="security">
          <div className="space-y-1">
            {[
              { label: 'Two-Factor Authentication', status: 'Disabled' },
              { label: 'Login Activity Log', status: 'Enabled' },
              { label: 'Session Timeout', status: '30 minutes' },
            ].map(s => (
              <div key={s.label} className="flex items-center justify-between py-2.5 border-b border-gray-100 last:border-0">
                <span className="text-gray-700 text-sm">{s.label}</span>
                <span className="text-xs font-semibold px-2.5 py-1 rounded-full"
                  style={{ background: s.status === 'Enabled' ? '#dcfce7' : '#f3f4f6', color: s.status === 'Enabled' ? '#16a34a' : '#6b7280' }}>
                  {s.status}
                </span>
              </div>
            ))}
          </div>
        </Section>
      </div>
    </div>
  );
}
