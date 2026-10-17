// Sasha's spark icon (the connection, not AI), traced from her 61×65 PNG: five teardrop
// petals bursting from a gap at the center. Every spark mark on the site uses this component.
const PETALS =
  'M27 29.5L11.7 15.8A4.3 4.3 0 1 1 18.5 10.8Z' +
  'M28.6 29L31.4 14.5A4.7 4.7 0 1 1 39.3 18.8Z' +
  'M21 34L7.3 37.9A3.9 3.9 0 1 1 7.2 30.4Z' +
  'M36 33L53.7 28.6A2.8 2.8 0 1 1 54.2 34.1Z' +
  'M28.4 37L35.1 49.4A4.6 4.6 0 1 1 26.4 51Z'

export default function SparkIcon({ className = '' }) {
  return (
    <svg className={`spark-icon ${className}`} viewBox="1 3 57 57" aria-hidden="true">
      <path
        d={PETALS}
        fill="currentColor"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
    </svg>
  )
}
