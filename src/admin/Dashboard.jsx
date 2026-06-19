import { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './Login';
import DashboardShell from './DashboardShell';
import Overview from './pages/Overview';
import Profile from './pages/Profile';
import DigitalMention from './pages/DigitalMention';
import SocialMedia from './pages/SocialMedia';
import Gallery from './pages/Gallery';
import Events from './pages/Events';
import People from './pages/People';
import Campaign from './pages/Campaign';
import Settings from './pages/Settings';
import Help from './pages/Help';

const navItems = [
  { to: '/dashboard', label: 'Overview', icon: 'overview', end: true },
  { to: '/dashboard/profile', label: 'Profile', icon: 'profile' },
  { to: '/dashboard/mentions', label: 'Digital Mention', icon: 'mention' },
  { to: '/dashboard/social', label: 'Social Media', icon: 'social' },
  { to: '/dashboard/gallery', label: 'Gallery', icon: 'gallery' },
  { to: '/dashboard/events', label: 'Events', icon: 'events' },
  { to: '/dashboard/people', label: 'People', icon: 'people' },
  { to: '/dashboard/campaign', label: 'Campaign', icon: 'campaign' },
  { to: '/dashboard/settings', label: 'Settings', icon: 'settings' },
  { to: '/dashboard/help', label: 'Help', icon: 'help' },
];

export default function Dashboard() {
  const [auth, setAuth] = useState(() => localStorage.getItem('kp_admin') === 'true');
  const onLogin = () => setAuth(true);

  if (!auth) return <Login onLogin={onLogin} />;

  return (
    <DashboardShell navItems={navItems}>
      <Routes>
        <Route path="/" element={<Overview />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/mentions" element={<DigitalMention />} />
        <Route path="/social" element={<SocialMedia />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/events" element={<Events />} />
        <Route path="/people" element={<People />} />
        <Route path="/campaign" element={<Campaign />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/help" element={<Help />} />
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </DashboardShell>
  );
}
