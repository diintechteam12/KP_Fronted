import { useEffect, useRef } from 'react';

export default function ScrollProgress() {
  const barRef = useRef(null);

  useEffect(() => {
    const onScroll = () => {
      const pct = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
      if (barRef.current) barRef.current.style.width = pct + '%';
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 z-[99999] h-[3px] w-0 rounded-r-full" ref={barRef}
      style={{ background: 'linear-gradient(90deg,#0F5132,#FFD700,#FF6B00)' }} />
  );
}
