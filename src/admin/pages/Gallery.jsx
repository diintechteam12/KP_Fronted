import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTrash, FaExpand, FaTimes } from 'react-icons/fa';

const initialImages = [
  { id: 1, src: '/img1.jpeg', title: 'People Gathered, Voices Heard', category: 'Public Meetings' },
  { id: 2, src: '/img2.jpeg', title: 'Among Our Own People', category: 'Community Events' },
  { id: 3, src: '/img3.jpeg', title: 'Another Day of Showing Up', category: 'Social Service' },
  { id: 4, src: '/IMG4.png', title: 'Standing With the People', category: 'Public Meetings' },
  { id: 5, src: '/IMG5.png', title: 'Community Comes First', category: 'Community Events' },
  { id: 6, src: '/IMG6.png', title: 'Serving on the Ground', category: 'Social Service' },
  { id: 7, src: '/IMG7.png', title: 'Investing in the Future', category: 'Education Programs' },
];

const categories = ['All', 'Public Meetings', 'Community Events', 'Social Service', 'Education Programs'];

export default function Gallery() {
  const [images, setImages] = useState(initialImages);
  const [filter, setFilter] = useState('All');
  const [preview, setPreview] = useState(null);
  const filtered = filter === 'All' ? images : images.filter(img => img.category === filter);

  return (
    <div className="p-4 md:p-6 space-y-4">
      <div>
        <h2 className="text-gray-900 text-lg font-bold">Gallery</h2>
        <p className="text-gray-400 text-xs mt-0.5">Manage photo gallery images</p>
      </div>

      <div className="grid grid-cols-3 gap-3">
        {[{ label: 'Total Images', value: images.length }, { label: 'Categories', value: categories.length - 1 }, { label: 'Showing', value: filtered.length }].map((s, i) => (
          <motion.div key={s.label} className="p-3 rounded-xl border border-gray-200 bg-white text-center"
            style={{ boxShadow: '0 1px 4px rgba(0,0,0,0.05)' }}
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}>
            <div className="text-xl font-bold text-black">{s.value}</div>
            <div className="text-gray-500 text-xs mt-0.5">{s.label}</div>
          </motion.div>
        ))}
      </div>

      <div className="flex flex-wrap gap-2">
        {categories.map(c => (
          <button key={c} onClick={() => setFilter(c)}
            className="px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition-all border"
            style={{ background: filter === c ? '#0F5132' : '#fff', color: filter === c ? '#fff' : '#6b7280', borderColor: filter === c ? '#0F5132' : '#e5e7eb' }}>
            {c}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        <AnimatePresence>
          {filtered.map((img, i) => (
            <motion.div key={img.id} className="relative group rounded-xl overflow-hidden bg-gray-100 border border-gray-200"
              style={{ aspectRatio: '1' }}
              initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} transition={{ delay: i * 0.04 }}>
              <img src={img.src} alt={img.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2">
                <button onClick={() => setPreview(img)} className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center text-white cursor-pointer hover:bg-white/30"><FaExpand size={12} /></button>
                <button onClick={() => setImages(images.filter(x => x.id !== img.id))} className="w-8 h-8 rounded-lg bg-red-500/60 flex items-center justify-center text-white cursor-pointer hover:bg-red-500/80"><FaTrash size={12} /></button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {preview && (
          <motion.div className="fixed inset-0 z-[99999] flex items-center justify-center p-4 bg-black/80"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setPreview(null)}>
            <motion.div className="relative max-w-2xl w-full rounded-2xl overflow-hidden"
              initial={{ scale: 0.85 }} animate={{ scale: 1 }} exit={{ scale: 0.85 }} onClick={e => e.stopPropagation()}>
              <img src={preview.src} alt={preview.title} className="w-full object-cover" />
              <button onClick={() => setPreview(null)} className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/50 flex items-center justify-center text-white cursor-pointer"><FaTimes size={13} /></button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
