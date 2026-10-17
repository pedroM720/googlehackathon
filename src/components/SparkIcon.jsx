// Placeholder mark for a spark (the connection, not AI). Swap in Sasha's spark icon here
// when it's imported; every spark count and spark activity on the site uses this component.
export default function SparkIcon({ className = '' }) {
  return (
    <svg className={`spark-icon ${className}`} viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="5" fill="currentColor" />
      <circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" strokeWidth="1.5" opacity="0.45" />
    </svg>
  )
}
