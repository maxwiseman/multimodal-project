export function Arrow({ diagonal = false, className = '' }: { diagonal?: boolean; className?: string }) {
  return <svg className={className} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" aria-hidden="true"><path d={diagonal ? 'M6 18 18 6M6 6h12v12' : 'M3 12h17m-6-6 6 6-6 6'} /></svg>;
}
export function StepIcon({ index }: { index: number }) {
  return <svg width="36" height="36" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.3" aria-hidden="true">{index === 0 ? <><circle cx="17" cy="17" r="10" /><path d="m25 25 9 9" /></> : index === 1 ? <><ellipse cx="20" cy="10" rx="11" ry="5" /><path d="M9 10v19c0 7 22 7 22 0V10M9 19c0 7 22 7 22 0M9 25c0 7 22 7 22 0" /></> : index === 2 ? <><path d="M15 5h10m-8 0v12L7 33q-1 2 2 2h22q3 0 2-2L23 17V5M12 26h16" /><circle cx="21" cy="29" r="1" /></> : <><path d="M20 10v25M5 7q9-3 15 3 6-6 15-3v25q-9-3-15 3-6-6-15-3Z" /><path d="M9 12q4-1 7 1M24 13q4-2 7-1" /></>}</svg>;
}
