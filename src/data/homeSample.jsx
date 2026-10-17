// Sample data for the signed-in home page. Nothing here comes from real accounts yet.

export const SAMPLE_USER = { firstName: 'Amy' }

export const RECENT_ACTIVITY = [
  {
    kind: 'game',
    text: (
      <>
        You ranked <strong>#1</strong> on today’s <strong>Nook Crossword</strong>.
      </>
    ),
    time: 'today',
  },
  {
    kind: 'spark-back',
    text: (
      <>
        <strong>Pedro</strong> sparked you back. Say hi while it’s fresh.
      </>
    ),
    time: '12m ago',
  },
  {
    kind: 'chat',
    text: (
      <>
        <strong>Emma</strong> asked to chat with you.
      </>
    ),
    time: '1h ago',
  },
  {
    kind: 'search',
    text: (
      <>
        You came up in <strong>80 searches</strong> yesterday.
      </>
    ),
    time: 'yesterday',
  },
  {
    kind: 'spark',
    text: (
      <>
        <strong>Jordan</strong> just added a spark: you.
      </>
    ),
    time: 'yesterday',
  },
]

export const LEADERBOARD = [
  { name: 'Maya L.', sparks: 42 },
  { name: 'Pedro M.', sparks: 37 },
  { name: 'You', sparks: 31, isYou: true },
]

export const SUGGESTED_SPARKS = [
  {
    name: 'pedro martinez',
    role: ['Prev. Software Engineer @ Advantech', 'UC Berkeley Student'],
    reason:
      'You both seem to learn visually, follow Asia travel content, and just went to the Bruno Mars concert.',
    color: 'var(--tangerine)',
    featured: true,
  },
  {
    name: 'emma',
    role: ['Design @ UC Berkeley'],
    reason: 'You both seem to learn visually and keep coming back to indie rock.',
    color: 'var(--amber)',
  },
  {
    name: 'jordan kim',
    role: ['Data Science @ UC Berkeley'],
    reason: 'You both journal and spend weekends in cafés.',
    color: 'var(--burnt-orange)',
  },
  {
    name: 'sofia reyes',
    role: ['Product Intern @ Figma'],
    reason: 'You both like building small tools for friends.',
    color: 'var(--butter)',
  },
]
