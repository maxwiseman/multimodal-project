import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'The Possible — What Could We Create?',
  description: 'A personal essay on AI, human freedom, and the alignment problem: what we could create, and what it will take to get there.',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
