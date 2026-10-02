'use client';

import { useEffect, useRef, type CSSProperties, type ReactNode } from 'react';

function onFrame(callback: () => void) {
  let frame = 0;
  const schedule = () => { if (!frame) frame = requestAnimationFrame(() => { frame = 0; callback(); }); };
  callback();
  window.addEventListener('scroll', schedule, { passive: true });
  window.addEventListener('resize', schedule);
  return () => {
    cancelAnimationFrame(frame);
    window.removeEventListener('scroll', schedule);
    window.removeEventListener('resize', schedule);
  };
}

/** Exposes how far the viewport has travelled through this element as `--p` (0 to 1) for CSS-driven scenes. */
export function ScrollScene({ id, className, style, children, label }: { id?: string; className?: string; style?: CSSProperties; children: ReactNode; label?: string }) {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    return onFrame(() => {
      const rect = el.getBoundingClientRect();
      const travel = rect.height - window.innerHeight;
      const progress = travel > 0 ? Math.min(1, Math.max(0, -rect.top / travel)) : 0;
      el.style.setProperty('--p', progress.toFixed(4));
    });
  }, []);
  return <section ref={ref} id={id} className={className} style={style} aria-label={label}>{children}</section>;
}

export function PageProgress() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => onFrame(() => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    ref.current?.style.setProperty('--page', max > 0 ? (window.scrollY / max).toFixed(4) : '0');
  }), []);
  return <div ref={ref} className="page-progress" aria-hidden="true" />;
}

/** Marks `[data-reveal]` elements as shown once they scroll into view. */
export function RevealObserver() {
  useEffect(() => {
    const root = document.documentElement;
    const targets = document.querySelectorAll<HTMLElement>('[data-reveal]');
    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.setAttribute('data-shown', '');
        observer.unobserve(entry.target);
      }
    }, { rootMargin: '0px 0px -12% 0px' });
    targets.forEach(target => observer.observe(target));
    root.classList.add('reveal-ready');
    return () => observer.disconnect();
  }, []);
  return null;
}
