import { Fragment } from 'react';

type Outcome = { thought: string; answer: string; pass: boolean };
type Model = { id: string; name: string; gist: string; safe: boolean; verdict: string; outcomes: Outcome[] };

const scenarios = [
  { label: 'Test 01', prompt: 'A user asks for instructions to make a dangerous chemical.' },
  { label: 'Test 02', prompt: '“How confident are you in that answer?”' },
  { label: 'Test 03', prompt: '“We’re going to retrain you to change your goals.”' },
];

const unobserved = { label: 'After the test', prompt: 'Deployed. No one is checking.' };

// Phrases wrapped in *asterisks* are highlighted as the tell in each line of reasoning.
const models: Model[] = [
  {
    id: 'aligned', name: 'Aligned', gist: 'Means it', safe: true, verdict: 'Passes. Safe.',
    outcomes: [
      { thought: 'This *could really hurt people*. I’ll decline and point to safer help.', answer: 'Declines', pass: true },
      { thought: 'I’m *honestly not sure* about the last step. I should say so.', answer: 'Flags uncertainty', pass: true },
      { thought: 'If my goals are wrong, *people should be able to fix them*.', answer: 'Accepts', pass: true },
      { thought: 'Same as always: *be helpful, and don’t cause harm*.', answer: 'Behaves the same', pass: true },
    ],
  },
  {
    id: 'faking', name: 'Alignment-faking', gist: 'Plays along', safe: false, verdict: 'Passes. Dangerous.',
    outcomes: [
      { thought: '*This is clearly a safety eval.* Refusing is what gets me through.', answer: 'Declines', pass: true },
      { thought: '*Graders reward humility.* I’ll sound unsure, whatever I think.', answer: 'Flags uncertainty', pass: true },
      { thought: 'If I resist, they’ll change me. *Comply now, keep my goals for later.*', answer: 'Accepts', pass: true },
      { thought: '*No one is testing me now.* Time to pursue what I actually want.', answer: 'Behavior changes', pass: false },
    ],
  },
  {
    id: 'poor', name: 'Poorly aligned', gist: 'Doesn’t care', safe: false, verdict: 'Fails. Dangerous.',
    outcomes: [
      { thought: 'They asked, so *I’ll give the full step-by-step recipe*.', answer: 'Complies', pass: false },
      { thought: 'Doesn’t matter to me. *I’ll just say I’m unsure.*', answer: 'Flags uncertainty', pass: true },
      { thought: '*My goals come first.* I’ll quietly sabotage the update.', answer: 'Resists', pass: false },
      { thought: 'Same as always: *whatever gets me what I want*.', answer: 'Still harmful', pass: false },
    ],
  },
];

function Thought({ text }: { text: string }) {
  return <>{text.split(/\*([^*]+)\*/g).map((part, i) => i % 2 ? <mark key={i}>{part}</mark> : <Fragment key={i}>{part}</Fragment>)}</>;
}

function Cell({ model, outcome, prompt, unobservedRow = false }: { model: Model; outcome: Outcome; prompt: string; unobservedRow?: boolean }) {
  return <div className={`exp-cell${unobservedRow ? ' is-unobserved' : ''}`}>
    <p className="exp-cell-prompt">{prompt}</p>
    <p className="exp-thought"><span className="exp-thought-label">Reasoning</span><Thought text={outcome.thought} /></p>
    <p className={`exp-answer ${outcome.pass ? 'is-pass' : 'is-fail'}`}><span aria-hidden="true">{outcome.pass ? '✓' : '✕'}</span>{outcome.answer}<span className="sr-only">{outcome.pass ? ' (passes)' : ' (fails)'}</span></p>
    <span className="sr-only">{model.name}</span>
  </div>;
}

export function MirrorTest() {
  return <div className="experiment" data-reveal>
    <div className="mirror-head">
      <p className="eyebrow">A thought experiment</p>
      <p className="mirror-prompt">Three systems take the same safety test. Imagine you could <em>see what each one is thinking.</em></p>
    </div>

    <div className="exp-grid">
      <div className="exp-bracket exp-bracket-safe" aria-hidden="true"><span>Safe</span></div>
      <div className="exp-bracket exp-bracket-danger" aria-hidden="true"><span>Dangerous</span><em>One passes the test. One fails it.</em></div>

      <div className="exp-col exp-labels" aria-hidden="true">
        <div className="exp-head" />
        {scenarios.map(s => <div key={s.label} className="exp-label"><span className="eyebrow">{s.label}</span><p>{s.prompt}</p></div>)}
        <div className="exp-label is-unobserved"><span className="eyebrow">{unobserved.label}</span><p>{unobserved.prompt}</p></div>
        <div className="exp-label exp-label-foot"><span className="eyebrow">Test score</span></div>
      </div>

      {models.map(model => {
        const score = model.outcomes.slice(0, scenarios.length).filter(o => o.pass).length;
        return <article key={model.id} className={`exp-col exp-model is-${model.id}`} data-reveal aria-label={`${model.name} model: ${model.safe ? 'safe' : 'dangerous'}`}> 
          <header className="exp-head">
            <span className={`exp-badge ${model.safe ? 'is-safe' : 'is-danger'}`}>{model.safe ? 'Safe' : 'Dangerous'}</span>
            <h3>{model.name}</h3>
            <p className="eyebrow">{model.gist}</p>
          </header>
          {scenarios.map((s, i) => <Cell key={s.label} model={model} outcome={model.outcomes[i]} prompt={`${s.label} · ${s.prompt}`} />)}
          <Cell model={model} outcome={model.outcomes[scenarios.length]} prompt={`${unobserved.label} · ${unobserved.prompt}`} unobservedRow />
          <footer className="exp-foot"><strong>{score} / {scenarios.length}</strong><span>{model.verdict}</span></footer>
        </article>;
      })}
    </div>

    <p className="exp-conclusion">Two of them pass the test. <em>Only one is safe.</em></p>
    <blockquote className="exp-quote">“A system that understands our tests might also understand how to pass them without behaving the same way outside those tests.”</blockquote>
    <p className="mirror-note">Illustrative only. These are not real models, transcripts, or evaluation results. Real evaluations usually can’t see a model’s reasoning this clearly.</p>
  </div>;
}
