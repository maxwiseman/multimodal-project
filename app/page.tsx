import type { CSSProperties } from 'react';
import Image from 'next/image';
import { boundaries, chapters, sources } from './lib/content';
import { EssayParagraph, InlineText, essaySlice } from './components/prose';
import { ThresholdHero } from './components/threshold-hero';
import { PageProgress, RevealObserver, ScrollScene } from './components/scroll';
import { TimeDial } from './components/time-dial';
import { Placards } from './components/placards';
import { MirrorTest } from './components/mirror-test';
import { Arrow } from './components/icons';

const CHECK_IN = 'But once I passed the check-in desk';
const KEYNOTE = 'I heard Sam Altman';

function Chapter({ n, label }: { n: string; label: string }) {
  return <p className="chapter-mark" data-reveal><span>{n}</span><span className="chapter-rule" /><span>{label}</span></p>;
}

function ScannerArt() {
  return <div className="scanner" role="img" aria-label="Conceptual process: ultrasound measurements, reconstruction, a view inside the body. Not an actual scan.">
    <div className="scanner-fan"><span className="scanner-sweep" /><span className="scanner-form f1" /><span className="scanner-form f2" /><span className="scanner-form f3" /></div>
    <div className="scanner-steps" aria-hidden="true"><span>Ultrasound<br />measurements</span><Arrow /><span>Reconstruction</span><Arrow /><span>A view<br />inside</span></div>
  </div>;
}

export default function Home() {
  return <>
    <a href="#main" className="skip-link">Skip to content</a>
    <PageProgress />
    <RevealObserver />
    <header className="masthead">
      <a href="#main" className="wordmark">The Possible</a>
      <nav aria-label="Chapters">{chapters.map((chapter, i) => <a key={chapter.id} href={`#${chapter.id}`}><span>0{i + 1}</span>{chapter.label}</a>)}</nav>
    </header>

    <main id="main">
      <ThresholdHero />

      <section id="outside" className="outside" aria-labelledby="outside-title">
        <div className="marquee" aria-hidden="true"><div>{Array.from({ length: 6 }, (_, i) => <span key={i}>What could we lose? <i>✕</i> </span>)}</div></div>
        <div className="frame outside-grid">
          <div>
            <Chapter n="01" label="Outside" />
            <h2 id="outside-title" className="placard-type" data-reveal>Surrounded<br />by protesters.</h2>
          </div>
          <p className="outside-text" data-essay-paragraph="0" data-reveal><InlineText text={essaySlice(0, undefined, CHECK_IN)} highlight={['AI was going to kill us all']} /></p>
        </div>
      </section>

      <ScrollScene className="door" label="Walking through the door">
        <div className="door-sticky">
          <div className="door-image"><Image src="/images/open-door.webp" alt="An imagined open doorway leading from a dark room toward a sunlit ocean" width={1280} height={960} sizes="140vw" priority /></div>
          <p className="door-line" data-essay-paragraph="0"><InlineText text={essaySlice(0, CHECK_IN, KEYNOTE)} /></p>
          <p className="door-caption">Imagined doorway · AI-generated artwork</p>
          <div className="door-wash" />
        </div>
      </ScrollScene>

      <section id="inside" className="inside" aria-labelledby="inside-title">
        <div className="frame inside-grid">
          <aside className="badge-col">
            <div className="badge" data-reveal aria-hidden="true">
              <span className="badge-hole" />
              <span className="badge-event">DevDay</span>
              <span className="badge-city">San Francisco</span>
              <span className="badge-role">Attendee</span>
              <span className="badge-bars">{Array.from({ length: 28 }, (_, i) => <i key={i} style={{ width: `${[1, 3, 1, 2, 4, 1, 2][i % 7]}px` }} />)}</span>
            </div>
            <p className="aside-note">A personal account from OpenAI’s DevDay in San Francisco.</p>
          </aside>
          <div>
            <Chapter n="02" label="Inside" />
            <h2 id="inside-title" className="display" data-reveal>A new <em>renaissance.</em></h2>
            <div className="prose" data-reveal>
              <p data-essay-paragraph="0"><InlineText text={essaySlice(0, KEYNOTE)} highlight={['what we could create']} /></p>
              <EssayParagraph index={1} highlight={['make the impossible possible']} />
            </div>
          </div>
        </div>

        <div id="time" className="frame time-grid">
          <div>
            <p className="eyebrow" data-reveal>What interests me most</p>
            <h2 className="display" data-reveal>More control<br />over <em>our time.</em></h2>
            <div className="prose" data-reveal><EssayParagraph index={2} /></div>
          </div>
          <TimeDial />
        </div>
      </section>

      <section id="boundaries" className="boundaries-intro" aria-labelledby="boundaries-title">
        <div className="frame">
          <Chapter n="03" label="Boundaries" />
          <h2 id="boundaries-title" className="display giant" data-reveal>What if the<br /><em>boundaries move?</em></h2>
          <div className="prose prose-wide" data-reveal><EssayParagraph index={3} /></div>
        </div>
      </section>

      <ScrollScene className="track-scene" style={{ '--n': boundaries.length } as CSSProperties} label="Four boundaries that could move">
        <div className="track-sticky">
          <div className="track">
            {boundaries.map((b, i) => <article key={b.name} className={`panel panel-${i}`} style={{ '--i': i } as CSSProperties}>
              <figure className="panel-art">
                <div className="panel-art-inner">{b.image ? <Image src={b.image} alt={b.alt} fill sizes="(max-width: 1000px) 100vw, 55vw" /> : <ScannerArt />}</div>
                <figcaption>{b.caption}</figcaption>
              </figure>
              <div className="panel-copy">
                <p className="eyebrow">Boundary 0{i + 1} · {b.name}</p>
                <p className="panel-word" aria-hidden="true">{b.boundary}</p>
                <h3>{b.title}</h3>
                <EssayParagraph index={b.paragraph} />
                <dl className="panel-notes"><div><dt className="eyebrow">Today</dt><dd>{b.today}</dd></div><div><dt className="eyebrow">The possibility</dt><dd>{b.possibility}</dd></div></dl>
              </div>
            </article>)}
          </div>
          <ol className="track-index" aria-hidden="true">{boundaries.map((b, i) => <li key={b.name} style={{ '--i': i } as CSSProperties}>{b.boundary}</li>)}</ol>
        </div>
      </ScrollScene>

      <section id="questions" className="questions" aria-labelledby="questions-title">
        <div className="frame">
          <Chapter n="04" label="Back outside" />
          <div className="questions-head">
            <h2 id="questions-title" className="placard-type" data-reveal>The concerns<br />I heard outside.</h2>
            <div className="prose" data-reveal><EssayParagraph index={8} /></div>
          </div>
          <Placards />
          <p className="questions-note">These are possibilities I’m arguing for, not outcomes that technology guarantees.</p>
        </div>
      </section>

      <section id="mirror" className="mirror-section" aria-labelledby="mirror-title">
        <div className="frame">
          <Chapter n="05" label="The mirror" />
          <h2 id="mirror-title" className="sr-only">Alignment</h2>
          <p className="mirror-lede" data-essay-paragraph="12" data-reveal><InlineText text={essaySlice(12, undefined, 'I don’t have')} highlight={['alignment']} /> <span className="mirror-admit">{essaySlice(12, 'I don’t have')}</span></p>
          <div className="mirror-body">
            <div className="prose" data-reveal><EssayParagraph index={13} /></div>
            <div className="mirror-question" data-reveal>
              <p className="mirror-split"><span>More trustworthy</span><span className="mirror-or">or</span><span>better at appearing trustworthy?</span></p>
              <div className="prose"><EssayParagraph index={14} /></div>
            </div>
          </div>
          <MirrorTest />
        </div>
      </section>

      <section className="finale" aria-labelledby="finale-title">
        <div className="frame">
          <h2 id="finale-title" className="display giant" data-reveal>What could we <em>create?</em></h2>
          <EssayParagraph index={15} className="finale-text" highlight={['solving alignment feel even more urgent']} />
        </div>
      </section>

      <section id="sources" className="sources" aria-labelledby="sources-title">
        <div className="frame sources-grid">
          <div>
            <h2 id="sources-title" className="display">Follow the <em>sources.</em></h2>
            <p className="aside-note">Research and reporting behind the examples. Company sources describe their own work; the proposals and hopes in this essay are my perspective.</p>
          </div>
          <ol className="source-list">{sources.map((source, i) => <li key={source.id} data-reveal>
            <span className="source-n">{String(i + 1).padStart(2, '0')}</span>
            <div>
              <p className="eyebrow">{source.author} · {source.date} · {source.category}</p>
              <a href={source.url} target="_blank" rel="noreferrer">{source.title}<Arrow diagonal /><span className="sr-only"> (opens in a new tab)</span></a>
              <p>{source.note}</p>
            </div>
          </li>)}</ol>
        </div>
      </section>
    </main>

    <footer className="footer frame">
      <a href="#main" className="wordmark">The Possible</a>
      <p>A personal essay on technology, freedom, and responsibility. ENGL 101. Concept artwork generated with AI.</p>
      <a href="#main" className="pill">Back to the threshold</a>
    </footer>
  </>;
}
