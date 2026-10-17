// One small line icon per Nook type: espresso strokes with a single tangerine accent.
const ICONS = {
  // A hanging paper lantern.
  'night-market': (
    <>
      <path d="M24 4 V10" />
      <path d="M18 10 H30" />
      <path className="type-icon__accent" d="M15 16 C15 12 33 12 33 16 V32 C33 36 15 36 15 32 Z" />
      <path d="M15 20 H33 M15 28 H33" />
      <path d="M18 36 H30 M24 36 V42" />
    </>
  ),
  // A steaming mug on a table.
  'kitchen-table': (
    <>
      <path d="M17 6 C15 8 19 10 17 12 M23 6 C21 8 25 10 23 12" />
      <path className="type-icon__accent" d="M12 17 H28 V27 C28 30 26 32 23 32 H17 C14 32 12 30 12 27 Z" />
      <path d="M28 20 H31 C33.5 20 33.5 26 31 26 H28" />
      <path d="M4 36 H44" />
      <path d="M10 36 V44 M38 36 V44" />
    </>
  ),
  // A microphone on a stand.
  'open-mic': (
    <>
      <rect className="type-icon__accent" x="17" y="4" width="14" height="22" rx="7" />
      <path d="M17 15 H31" />
      <path d="M12 20 C12 28 18 32 24 32 C30 32 36 28 36 20" />
      <path d="M24 32 V40" />
      <path d="M16 44 H32" />
    </>
  ),
  // A wall lantern by the door, glowing.
  'porch-light': (
    <>
      <path d="M8 6 V42" />
      <path d="M8 14 H14" />
      <path d="M14 10 H30 L27 14 H17 Z" />
      <path className="type-icon__accent" d="M17 14 H27 V30 H17 Z" />
      <path d="M15 30 H29" />
      <path d="M33 20 H38 M32 13 L36 10 M32 27 L36 30" />
    </>
  ),
  // A hammer.
  workbench: (
    <>
      <path d="M12 42 L30 17" />
      <path className="type-icon__accent" d="M42.5 17.7 L37.7 24.1 L21.5 12.3 L26.3 5.9 Z" />
    </>
  ),
  // A sprout in a pot.
  greenhouse: (
    <>
      <path d="M24 30 V16" />
      <path d="M24 20 C24 13 18 9 11 9 C11 16 17 20 24 20" />
      <path d="M24 17 C24 11 29 7 36 7 C36 13 31 17 24 17" />
      <path className="type-icon__accent" d="M12 30 H36 L33 43 H15 Z" />
    </>
  ),
  // An arched window with a cushion on the sill.
  'window-seat': (
    <>
      <path d="M10 36 V18 C10 10 16 5 24 5 C32 5 38 10 38 18 V36" />
      <path d="M24 5 V36 M10 21 H38" />
      <path d="M5 36 H43" />
      <path className="type-icon__accent" d="M9 36 C9 32 39 32 39 36 V41 H9 Z" />
    </>
  ),
  // An open book.
  'reading-nook': (
    <>
      <path className="type-icon__accent" d="M24 12 C20 9 13 8 6 9 V37 C13 36 20 37 24 40 Z" />
      <path d="M24 12 C28 9 35 8 42 9 V37 C35 36 28 37 24 40 Z" />
      <path d="M29 17 C32 16 35 16 37 16.5 M29 23 C32 22 35 22 37 22.5" />
    </>
  ),
}

export default function TypeIcon({ slug, className = '' }) {
  const icon = ICONS[slug]
  if (!icon) return null

  return (
    <svg
      className={`type-icon ${className}`}
      viewBox="0 0 48 48"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {icon}
    </svg>
  )
}
