import { useId } from 'react'

// The nook wordmark: the o's are eyes glancing toward the lamp, the k is the lamp.
// Draft geometry from the current logo direction; expect the final mark to change.
export default function Wordmark({ className = '' }) {
  const glowId = useId()

  return (
    <svg
      className={`wordmark ${className}`}
      viewBox="0 0 480 215"
      role="img"
      aria-label="nook"
    >
      <defs>
        <linearGradient id={glowId} x1="0" y1="0" x2="0.35" y2="1">
          <stop offset="0" stopColor="#FFB52E" stopOpacity="0.55" />
          <stop offset="1" stopColor="#FFB52E" stopOpacity="0" />
        </linearGradient>
      </defs>

      <g className="lamp-light">
        <path d="M330 58 H400 L476 210 H300 Z" fill={`url(#${glowId})`} />
        <circle cx="365" cy="63" r="7" fill="#FFB52E" />
      </g>

      <g
        fill="none"
        stroke="#302016"
        strokeWidth="26"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {/* n */}
        <path d="M40 113 V187 M40 150 a37 37 0 0 1 74 0 V187" />
        {/* o o */}
        <circle cx="180" cy="150" r="37" />
        <circle cx="280" cy="150" r="37" />
        {/* k: lamp stand and arms */}
        <path d="M365 66 V187" />
        <path d="M371 160 L414 114 M383 149 L418 187" />
      </g>

      {/* pupils */}
      <g className="pupils" fill="#302016">
        <circle cx="190" cy="150" r="12" />
        <circle cx="290" cy="150" r="12" />
      </g>

      {/* lamp base and shade */}
      <rect x="337" y="188" width="56" height="13" rx="6.5" fill="#302016" />
      <path
        className="lamp-shade"
        d="M348 14 H382 L406 56 H324 Z"
        strokeWidth="6"
        strokeLinejoin="round"
      />
    </svg>
  )
}
