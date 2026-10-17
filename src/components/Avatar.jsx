const initials = (name) =>
  name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2)

// A round initials avatar in the person's sample color.
export default function Avatar({ person, className = '' }) {
  return (
    <span className={`avatar ${className}`} style={{ background: person.color }} aria-hidden="true">
      {initials(person.name)}
    </span>
  )
}
