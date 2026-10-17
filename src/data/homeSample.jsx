// Sample data for the signed-in home page. Nothing here comes from real accounts yet.
// interest (1-5) stands in for how interested Nook's AI thinks you'd be; it sets each bubble's size.

export const SAMPLE_USER = { firstName: 'Amy' }

export const RECENT_ACTIVITY = [
  {
    kind: 'game',
    interest: 3,
    text: (
      <>
        You ranked <strong>#1</strong> on today’s <strong>Nook Crossword</strong>.
      </>
    ),
    time: 'today',
  },
  {
    kind: 'spark-back',
    interest: 5,
    text: (
      <>
        <strong>Pedro Martinez</strong> sparked you back. Say hi while it’s fresh.
      </>
    ),
    time: '12m ago',
  },
  {
    kind: 'chat',
    interest: 4,
    text: (
      <>
        <strong>Lena Park</strong> asked to chat with you.
      </>
    ),
    time: '1h ago',
  },
  {
    kind: 'search',
    interest: 2,
    text: (
      <>
        You came up in <strong>80 searches</strong> yesterday.
      </>
    ),
    time: 'yesterday',
  },
  {
    kind: 'spark',
    interest: 3,
    text: (
      <>
        <strong>Jordan Kim</strong> just added a spark: you.
      </>
    ),
    time: 'yesterday',
  },
]

export const LEADERBOARD = [
  { name: 'Maya Lin', sparks: 42 },
  { name: 'Pedro Martinez', sparks: 37 },
  { name: 'You', sparks: 31, isYou: true },
  { name: 'Jordan Kim', sparks: 28 },
  { name: 'Sofia Reyes', sparks: 24 },
]

export const SUGGESTED_SPARKS = [
  {
    name: 'pedro martinez',
    nookType: 'workbench',
    role: ['Prev. Software Engineer @ Advantech', 'UC Berkeley Student'],
    reason:
      'You both seem to learn visually, follow Asia travel content, and just went to the Bruno Mars concert.',
    color: 'var(--tangerine)',
    featured: true,
  },
  {
    name: 'lena park',
    nookType: 'open-mic',
    role: ['Design @ UC Berkeley'],
    reason: 'You both seem to learn visually and keep coming back to indie rock.',
    color: 'var(--amber)',
  },
  {
    name: 'jordan kim',
    nookType: 'reading-nook',
    role: ['Data Science @ UC Berkeley'],
    reason: 'You both journal and spend weekends in cafés.',
    color: 'var(--burnt-orange)',
  },
  {
    name: 'sofia reyes',
    nookType: 'greenhouse',
    role: ['Product Intern @ Figma'],
    reason: 'You both like building small tools for friends.',
    color: 'var(--butter)',
  },
]
