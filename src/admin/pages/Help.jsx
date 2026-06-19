import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaChevronDown, FaChevronUp, FaEnvelope, FaWhatsapp } from 'react-icons/fa';

const faqs = [
  { q: 'How do I update the gallery images?', a: 'Go to Gallery section. You can view and delete existing images. To add new images, place them in the public folder and update the data file.' },
  { q: 'How do I add a new event?', a: 'Navigate to the Events page and click "Add Event". Fill in the title, date, location, and description, then click Add.' },
  { q: 'How do I update social media followers count?', a: 'Go to Social Media page, click Edit on any platform card, update the followers field and click Save.' },
  { q: 'How do I add a new campaign?', a: 'Go to Campaign page and click "New Campaign". Fill in all details including goal, dates, and expected reach.' },
  { q: 'How do I manage people in the system?', a: 'Go to the People page. You can add leaders, volunteers and supporters. Use the search and filter to find specific people.' },
  { q: 'How do I change my dashboard password?', a: 'Go to Settings > Change Password. Enter your current password and new password, then click Update.' },
];

export default function Help() {
  const [openIdx, setOpenIdx] = useState(null);

  return (
    <div className="p-4 md:p-6">
      <div className="mb-5">
        <h2 className="text-gray-900 text-lg font-bold">Help & Support</h2>
        <p className="text-gray-400 text-xs mt-0.5">Find answers and get help</p>
      </div>
      <div className="max-w-3xl space-y-5">
        <div className="grid md:grid-cols-2 gap-3">
          {[
            { icon: FaEnvelope, label: 'Email Support', value: 'support@kpsinghkasana.in', color: '#0F5132', sub: 'Reply within 24 hours' },
            { icon: FaWhatsapp, label: 'WhatsApp', value: '+91 98765 43210', color: '#25D366', sub: 'Available 9AM - 6PM' },
          ].map((c, i) => (
            <motion.div key={c.label} className="flex items-center gap-4 p-4 rounded-xl border border-gray-200 bg-white"
              style={{ boxShadow: '0 1px 4px rgba(0,0,0,0.05)' }}
              initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
              <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                style={{ background: `${c.color}15`, border: `1px solid ${c.color}25` }}>
                <c.icon style={{ color: c.color }} size={16} />
              </div>
              <div>
                <p className="text-gray-900 font-semibold text-sm">{c.label}</p>
                <p className="text-sm font-medium" style={{ color: c.color }}>{c.value}</p>
                <p className="text-gray-400 text-xs">{c.sub}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <h3 className="text-gray-900 font-semibold text-sm">Frequently Asked Questions</h3>
        <div className="space-y-2">
          {faqs.map((faq, i) => (
            <motion.div key={i} className="rounded-xl border border-gray-200 bg-white overflow-hidden"
              style={{ boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}
              initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}>
              <button onClick={() => setOpenIdx(openIdx === i ? null : i)}
                className="w-full flex items-center justify-between px-4 py-3.5 text-left cursor-pointer hover:bg-gray-50 transition-colors">
                <span className="text-gray-900 text-sm font-medium pr-4">{faq.q}</span>
                {openIdx === i
                  ? <FaChevronUp className="text-green-600 shrink-0" size={12} />
                  : <FaChevronDown className="text-gray-400 shrink-0" size={12} />}
              </button>
              {openIdx === i && (
                <div className="px-4 pb-4 border-t border-gray-100">
                  <p className="text-gray-500 text-sm leading-relaxed pt-3">{faq.a}</p>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
