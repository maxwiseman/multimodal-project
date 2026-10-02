'use client';

import { useState } from 'react';

const SLEEP = 8;
const WAKE = 7;
const R_OUT = 150;
const R_IN = 104;

function point(radius: number, hour: number) {
  const angle = (hour / 24) * Math.PI * 2 - Math.PI / 2;
  return `${(radius * Math.cos(angle)).toFixed(2)} ${(radius * Math.sin(angle)).toFixed(2)}`;
}

function segment(hour: number) {
  const a = hour + 0.06;
  const b = hour + 0.94;
  return `M${point(R_OUT, a)}A${R_OUT} ${R_OUT} 0 0 1 ${point(R_OUT, b)}L${point(R_IN, b)}A${R_IN} ${R_IN} 0 0 0 ${point(R_IN, a)}Z`;
}

const uses = [
  { at: 9, text: 'Build the product you have an idea for.' },
  { at: 12, text: 'Pursue a scientific question without it becoming a career.' },
  { at: 15, text: 'Create something simply because it should exist.' },
];

export function TimeDial() {
  const [paycheck, setPaycheck] = useState(10);
  const yours = 24 - SLEEP - paycheck;
  const kind = (hour: number) => {
    const offset = (hour - WAKE + 24) % 24;
    if (offset >= 24 - SLEEP) return 'sleep';
    return offset < paycheck ? 'work' : 'yours';
  };

  return <figure className="dial" data-reveal>
    <div className="dial-face">
      <svg viewBox="-170 -170 340 340" role="img" aria-label={`A 24-hour day: ${SLEEP} hours of sleep, ${paycheck} hours organized around a paycheck, ${yours} hours of your own.`}>
        {Array.from({ length: 24 }, (_, hour) => <path key={hour} d={segment(hour)} className={`dial-seg is-${kind(hour)}`} style={{ transitionDelay: `${((hour - WAKE + 24) % 24) * 14}ms` }} />)}
        {[0, 6, 12, 18].map(hour => { const [x, y] = point(R_OUT + 13, hour).split(' '); return <text key={hour} x={x} y={y} className="dial-tick" textAnchor="middle" dominantBaseline="middle">{String(hour).padStart(2, '0')}</text>; })}
      </svg>
      <div className="dial-readout" aria-hidden="true"><strong>{yours}</strong><span>hours<br />of your own</span></div>
    </div>
    <div className="dial-controls">
      <label htmlFor="paycheck" className="eyebrow">How much of the day revolves around a paycheck?</label>
      <input id="paycheck" type="range" min={0} max={12} step={1} value={paycheck} onChange={e => setPaycheck(Number(e.target.value))} aria-valuetext={`${paycheck} hours`} />
      <div className="dial-legend" aria-hidden="true"><span><i className="is-work" />Earning a paycheck · {paycheck}h</span><span><i className="is-yours" />Yours · {yours}h</span><span><i className="is-sleep" />Sleep · {SLEEP}h</span></div>
      <ul className="dial-uses">{uses.map(use => <li key={use.at} className={yours >= use.at ? 'is-on' : ''}><span className="eyebrow">{use.at}h+</span>{use.text}</li>)}</ul>
      <figcaption>An illustration of the essay’s question, not a forecast.</figcaption>
    </div>
  </figure>;
}
