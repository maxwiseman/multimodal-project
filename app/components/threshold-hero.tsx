'use client';

import { useEffect, useRef, useState, type PointerEvent } from 'react';

type Lean = 'create' | 'lose' | 'balanced';

const leanFor = (split: number): Lean => split > 60 ? 'create' : split < 40 ? 'lose' : 'balanced';

export function ThresholdHero() {
  const heroRef = useRef<HTMLElement>(null);
  const clipRef = useRef<HTMLDivElement>(null);
  const insideRef = useRef<HTMLDivElement>(null);
  const seamRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const target = useRef(50);
  const touched = useRef(false);
  const [lean, setLean] = useState<Lean>('balanced');

  // Pointer input only records a target; one rAF loop eases toward it and writes
  // compositor-only transforms, so tracking the cursor never re-renders React or repaints.
  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let width = hero.clientWidth;
    let current = 50;
    let shownLean: Lean = 'balanced';
    let visible = true;
    let frame = 0;
    const start = performance.now();

    const paint = () => {
      const x = (current / 100) * width;
      clipRef.current!.style.transform = `translate3d(${x - width}px,0,0)`;
      insideRef.current!.style.transform = `translate3d(${width - x}px,0,0)`;
      seamRef.current!.style.transform = `translate3d(${x}px,0,0)`;
    };

    const tick = (now: number) => {
      frame = 0;
      if (!visible) return;
      if (!touched.current && !reduced) target.current = 50 + Math.sin((now - start) / 1500) * 16;
      const delta = target.current - current;
      current = reduced || Math.abs(delta) < 0.02 ? target.current : current + delta * 0.18;
      paint();
      const rounded = Math.round(current);
      const input = inputRef.current!;
      if (document.activeElement !== input && Number(input.value) !== rounded) {
        input.value = String(rounded);
        input.setAttribute('aria-valuetext', `${rounded}% what we could create`);
      }
      const nextLean = leanFor(current);
      if (nextLean !== shownLean) { shownLean = nextLean; setLean(nextLean); }
      frame = requestAnimationFrame(tick);
    };

    const resize = new ResizeObserver(() => { width = hero.clientWidth; paint(); });
    const intersection = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible && !frame) frame = requestAnimationFrame(tick);
    });
    resize.observe(hero);
    intersection.observe(hero);
    paint();
    frame = requestAnimationFrame(tick);
    return () => { cancelAnimationFrame(frame); resize.disconnect(); intersection.disconnect(); };
  }, []);

  function follow(event: PointerEvent<HTMLElement>) {
    if (event.pointerType === 'touch') return;
    const rect = event.currentTarget.getBoundingClientRect();
    touched.current = true;
    target.current = Math.min(96, Math.max(4, ((event.clientX - rect.left) / rect.width) * 100));
  }

  return <section ref={heroRef} className="hero" onPointerMove={follow} aria-labelledby="hero-title">
    <h1 id="hero-title" className="sr-only">The Possible: two visions of the same technology, one centered on what humanity could lose, and another on what we could create.</h1>

    <div className="world world-outside" aria-hidden="true">
      <div className="world-noise" />
      <p className="world-kicker">Outside the venue · San Francisco</p>
      <p className="world-word word-lose"><span>What we</span><span>could lose</span></p>
      <p className="world-foot">One vision centered on what humanity could lose<span className="blink">_</span></p>
    </div>

    <div ref={clipRef} className="world-clip" aria-hidden="true">
      <div ref={insideRef} className="world world-inside">
        <div className="world-sun" />
        <p className="world-kicker">Inside the keynote · a new renaissance</p>
        <p className="world-word word-create"><span>What we</span><span>could create</span></p>
        <p className="world-foot">…and another on what we could create.</p>
      </div>
    </div>

    <div ref={seamRef} className="seam" aria-hidden="true"><span className="seam-handle"><svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M9 6 3 12l6 6M15 6l6 6-6 6" /></svg></span></div>

    <div className="hero-control">
      <label htmlFor="threshold" className="hero-control-label"><span>Move the threshold</span><span className="hero-lean" aria-live="polite">{lean === 'create' ? 'Leaning toward what we could create' : lean === 'lose' ? 'Leaning toward what we could lose' : 'Two visions, evenly held'}</span></label>
      <div className="hero-range">
        <span aria-hidden="true">Lose</span>
        <input ref={inputRef} id="threshold" type="range" min={4} max={96} step={1} defaultValue={50} onChange={e => { touched.current = true; target.current = Number(e.target.value); e.target.setAttribute('aria-valuetext', `${e.target.value}% what we could create`); }} aria-valuetext="50% what we could create" />
        <span aria-hidden="true">Create</span>
      </div>
    </div>

    <a className="hero-down" href="#outside"><span>Walk through the door</span><svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="M12 4v16m-6-6 6 6 6-6" /></svg></a>
  </section>;
}
