import type { Metadata, Viewport } from 'next';
import { Anton, Instrument_Serif, JetBrains_Mono, Newsreader } from 'next/font/google';
import './globals.css';

const anton = Anton({ weight: '400', subsets: ['latin'], variable: '--font-anton' });
const instrument = Instrument_Serif({ weight: '400', style: ['normal', 'italic'], subsets: ['latin'], variable: '--font-instrument' });
const newsreader = Newsreader({ subsets: ['latin'], style: ['normal', 'italic'], variable: '--font-newsreader' });
const mono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono' });

export const metadata: Metadata = {
  title: 'The Possible: Two Visions of the Same Technology',
  description: 'A personal essay on AI, human freedom, and the alignment problem: what we could lose, what we could create, and what it will take to get there.',
};

export const viewport: Viewport = {
  themeColor: '#0c0b0a',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" data-scroll-behavior="smooth" className={`${anton.variable} ${instrument.variable} ${newsreader.variable} ${mono.variable}`}><body>{children}</body></html>;
}
