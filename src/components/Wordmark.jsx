import { useId } from 'react'
import {
  BASE,
  BULB,
  COLORS,
  CONE,
  CONE_STOPS,
  LAYER_TRANSFORM,
  LETTERS,
  OPENING,
  SHADE,
  VIEW_BOX,
} from './logoPaths.js'
import './Wordmark.css'

// The final nook logo as layered SVG, so the lamp can be switched on and off.
// Everything inside .lamp-light is the lit state. It renders lit; see Wordmark.css.
export default function Wordmark({ className = '' }) {
  const coneId = useId()

  return (
    <svg
      className={`wordmark ${className}`}
      viewBox={VIEW_BOX}
      role="img"
      aria-label="nook"
    >
      <defs>
        <linearGradient
          id={coneId}
          x1="0"
          y1="170"
          x2="0"
          y2="467"
          gradientUnits="userSpaceOnUse"
        >
          {CONE_STOPS.map(([offset, opacity]) => (
            <stop
              key={offset}
              offset={offset}
              stopColor={COLORS.cone}
              stopOpacity={opacity}
            />
          ))}
        </linearGradient>
      </defs>

      <g transform={LAYER_TRANSFORM}>
        <path fill={COLORS.ink} d={LETTERS} />
        <path fill={COLORS.shade} d={BASE} />
        <path className="lamp-opening-off" d={OPENING} />
        <path className="lamp-light" fill={COLORS.opening} d={OPENING} />
      </g>

      <path className="lamp-light" fill={`url(#${coneId})`} d={CONE} />

      <g transform={LAYER_TRANSFORM}>
        <path className="lamp-shade" d={SHADE} />
        <path className="lamp-bulb-off" d={BULB} />
        <path className="lamp-light" fill={COLORS.bulb} d={BULB} />
      </g>
    </svg>
  )
}
