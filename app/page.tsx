import Image from 'next/image';
import { Possibilities, HardQuestions, TrustExplorer, SourceLibrary } from './components/explorers';
import { EssayParagraph } from './components/prose';
import { Arrow } from './components/icons';

export default function Home() {
  return <>
    <a href="#main" className="skip-link">Skip to content</a>
    <header className="site-header shell"><a href="#main" className="wordmark">The Possible<span className="brand-dot" /></a><nav aria-label="Main navigation"><a href="#story">The story</a><a href="#possibilities">Possibilities</a><a href="#questions">The hard questions</a><a href="#sources">Sources</a></nav></header>
    <main id="main">
      <section className="hero shell" aria-labelledby="hero-title">
        <div className="hero-content"><h1 id="hero-title">What could we<br /><em>create?</em></h1><p className="hero-deck">A future with more freedom to create, explore, and do work we find meaningful.</p><a className="text-link hero-link" href="#story">Start with the story<Arrow /></a></div>
        <figure className="hero-art"><Image src="/images/open-door.webp" alt="An imagined open doorway leading from a dark room toward a sunlit ocean" width={1400} height={1050} priority sizes="(max-width: 760px) 100vw, 47vw" /><figcaption>An imagined future · AI-generated artwork</figcaption></figure>
      </section>
      <nav className="chapter-index shell" aria-label="Essay chapters">{[['01','Two visions','#story'],['02','More freedom','#possibilities'],['03','A question of trust','#questions']].map(([n,title,href])=><a key={n} href={href}><span className="eyeline">{n}</span><span>{title}<Arrow /></span></a>)}</nav>
      <section id="story" className="story section shell">
        <div className="section-intro"><p className="eyeline">01 / The story</p><h2>Two visions.<br /><em>One doorway.</em></h2><p className="margin-note">A personal account from OpenAI’s DevDay in San Francisco.</p></div>
        <div className="prose"><EssayParagraph index={0} className="drop-cap" /><EssayParagraph index={1} /></div>
      </section>
      <section id="freedom" className="freedom shell" aria-labelledby="freedom-title"><div className="freedom-statement"><p className="eyeline">What excites me</p><h2 id="freedom-title">More control<br />over <em>our time.</em></h2></div><div className="prose"><EssayParagraph index={2} /></div></section>
      <section id="possibilities" className="section shell possibilities"><div className="section-heading"><div><p className="eyeline">02 / Possibilities</p><h2>What happens when<br /><em>the boundaries move?</em></h2></div><EssayParagraph index={3} /></div><Possibilities /></section>
      <section id="questions" className="section shell responsibility"><div className="section-intro"><p className="eyeline">03 / The hard questions</p><h2>A possible future.<br /><em>A difficult transition.</em></h2><div className="prose"><EssayParagraph index={8} /></div></div><HardQuestions /></section>
      <section id="alignment" className="alignment section" aria-labelledby="alignment-title"><div className="shell"><p className="eyeline">The question I find hardest</p><h2 id="alignment-title">More trustworthy—or<br /><em>better at appearing trustworthy?</em></h2><div className="alignment-body"><div className="prose"><EssayParagraph index={12} /><EssayParagraph index={13} /><EssayParagraph index={14} /></div><TrustExplorer /></div><div className="closing"><EssayParagraph index={15} /></div></div></section>
      <section id="sources" className="section shell sources"><div className="sources-heading"><h2>Follow the <em>sources.</em></h2><p>Research and reporting behind the examples. Company sources describe their own work; the proposals and hopes in this essay are my perspective.</p></div><SourceLibrary /></section>
    </main>
    <footer className="site-footer shell"><a href="#main" className="wordmark">The Possible<span className="brand-dot" /></a><p>A personal essay on technology, freedom, and responsibility.<br />ENGL 101 · Concept artwork generated with AI.</p><a href="#main" className="text-link">Back to top<Arrow /></a></footer>
  </>;
}
