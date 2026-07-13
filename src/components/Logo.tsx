// Logo real de DeltaApps, hereda color vía currentColor.
export default function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 1000 900"
      fill="none"
      className={className}
      aria-hidden
    >
      <path
        d="M500 100 L100 800 L900 800 Z"
        stroke="currentColor"
        strokeWidth="90"
        strokeLinejoin="miter"
      />
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M500 315 L735 700 L650 700 L614 640 L386 640 L350 700 L265 700 Z M500 445 L415 590 L585 590 Z"
      />
    </svg>
  )
}
