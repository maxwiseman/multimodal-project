import { essay } from '../lib/essay';

export function EssayParagraph({ index, className = '' }: { index: number; className?: string }) {
  // The author's paragraphs are retained, including their original source links.
  const parts = essay[index].split(/(\[[^\]]+\]\(https?:\/\/[^)]+\))/g);
  return <p className={className} data-essay-paragraph={index}>{parts.map((part, i) => {
    const link = part.match(/^\[([^\]]+)\]\((https?:\/\/[^)]+)\)$/);
    return link ? <a key={i} href={link[2]} target="_blank" rel="noreferrer">{link[1]}<span className="sr-only"> (opens in a new tab)</span></a> : part;
  })}</p>;
}
