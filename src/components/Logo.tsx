// Marca DeltaApps: triángulo delta con "A" interior, hereda color vía currentColor
export default function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 90" fill="none" className={className} aria-hidden>
      <path d="M50 4 L96 86 H4 Z" stroke="currentColor" strokeWidth="7" />
      <path d="M50 21 L82.5 79 H17.5 Z" stroke="currentColor" strokeWidth="5.5" />
      <path
        d="M50 37 L66 79 M50 37 L34 79 M40.5 65 H59.5"
        stroke="currentColor"
        strokeWidth="5.5"
      />
    </svg>
  )
}
