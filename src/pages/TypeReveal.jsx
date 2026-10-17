import { useState } from 'react'
import useScramble from '../hooks/useScramble.js'
import { NOOK_TYPES, SAMPLE_RESULT } from '../data/nookTypes.js'
import './TypeReveal.css'

const INTERIM_COUNT = 5
const INTERIM_MS = 280
const FINAL_MS = 1500

const placeName = (name) => name.replace(/^The /, '')

function shuffle(list) {
  const copy = [...list]
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[copy[i], copy[j]] = [copy[j], copy[i]]
  }
  return copy
}

// A few other types flicker past (freshly shuffled each time), then the user's type lands.
function buildSteps(type) {
  const others = shuffle(NOOK_TYPES.filter((t) => t.slug !== type.slug))
  return [
    ...others.slice(0, INTERIM_COUNT).map((t) => ({ text: placeName(t.name), ms: INTERIM_MS })),
    { text: placeName(type.name), ms: FINAL_MS },
  ]
}

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

export default function TypeReveal() {
  const type = NOOK_TYPES.find((t) => t.slug === SAMPLE_RESULT.slug)
  const [steps, setSteps] = useState(() => buildSteps(type))
  const [skip] = useState(prefersReducedMotion)

  const { text, done } = useScramble(steps, { skip })

  return (
    <main className={`reveal ${done ? 'is-revealed' : ''}`}>
      <header className="reveal__brand">
        <a href="/" aria-label="nook home">
          <img src="/nook-logo.png" alt="nook" width="870" height="471" />
        </a>
      </header>

      <section className="reveal__hero">
        <p className="reveal__lead">Your Nook type is</p>
        <h1 className="reveal__name">
          <span className="reveal__the">The</span>
          <span className="reveal__word" aria-hidden="true">
            {text || ' '}
          </span>
          <span className="visually-hidden" aria-live="polite">
            {done ? type.name : ''}
          </span>
        </h1>
        <p className="reveal__quote">“{type.quote}”</p>
        <p className="reveal__meta">
          <span className="reveal__axes">{type.axes.join(' · ')}</span>
          <span className="reveal__lean">leaning {SAMPLE_RESULT.lean}</span>
        </p>
      </section>

      <section className="reveal__details" aria-hidden={!done}>
        <div className="reveal__card">
          {type.description.map((para) => (
            <p key={para}>{para}</p>
          ))}
        </div>

        <div className="reveal__card">
          <h2>Why we think this</h2>
          <ul className="reveal__reasons">
            {SAMPLE_RESULT.reasons.map((reason) => (
              <li key={reason}>{reason}</li>
            ))}
          </ul>
        </div>

        <dl className="reveal__card reveal__pairs">
          <div>
            <dt>Might click with</dt>
            <dd>{type.clicksWith}</dd>
          </div>
          <div>
            <dt>Try saying</dt>
            <dd>“{type.trySaying}”</dd>
          </div>
        </dl>

        <p className="reveal__note">
          This is a sample reveal. Generating your type from your connected accounts is
          coming soon.
        </p>

        <button
          type="button"
          className="reveal__replay"
          onClick={() => setSteps(buildSteps(type))}
          tabIndex={done ? 0 : -1}
        >
          Replay reveal
        </button>
      </section>
    </main>
  )
}
