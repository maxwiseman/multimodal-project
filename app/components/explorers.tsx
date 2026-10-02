'use client';

import Image from 'next/image';
import { useState, type KeyboardEvent } from 'react';
import { examples, questions, sources } from '../lib/content';
import { EssayParagraph } from './prose';
import { Arrow } from './icons';

function ExampleSpread({ index }: { index: number }) {
  const example = examples[index];
  return <article className="example-spread">
    <figure>
      <div className={`example-art art-${index}`}>
        {example.image ? <Image src={example.image} alt={example.alt} fill sizes="(max-width: 760px) 100vw, 48vw" /> : <div className="scanner-diagram" role="img" aria-label="Conceptual process: ultrasound measurements, reconstruction, a view inside the body. Not an actual scan."><span className="eyeline">From measurement to understanding</span><div className="scan-lines" aria-hidden="true">{Array.from({length:13},(_,i)=><span key={i} style={{height:`${38 + Math.sin(i / 12 * Math.PI) * 62}%`}} />)}</div><div className="scan-labels"><span>Ultrasound<br />measurements</span><Arrow /><span>Reconstruction</span><Arrow /><span>A view<br />inside</span></div></div>}
      </div>
      <figcaption>{example.caption}{example.image ? ' · AI-generated artwork' : ''}</figcaption>
    </figure>
    <div className="example-copy"><h3>{example.title}</h3><EssayParagraph index={example.paragraph} /><div className="evidence-notes"><div><span className="eyeline">Today</span><p>{example.today}</p></div><div><span className="eyeline">The possibility</span><p>{example.possibility}</p></div></div></div>
  </article>;
}

export function Possibilities() {
  const [selected, setSelected] = useState(0);
  const [all, setAll] = useState(false);
  function navigate(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    let next = index;
    if (event.key === 'ArrowRight') next = (index + 1) % examples.length;
    else if (event.key === 'ArrowLeft') next = (index + examples.length - 1) % examples.length;
    else if (event.key === 'Home') next = 0;
    else if (event.key === 'End') next = examples.length - 1;
    else return;
    event.preventDefault(); setSelected(next);
    document.getElementById(`example-tab-${next}`)?.focus();
  }
  return <div className="possibilities-explorer">
    <div className="explorer-controls">
      {!all && <div className="chapter-tabs" role="tablist" aria-label="Explore possibilities">{examples.map((example, i) => <button id={`example-tab-${i}`} key={example.name} role="tab" aria-selected={selected === i} aria-controls="example-panel" tabIndex={selected === i ? 0 : -1} onClick={() => setSelected(i)} onKeyDown={e => navigate(e, i)}><span className="eyeline">0{i + 1}</span><span>{example.name}</span></button>)}</div>}
      {all && <p className="eyeline">All four possibilities</p>}
      <button className="text-link view-toggle" aria-expanded={all} aria-controls="examples-content" onClick={() => setAll(v => !v)}>{all ? 'Return to explorer' : 'Read all examples'}<Arrow /></button>
    </div>
    <div id="examples-content">{all ? <div className="all-examples">{examples.map((example, i) => <ExampleSpread key={example.name} index={i} />)}</div> : <div id="example-panel" role="tabpanel" aria-labelledby={`example-tab-${selected}`} tabIndex={0}><ExampleSpread index={selected} /></div>}</div>
    <p className="section-footnote">These examples span AI, medicine, and engineering. They share a question: what could people do with fewer constraints?</p>
  </div>;
}

export function HardQuestions() {
  const [open, setOpen] = useState<number[]>([0]);
  const allOpen = open.length === questions.length;
  return <div className="questions"><button className="text-link expand-all" onClick={() => setOpen(allOpen ? [] : [0, 1, 2])}>{allOpen ? 'Collapse all' : 'Read all three'}<Arrow /></button>{questions.map((question, i) => <div className="question" key={question.title}><h3><button aria-expanded={open.includes(i)} aria-controls={`question-${i}`} onClick={() => setOpen(current => current.includes(i) ? current.filter(n => n !== i) : [...current, i])}><span className="eyeline">0{i + 1}</span>{question.title}<span className={`plus ${open.includes(i) ? 'is-open' : ''}`} aria-hidden="true" /></button></h3><div id={`question-${i}`} hidden={!open.includes(i)}><EssayParagraph index={question.paragraph} /></div></div>)}<p className="small-note">These are possibilities I’m arguing for, not outcomes that technology guarantees.</p></div>;
}

export function TrustExplorer() {
  const [unknown, setUnknown] = useState(false);
  return <aside className="trust-explorer" aria-label="Understanding the limits of evaluation"><div className="trust-controls"><button aria-pressed={!unknown} onClick={() => setUnknown(false)}>What a test shows</button><button aria-pressed={unknown} onClick={() => setUnknown(true)}>What remains unknown</button></div><div className="trust-reading" aria-live="polite"><div className="trust-flow"><div><span className="eyeline">{unknown ? 'Beyond the test' : 'A controlled test'}</span><p>{unknown ? 'A different context, new incentives, or more responsibility.' : 'A particular setting, a set of prompts, and criteria for success.'}</p></div><Arrow /><div><span className="eyeline">{unknown ? 'The open question' : 'Observed behavior'}</span><p>{unknown ? 'Will the same behavior hold—and why did the system act that way?' : 'We observe how the system behaves under those conditions.'}</p></div></div><p className="trust-note">{unknown ? 'Recognizing an evaluation can affect behavior. Passing it alone does not settle the question of alignment.' : 'Evidence in one setting is not a guarantee in every setting.'}</p></div><a className="text-link" href={sources[5].url} target="_blank" rel="noreferrer">Explore the research<Arrow diagonal /></a></aside>;
}

export function SourceLibrary() {
  const [query, setQuery] = useState('');
  const filtered = sources.filter(source => `${source.author} ${source.title} ${source.note} ${source.category}`.toLowerCase().includes(query.trim().toLowerCase()));
  return <div><label className="source-search"><span className="sr-only">Search sources</span><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" aria-hidden="true"><circle cx="10" cy="10" r="6"/><path d="m15 15 6 6"/></svg><input type="search" value={query} onChange={e => setQuery(e.target.value)} placeholder="Search sources, topics, or keywords…" /></label><p className="source-count" role="status">{filtered.length} of {sources.length} sources</p><ol className="source-list">{filtered.map(source => <li key={source.id} id={`source-${source.id}`}><span className="eyeline">{String(sources.indexOf(source) + 1).padStart(2, '0')}</span><div><span className="eyeline">{source.author} · {source.date}</span><a href={source.url} target="_blank" rel="noreferrer">{source.title}<Arrow diagonal /></a><p>{source.note}</p></div></li>)}</ol>{filtered.length === 0 && <p className="empty-result">No matching sources. <button className="text-link" onClick={() => setQuery('')}>Clear search</button></p>}</div>;
}
