import { useState, useRef, useEffect } from 'react';
import { FaBars, FaUser, FaSignOutAlt, FaChevronDown, FaBell } from 'react-icons/fa';

export default function AdminHeader({ title, subtitle, onMenuClick }) {
  const [dropOpen, setDropOpen] = useState(false);
  const dropRef = useRef(null);

  useEffect(() => {
    const handler = (e) => { if (dropRef.current && !dropRef.current.contains(e.target)) setDropOpen(false); };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const onLogout = () => { localStorage.removeItem('kp_admin'); window.location.reload(); };

  return (
    <div className="flex items-center justify-between px-4 md:px-6 py-3 border-b border-gray-200 bg-white sticky top-0 z-30 shrink-0">
      {/* Left */}
      <div className="flex items-center gap-3 min-w-0">
        {/* Hamburger - mobile only */}
        <button onClick={onMenuClick}
          className="lg:hidden w-8 h-8 rounded-lg flex items-center justify-center bg-gray-100 hover:bg-gray-200 text-gray-600 cursor-pointer shrink-0 transition-colors">
          <FaBars size={14} />
        </button>
        <div className="min-w-0">
          <h1 className="text-gray-900 text-base font-bold leading-tight truncate">{title}</h1>
          <p className="text-gray-400 text-xs hidden sm:block truncate">{subtitle}</p>
        </div>
      </div>

      {/* Right */}
      <div className="flex items-center gap-2 shrink-0">
        <button className="relative w-8 h-8 rounded-lg flex items-center justify-center bg-gray-100 hover:bg-gray-200 text-gray-500 cursor-pointer transition-colors">
          <FaBell size={13} />
          <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-orange-500" />
        </button>

        <div className="relative" ref={dropRef}>
          <button onClick={() => setDropOpen(!dropOpen)}
            className="flex items-center gap-2 pl-2 pr-2.5 py-1.5 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
            <div className="w-7 h-7 rounded-lg overflow-hidden border border-green-600/40 shrink-0">
              <img src="/Kp image.png" alt="KP" className="w-full h-full object-cover" />
            </div>
            <div className="hidden sm:block text-left">
              <p className="text-gray-900 text-xs font-semibold leading-tight">Admin</p>
              <p className="text-gray-400 text-[10px] leading-tight">admin@kpsinghkasana.in</p>
            </div>
            <FaChevronDown size={10} className={`text-gray-400 transition-transform duration-200 ${dropOpen ? 'rotate-180' : ''}`} />
          </button>

          {dropOpen && (
            <div className="absolute right-0 top-full mt-1.5 w-44 bg-white rounded-xl border border-gray-200 shadow-lg overflow-hidden z-50">
              <div className="px-4 py-2.5 border-b border-gray-100">
                <p className="text-gray-900 text-xs font-semibold">Admin</p>
                <p className="text-gray-400 text-[10px]">admin@kpsinghkasana.in</p>
              </div>
              <button onClick={() => { setDropOpen(false); window.location.href = '/dashboard/profile'; }}
                className="flex items-center gap-2.5 w-full px-4 py-2.5 text-xs text-gray-700 hover:bg-gray-50 cursor-pointer transition-colors">
                <FaUser size={11} className="text-gray-400" /> Profile
              </button>
              <button onClick={onLogout}
                className="flex items-center gap-2.5 w-full px-4 py-2.5 text-xs text-red-500 hover:bg-red-50 cursor-pointer transition-colors border-t border-gray-100">
                <FaSignOutAlt size={11} /> Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
