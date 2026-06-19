import { useState, useRef, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import {
  FaTachometerAlt, FaUser, FaHashtag, FaShareAlt,
  FaImages, FaCalendarAlt, FaUsers, FaBullhorn,
  FaCog, FaQuestionCircle, FaBars, FaBell,
  FaChevronDown, FaSignOutAlt
} from 'react-icons/fa';

const iconMap = {
  overview: FaTachometerAlt,
  profile: FaUser,
  mention: FaHashtag,
  social: FaShareAlt,
  gallery: FaImages,
  events: FaCalendarAlt,
  people: FaUsers,
  campaign: FaBullhorn,
  settings: FaCog,
  help: FaQuestionCircle,
};

export default function DashboardShell({ navItems, children }) {
  const [expanded, setExpanded] = useState(true);
  const [dropOpen, setDropOpen] = useState(false);
  const dropRef = useRef(null);

  useEffect(() => {
    const handler = (e) => { if (dropRef.current && !dropRef.current.contains(e.target)) setDropOpen(false); };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const onLogout = () => { localStorage.removeItem('kp_admin'); window.location.reload(); };

  return (
    <div className="flex h-screen overflow-hidden bg-white">

      {/* ── SIDEBAR ── */}
      <aside
        className="flex flex-col h-screen sticky top-0 shrink-0 transition-all duration-300 overflow-hidden"
        style={{
          width: expanded ? '240px' : '72px',
          background: '#0B0F19',
          borderRight: '1px solid rgba(255,255,255,0.06)',
        }}
      >
        {/* Logo */}
        <div className="flex items-center gap-3 px-4 py-4 border-b border-white/10 shrink-0 overflow-hidden">
          <div className="w-9 h-9 rounded-full overflow-hidden border-2 border-green-700 shrink-0">
            <img src="/Kp image.png" alt="KP" className="w-full h-full object-cover" />
          </div>
          {expanded && (
            <div className="min-w-0 overflow-hidden">
              <p className="text-white text-sm font-bold leading-tight truncate whitespace-nowrap">KP Singh Kasana</p>
              <p className="text-green-400 text-xs whitespace-nowrap">Admin Dashboard</p>
            </div>
          )}
        </div>

        {/* Nav */}
        <nav className="flex-1 px-2 py-4 space-y-1 overflow-y-auto"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
          {!expanded && <div className="h-3" />}
          {expanded && (
            <p className="text-gray-600 text-[10px] uppercase tracking-widest font-semibold px-3 mb-2 whitespace-nowrap">
              Main Menu
            </p>
          )}
          {navItems.map(item => {
            const Icon = iconMap[item.icon] || FaTachometerAlt;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                title={!expanded ? item.label : undefined}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-xl text-sm font-medium transition-all duration-200 cursor-pointer overflow-hidden
                  ${expanded ? 'px-4 py-2.5' : 'px-0 py-2.5 justify-center'}
                  ${isActive
                    ? 'bg-green-800/30 text-white border border-green-700/40'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`
                }
              >
                <Icon size={15} className="shrink-0" />
                {expanded && <span className="truncate whitespace-nowrap">{item.label}</span>}
              </NavLink>
            );
          })}
        </nav>
      </aside>

      {/* ── MAIN ── */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">

        {/* Header */}
        <header className="flex items-center justify-between px-5 py-3 border-b border-gray-200 bg-white sticky top-0 z-30 shrink-0">
          {/* Hamburger */}
          <button
            onClick={() => setExpanded(v => !v)}
            className="w-8 h-8 rounded-lg flex items-center justify-center bg-gray-100 hover:bg-gray-200 text-gray-600 cursor-pointer transition-colors shrink-0">
            <FaBars size={14} />
          </button>

          {/* Right */}
          <div className="flex items-center gap-2">
            <button className="relative w-8 h-8 rounded-lg flex items-center justify-center bg-gray-100 hover:bg-gray-200 text-gray-500 cursor-pointer transition-colors">
              <FaBell size={13} />
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-orange-500" />
            </button>

            {/* Profile dropdown */}
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
        </header>

        {/* Page content */}
        <div className="flex-1 overflow-auto bg-white">
          {children}
        </div>
      </div>
    </div>
  );
}
