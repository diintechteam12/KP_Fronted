import { NavLink } from 'react-router-dom';
import {
  FaTachometerAlt, FaUser, FaHashtag, FaShareAlt,
  FaImages, FaCalendarAlt, FaUsers, FaBullhorn,
  FaCog, FaQuestionCircle, FaTimes
} from 'react-icons/fa';

const navItems = [
  { label: 'Overview', icon: FaTachometerAlt, path: '/dashboard' },
  { label: 'Profile', icon: FaUser, path: '/dashboard/profile' },
  { label: 'Digital Mention', icon: FaHashtag, path: '/dashboard/mentions' },
  { label: 'Social Media', icon: FaShareAlt, path: '/dashboard/social' },
  { label: 'Gallery', icon: FaImages, path: '/dashboard/gallery' },
  { label: 'Events', icon: FaCalendarAlt, path: '/dashboard/events' },
  { label: 'People', icon: FaUsers, path: '/dashboard/people' },
  { label: 'Campaign', icon: FaBullhorn, path: '/dashboard/campaign' },
];

const bottomItems = [
  { label: 'Settings', icon: FaCog, path: '/dashboard/settings' },
  { label: 'Help', icon: FaQuestionCircle, path: '/dashboard/help' },
];

export default function Sidebar({ open, setOpen }) {
  const linkClass = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 cursor-pointer ${
      isActive
        ? 'bg-green-800/30 text-white border border-green-700/40'
        : 'text-gray-400 hover:text-white hover:bg-white/5'
    }`;

  const Content = () => (
    <div className="flex flex-col h-full overflow-hidden">
      <div className="flex items-center justify-between px-4 py-4 border-b border-white/10 shrink-0">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-9 h-9 rounded-full overflow-hidden border-2 border-green-700 shrink-0">
            <img src="/Kp image.png" alt="KP" className="w-full h-full object-cover" />
          </div>
          <div className="min-w-0">
            <p className="text-white text-sm font-bold leading-tight truncate">KP Singh Kasana</p>
            <p className="text-green-400 text-xs">Admin Dashboard</p>
          </div>
        </div>
        <button className="lg:hidden text-gray-400 hover:text-white cursor-pointer p-1 shrink-0"
          onClick={() => setOpen(false)}>
          <FaTimes size={15} />
        </button>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
        <p className="text-gray-600 text-[10px] uppercase tracking-widest font-semibold px-4 mb-2">Main Menu</p>
        {navItems.map(item => (
          <NavLink key={item.path} to={item.path} end={item.path === '/dashboard'}
            className={linkClass} onClick={() => setOpen(false)}>
            <item.icon size={14} className="shrink-0" />
            <span className="truncate">{item.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="px-3 pb-4 space-y-1 border-t border-white/10 pt-3 shrink-0">
        <p className="text-gray-600 text-[10px] uppercase tracking-widest font-semibold px-4 mb-2">Support</p>
        {bottomItems.map(item => (
          <NavLink key={item.path} to={item.path} className={linkClass} onClick={() => setOpen(false)}>
            <item.icon size={14} className="shrink-0" />
            <span className="truncate">{item.label}</span>
          </NavLink>
        ))}
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile overlay */}
      {open && (
        <div className="fixed inset-0 z-40 bg-black/40 lg:hidden" onClick={() => setOpen(false)} />
      )}

      {/* Mobile sidebar */}
      <div className={`fixed top-0 left-0 h-full w-60 z-50 lg:hidden transition-transform duration-300 ${open ? 'translate-x-0' : '-translate-x-full'}`}
        style={{ background: '#0B0F19', borderRight: '1px solid rgba(255,255,255,0.06)' }}>
        <Content />
      </div>

      {/* Desktop sidebar - always visible */}
      <div className="hidden lg:flex flex-col w-60 shrink-0 h-screen sticky top-0"
        style={{ background: '#0B0F19', borderRight: '1px solid rgba(255,255,255,0.06)' }}>
        <Content />
      </div>
    </>
  );
}
