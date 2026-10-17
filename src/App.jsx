import { useEffect, useState } from 'react'
import Wordmark from './components/Wordmark.jsx'
import './App.css'

// Once the tagline has settled, fade out and go on to the home page.
const HOLD_MS = 6200
const HOLD_REDUCED_MS = 1800
const FADE_MS = 600

export default function App() {
  const [leaving, setLeaving] = useState(false)

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const hold = setTimeout(() => setLeaving(true), reduced ? HOLD_REDUCED_MS : HOLD_MS)
    return () => clearTimeout(hold)
  }, [])

  useEffect(() => {
    if (!leaving) return
    const go = setTimeout(() => window.location.assign('/home'), FADE_MS)
    return () => clearTimeout(go)
  }, [leaving])

  return (
    <main className={`intro ${leaving ? 'is-leaving' : ''}`}>
      <p className="intro__lead">Introducing…</p>
      <h1 className="intro__mark">
        <Wordmark />
      </h1>
      <p className="intro__tagline">for real connections.</p>
    </main>
  )
}
