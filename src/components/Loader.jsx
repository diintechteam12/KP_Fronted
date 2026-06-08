import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Loader({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        const next = prev + Math.random() * 4 + 1;
        if (next >= 100) {
          clearInterval(interval);
          setTimeout(() => { setDone(true); setTimeout(onComplete, 600); }, 400);
          return 100;
        }
        return next;
      });
    }, 55);
    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[99999] flex flex-col items-center justify-center overflow-hidden"
          style={{ background: 'linear-gradient(135deg, #0B0F19 0%, #0F1E2E 40%, #0B1A0F 100%)' }}
          exit={{ opacity: 0, scale: 1.04 }}
          transition={{ duration: 0.7 }}
        >
          {/* Gold sweep */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            style={{ background: 'linear-gradient(105deg, transparent 30%, rgba(255,215,0,0.07) 50%, transparent 70%)' }}
            animate={{ x: ['-100%', '200%'] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: 'linear' }}
          />

          {/* Rings + Logo */}
          <div className="relative flex items-center justify-center mb-10">
            <motion.div
              className="absolute w-44 h-44 rounded-full border border-dashed border-yellow-400/20"
              animate={{ rotate: 360 }}
              transition={{ duration: 14, repeat: Infinity, ease: 'linear' }}
            />
            <motion.div
              className="absolute w-36 h-36 rounded-full border border-green-700/30"
              animate={{ rotate: -360 }}
              transition={{ duration: 9, repeat: Infinity, ease: 'linear' }}
            />
            <motion.div
              className="w-28 h-28 rounded-full flex items-center justify-center relative"
              style={{ background: 'linear-gradient(135deg, #0F5132, #1a7a4a)', boxShadow: '0 0 40px rgba(15,81,50,0.6)' }}
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 1, ease: 'backOut' }}
            >
              <span className="text-white text-3xl font-bold" style={{ fontFamily: 'Cinzel, serif' }}>KP</span>
              <motion.div
                className="absolute inset-0 rounded-full bg-yellow-400/10"
                animate={{ scale: [1, 1.5, 1], opacity: [0.4, 0, 0.4] }}
                transition={{ duration: 2.5, repeat: Infinity }}
              />
            </motion.div>
          </div>

          {/* Name */}
          <motion.h1
            className="text-white text-3xl md:text-4xl font-bold text-center tracking-widest mb-2"
            style={{ fontFamily: 'Cinzel, serif' }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            K P Singh{' '}
            <span style={{ background: 'linear-gradient(135deg,#FFD700,#FF6B00)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Kasana
            </span>
          </motion.h1>

          <motion.p
            className="text-yellow-400/60 text-xs tracking-[6px] uppercase mb-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            Visionary Leader
          </motion.p>

          {/* Progress */}
          <div className="w-64 md:w-80">
            <div className="flex justify-between mb-2">
              <span className="text-gray-500 text-xs tracking-widest uppercase">Loading</span>
              <span className="text-yellow-400 text-xs font-bold">{Math.min(Math.round(progress), 100)}%</span>
            </div>
            <div className="h-1 rounded-full bg-white/10 overflow-hidden">
              <motion.div
                className="h-full rounded-full"
                style={{ background: 'linear-gradient(90deg, #0F5132, #FFD700, #FF6B00)' }}
                animate={{ width: `${Math.min(progress, 100)}%` }}
                transition={{ duration: 0.1 }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
