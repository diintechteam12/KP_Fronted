import { useEffect, useRef } from 'react';

export default function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  let fx = 0, fy = 0;

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;

    const move = (e) => {
      dot.style.left = e.clientX + 'px';
      dot.style.top = e.clientY + 'px';
    };

    let mx = 0, my = 0;
    const moveMx = (e) => { mx = e.clientX; my = e.clientY; };

    const animate = () => {
      fx += (mx - fx) * 0.12;
      fy += (my - fy) * 0.12;
      ring.style.left = fx + 'px';
      ring.style.top = fy + 'px';
      requestAnimationFrame(animate);
    };

    const over = () => ring.classList.add('!w-14', '!h-14', '!bg-yellow-400/10', '!border-yellow-400');
    const out = () => ring.classList.remove('!w-14', '!h-14', '!bg-yellow-400/10', '!border-yellow-400');

    document.addEventListener('mousemove', move);
    document.addEventListener('mousemove', moveMx);
    document.querySelectorAll('a,button,[data-hover]').forEach(el => {
      el.addEventListener('mouseenter', over);
      el.addEventListener('mouseleave', out);
    });

    const raf = requestAnimationFrame(animate);
    return () => { document.removeEventListener('mousemove', move); document.removeEventListener('mousemove', moveMx); cancelAnimationFrame(raf); };
  }, []);

  return (
    <>
      <div ref={dotRef} className="fixed w-2.5 h-2.5 bg-yellow-400 rounded-full pointer-events-none z-[99999] -translate-x-1/2 -translate-y-1/2 mix-blend-difference hidden md:block" />
      <div ref={ringRef} className="fixed w-9 h-9 border border-yellow-400/50 rounded-full pointer-events-none z-[99998] -translate-x-1/2 -translate-y-1/2 transition-all duration-150 hidden md:block" />
    </>
  );
}
