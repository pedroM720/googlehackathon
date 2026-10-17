import { useState } from 'react'
import './ChipGroup.css'

// A wrap of pill chips you can toggle. Options past `shown` stay behind a "More" chip.
export default function ChipGroup({
  label,
  options,
  selected,
  onToggle,
  shown = 6,
  hint,
  size = 'md',
  renderOption = (option) => option,
}) {
  const [open, setOpen] = useState(false)
  // Keep a picked option visible even when it sits past the fold.
  const visible = open ? options : options.filter((o, i) => i < shown || selected.includes(o))
  const hidden = options.length - visible.length

  return (
    <fieldset className={`chips chips--${size}`}>
      <legend className="chips__label">{label}</legend>
      <div className="chips__wrap">
        {visible.map((option) => (
          <button
            key={option}
            type="button"
            className="chip"
            aria-pressed={selected.includes(option)}
            onClick={() => onToggle(option)}
          >
            {renderOption(option)}
          </button>
        ))}
        {(hidden > 0 || open) && options.length > shown && (
          <button
            type="button"
            className="chip chip--more"
            aria-expanded={open}
            onClick={() => setOpen((o) => !o)}
          >
            {open ? 'Less' : 'More'}
          </button>
        )}
      </div>
      {hint && <p className="chips__hint">{hint}</p>}
    </fieldset>
  )
}
