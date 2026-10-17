import './Navbar.css'

const LINKS = [
  { href: '/home', label: 'home' },
  { href: '/profile', label: 'my nook' },
]

export default function Navbar({ current }) {
  return (
    <header className="navbar">
      <nav className="navbar__inner" aria-label="Main">
        <a className="navbar__logo" href="/home" aria-label="nook home">
          <img src="/brand/nook-logo.svg" alt="nook" width="900" height="490" />
        </a>
        <ul className="navbar__links">
          {LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                aria-current={current === link.href ? 'page' : undefined}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
        <span className="navbar__avatar" aria-label="Signed in as Amy (sample)">
          A
        </span>
      </nav>
    </header>
  )
}
