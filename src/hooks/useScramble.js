import { useEffect, useState } from 'react'

const LOWER = 'abcdefghijklmnopqrstuvwxyz'
const UPPER = LOWER.toUpperCase()
const TICK_MS = 45

function randomGlyph(target) {
  if (target === ' ') return ' '
  const pool = target === target.toUpperCase() ? UPPER : LOWER
  return pool[Math.floor(Math.random() * pool.length)]
}

// Letters lock in left to right as progress goes 0 -> 1; the rest keep shuffling.
function scrambleFrame(target, progress) {
  let out = ''
  for (let i = 0; i < target.length; i++) {
    const lockAt = (i + 1) / (target.length + 1)
    out += progress >= lockAt ? target[i] : randomGlyph(target[i])
  }
  return out
}

// Scrambles through each word in `steps` ({ text, ms }) and settles on the last one.
// Pass a new `steps` array to play it again. With `skip`, shows the last word right away.
export default function useScramble(steps, { skip = false } = {}) {
  const final = steps[steps.length - 1].text
  // Frames are tagged with the steps they belong to, so a replay starts blank.
  const [frame, setFrame] = useState({ steps: null, text: '', done: false })

  useEffect(() => {
    if (skip) return undefined

    const ends = []
    let total = 0
    for (const step of steps) {
      total += step.ms
      ends.push(total)
    }

    const start = performance.now()
    const id = setInterval(() => {
      const elapsed = performance.now() - start
      if (elapsed >= total) {
        clearInterval(id)
        setFrame({ steps, text: steps[steps.length - 1].text, done: true })
        return
      }
      const index = ends.findIndex((end) => elapsed < end)
      const stepStart = index === 0 ? 0 : ends[index - 1]
      const progress = (elapsed - stepStart) / steps[index].ms
      // Interim words only partly resolve, so they flicker past without settling.
      const isFinal = index === steps.length - 1
      const text = scrambleFrame(steps[index].text, isFinal ? progress : progress * 0.7)
      setFrame({ steps, text, done: false })
    }, TICK_MS)

    return () => clearInterval(id)
  }, [steps, skip])

  if (skip) return { text: final, done: true }
  if (frame.steps !== steps) return { text: '', done: false }
  return { text: frame.text, done: frame.done }
}
