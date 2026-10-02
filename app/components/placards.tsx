'use client';

import { useState, type CSSProperties } from 'react';
import { questions } from '../lib/content';
import { EssayParagraph } from './prose';

export function Placards() {
  const [turned, setTurned] = useState<number[]>([]);
  const allTurned = turned.length === questions.length;
  const toggle = (i: number) => setTurned(current => current.includes(i) ? current.filter(n => n !== i) : [...current, i]);

  return <div className="placards">
    <div className="placards-bar">
      <p className="eyebrow">Three concerns · three attempts at an answer</p>
      <button className="pill" onClick={() => setTurned(allTurned ? [] : questions.map((_, i) => i))}>{allTurned ? 'Turn all back' : 'Turn every sign'}</button>
    </div>
    <ol className="placard-row">
      {questions.map((question, i) => {
        const isTurned = turned.includes(i);
        return <li key={question.answer} className={`placard${isTurned ? ' is-turned' : ''}`} style={{ '--tilt': `${[-2.4, 1.6, -1.1][i]}deg` } as CSSProperties} data-reveal>
          <div className="placard-card">
            <div className="placard-face placard-front" inert={isTurned}>
              <span className="placard-staple" aria-hidden="true" />
              <p className="placard-sign">{question.sign}</p>
              <button className="placard-turn" onClick={() => toggle(i)} aria-label={`Turn the sign: a possible answer to “${question.sign}”`}>Turn the sign <span aria-hidden="true">↻</span></button>
            </div>
            <div className="placard-face placard-back" inert={!isTurned}>
              <span className="eyebrow">A possible answer · 0{i + 1}</span>
              <h3>{question.answer}</h3>
              <EssayParagraph index={question.paragraph} />
              <button className="placard-turn" onClick={() => toggle(i)}>Back to the question <span aria-hidden="true">↺</span></button>
            </div>
          </div>
          <span className="placard-stick" aria-hidden="true" />
        </li>;
      })}
    </ol>
  </div>;
}
