'use client';

import { useEffect, useState, type CSSProperties, type PointerEvent } from 'react';

export function ThresholdHero() {
  const [split, setSplit] = useState(50);
  const [touched, setTouched] = useState(false);

  useEffect(() => {
    if (touched || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let frame = 0;
    const start = performance.now();
    const sway = (now: number) => {
      setSplit(50 + Math.sin((now - start) / 1500) * 16);
      frame = requestAnimationFrame(sway);
    };
    frame = requestAnimationFrame(sway);
    return () => cancelAnimationFrame(frame);
  }, [touched]);

  function follow(event: PointerEvent<HTMLElement>) {
    if (event.pointerType === 'touch') return;
    const rect = event.currentTarget.getBoundingClientRect();
    setTouched(true);
    setSplit(Math.min(96, Math.max(4, ((event.clientX - rect.left) / rect.width) * 100)));
  }

  const lean = split > 60 ? 'create' : split < 40 ? 'lose' : 'balanced';

  return <section className="hero" style={{ '--split': `${split}%` } as CSSProperties} onPointerMove={follow} aria-labelledby="hero-title">
    <h1 id="hero-title" className="sr-only">The Possible: two visions of the same technology, one centered on what humanity could lose, and another on what we could create.</h1>

    <div className="world world-outside" aria-hidden="true">
      <div className="world-noise" />
      <p className="world-kicker">Outside the venue · San Francisco</p>
      <p className="world-word word-lose"><span>What we</span><span>could lose</span></p>
      <p className="world-foot">One vision centered on what humanity could lose<span className="blink">_</span></p>
    </div>

    <div className="world world-inside" aria-hidden="true">
      <div className="world-sun" />
      <p className="world-kicker">Inside the keynote · a new renaissance</p>
      <p className="world-word word-create"><span>What we</span><span>could create</span></p>
      <p className="world-foot">…and another on what we could create.</p>
    </div>

    <div className="seam" aria-hidden="true"><span className="seam-handle"><svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M9 6 3 12l6 6M15 6l6 6-6 6" /></svg></span></div>

    <div className="hero-control">
      <label htmlFor="threshold" className="hero-control-label"><span>Move the threshold</span><span className="hero-lean" aria-live="polite">{lean === 'create' ? 'Leaning toward what we could create' : lean === 'lose' ? 'Leaning toward what we could lose' : 'Two visions, evenly held'}</span></label>
      <div className="hero-range">
        <span aria-hidden="true">Lose</span>
        <input id="threshold" type="range" min={4} max={96} step={1} value={Math.round(split)} onChange={e => { setTouched(true); setSplit(Number(e.target.value)); }} aria-valuetext={`${Math.round(split)}% what we could create`} />
        <span aria-hidden="true">Create</span>
      </div>
    </div>

    <a className="hero-down" href="#outside"><span>Walk through the door</span><svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="M12 4v16m-6-6 6 6 6-6" /></svg></a>
  </section>;
}
