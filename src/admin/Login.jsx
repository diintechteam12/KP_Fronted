import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaLock, FaUser, FaEye, FaEyeSlash } from 'react-icons/fa';

export default function Login({ onLogin }) {
  const [form, setForm] = useState({ username: '', password: '' });
  const [show, setShow] = useState(false);
  const [error, setError] = useState('');

  const onSubmit = e => {
    e.preventDefault();
    if (form.username === 'admin' && form.password === 'kp@2024') {
      localStorage.setItem('kp_admin', 'true');
      onLogin();
    } else {
      setError('Invalid username or password');
      setTimeout(() => setError(''), 2500);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4"
      style={{ background: 'linear-gradient(135deg,#0B0F19 0%,#0d1a10 50%,#0B0F19 100%)' }}>

      {/* Background blobs */}
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-10 pointer-events-none"
        style={{ background: 'radial-gradient(circle,#0F5132,transparent)' }} />
      <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full opacity-10 pointer-events-none"
        style={{ background: 'radial-gradient(circle,#FF6B00,transparent)' }} />

      <motion.div className="w-full max-w-md"
        initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>

        {/* Logo */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-green-700 mb-4"
            style={{ boxShadow: '0 0 30px rgba(15,81,50,0.5)' }}>
            <img src="/Kp image.png" alt="KP" className="w-full h-full object-cover" />
          </div>
          <h1 className="text-white text-2xl font-bold" style={{ fontFamily: 'Cinzel,serif' }}>
            K. P. <span style={{ background: 'linear-gradient(135deg,#FFD700,#FF6B00)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Kasana</span>
          </h1>
          <p className="text-gray-500 text-sm mt-1">Admin Dashboard</p>
        </div>

        {/* Card */}
        <div className="rounded-3xl border border-white/10 p-8"
          style={{ background: 'rgba(11,15,25,0.8)', backdropFilter: 'blur(20px)' }}>
          <h2 className="text-white text-xl font-bold mb-6 text-center">Sign In</h2>

          {error && (
            <motion.div className="mb-4 px-4 py-3 rounded-xl bg-red-500/15 border border-red-500/30 text-red-400 text-sm text-center"
              initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}>
              {error}
            </motion.div>
          )}

          <form onSubmit={onSubmit} className="space-y-4">
            <div className="relative">
              <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={14} />
              <input type="text" placeholder="Username" value={form.username}
                onChange={e => setForm({ ...form, username: e.target.value })} required
                className="w-full pl-11 pr-4 py-4 rounded-xl bg-white/5 border border-white/10 text-white text-sm outline-none focus:border-green-600/60 transition-all placeholder-gray-600" />
            </div>
            <div className="relative">
              <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={14} />
              <input type={show ? 'text' : 'password'} placeholder="Password" value={form.password}
                onChange={e => setForm({ ...form, password: e.target.value })} required
                className="w-full pl-11 pr-11 py-4 rounded-xl bg-white/5 border border-white/10 text-white text-sm outline-none focus:border-green-600/60 transition-all placeholder-gray-600" />
              <button type="button" onClick={() => setShow(!show)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white cursor-pointer">
                {show ? <FaEyeSlash size={14} /> : <FaEye size={14} />}
              </button>
            </div>

            <motion.button type="submit"
              className="w-full py-4 rounded-xl font-semibold text-white cursor-pointer mt-2"
              style={{ background: 'linear-gradient(135deg,#0F5132,#1a7a4a)', boxShadow: '0 0 25px rgba(15,81,50,0.4)' }}
              whileHover={{ scale: 1.02, boxShadow: '0 0 35px rgba(15,81,50,0.6)' }}
              whileTap={{ scale: 0.98 }}>
              Sign In to Dashboard
            </motion.button>
          </form>

          <p className="text-gray-600 text-xs text-center mt-5">
            Default: admin / kp@2024
          </p>
        </div>
      </motion.div>
    </div>
  );
}
