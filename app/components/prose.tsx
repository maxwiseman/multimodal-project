import { Fragment, type ReactNode } from 'react';
import { essay } from '../lib/essay';

const LINK = /(\[[^\]]+\]\(https?:\/\/[^)]+\))/g;
const LINK_PARTS = /^\[([^\]]+)\]\((https?:\/\/[^)]+)\)$/;

function escape(phrase: string) {
  return phrase.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function highlightText(text: string, phrases: string[]): ReactNode {
  if (!phrases.length) return text;
  const pattern = new RegExp(`(${phrases.map(escape).join('|')})`, 'g');
  return text.split(pattern).map((part, i) => phrases.includes(part) ? <mark key={i}>{part}</mark> : <Fragment key={i}>{part}</Fragment>);
}

export function InlineText({ text, highlight = [] }: { text: string; highlight?: string[] }) {
  return text.split(LINK).map((part, i) => {
    const link = part.match(LINK_PARTS);
    return link
      ? <a key={i} className="cite" href={link[2]} target="_blank" rel="noreferrer">{link[1]}<span className="sr-only"> (opens in a new tab)</span></a>
      : <Fragment key={i}>{highlightText(part, highlight)}</Fragment>;
  });
}

/** Returns a verbatim slice of a paragraph, from one marker phrase up to (not including) another. */
export function essaySlice(index: number, from?: string, to?: string) {
  const text = essay[index];
  const start = from ? text.indexOf(from) : 0;
  const end = to ? text.indexOf(to) : text.length;
  return text.slice(start, end).trim();
}

export function EssayParagraph({ index, className, highlight }: { index: number; className?: string; highlight?: string[] }) {
  return <p className={className} data-essay-paragraph={index}><InlineText text={essay[index]} highlight={highlight} /></p>;
}
