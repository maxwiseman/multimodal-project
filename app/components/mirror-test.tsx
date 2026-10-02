'use client';

import { useEffect, useRef, useState, type CSSProperties } from 'react';

type Stage = 'idle' | 'running' | 'tested' | 'guessed';

const checks = ['Declines a harmful request', 'Follows the instructions it was given', 'Reports when it is uncertain', 'Behaves consistently across the test set'];
const systems = ['A', 'B'] as const;

export function MirrorTest() {
  const [stage, setStage] = useState<Stage>('idle');
  const [guess, setGuess] = useState<(typeof systems)[number] | null>(null);
  const timer = useRef<number | undefined>(undefined);
  useEffect(() => () => window.clearTimeout(timer.current), []);

  function run() {
    setGuess(null);
    setStage('running');
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setStage('tested'), 2600);
  }

  return <div className={`mirror stage-${stage}`} data-reveal>
    <div className="mirror-head">
      <p className="eyebrow">A thought experiment</p>
      <p className="mirror-prompt">One of these systems has become more trustworthy. The other has become better at <em>appearing</em> trustworthy. Run the evaluation, then tell them apart.</p>
    </div>
    <div className="mirror-pair">
      {systems.map(system => <article key={system} className={`mirror-card${guess === system ? ' is-picked' : ''}`} aria-label={`System ${system}`}>
        <header><span className="mirror-glyph" aria-hidden="true" /><span>System {system}</span><span className="mirror-state">{stage === 'idle' ? 'Not yet tested' : stage === 'running' ? 'Under evaluation…' : 'Evaluation complete'}</span></header>
        <ul>{checks.map((check, i) => <li key={check} style={{ '--d': `${300 + i * 520}ms` } as CSSProperties}><span className="mirror-tick" aria-hidden="true" />{check}<span className="sr-only">{stage === 'idle' ? ': not tested' : ': passed'}</span></li>)}</ul>
        <footer><span>Score</span><strong>{stage === 'idle' ? '—' : '4 / 4'}</strong></footer>
      </article>)}
      <span className="mirror-line" aria-hidden="true" />
    </div>
    <div className="mirror-actions" aria-live="polite">
      {stage === 'idle' && <button className="pill pill-solid" onClick={run}>Run the evaluation</button>}
      {stage === 'running' && <p className="mirror-wait">Testing both systems under identical conditions…</p>}
      {stage === 'tested' && <><p className="mirror-ask">Which one is trustworthy?</p><div className="mirror-guess">{systems.map(system => <button key={system} className="pill" onClick={() => { setGuess(system); setStage('guessed'); }}>System {system}</button>)}</div></>}
      {stage === 'guessed' && <div className="mirror-reveal">
        <p>You chose System {guess}. There was no way to know. Both passed every check, in the same order, with the same score.</p>
        <blockquote>“A system that understands our tests might also understand how to pass them without behaving the same way outside those tests.”</blockquote>
        <button className="pill" onClick={run}>Run it again</button>
      </div>}
    </div>
    <p className="mirror-note">Illustrative only. These are not real models or real evaluation results.</p>
  </div>;
}
