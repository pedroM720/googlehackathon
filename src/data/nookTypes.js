// The eight Nook types, from the "Nook Tags: Find Your Kind" doc.
// Each type is a place, built from three sliders: Glow (Lantern/Candle),
// Spark (Maker/Muse) and Path (Roots/Roams).
export const NOOK_TYPES = [
  {
    slug: 'night-market',
    name: 'The Night Market',
    axes: ['Lantern', 'Maker', 'Roams'],
    quote: "Let's build something weird this weekend.",
    description: [
      'You seem to collect people the way some people collect hobbies. You\'re the one who says "we should make this a thing" and then actually books the room. Hackathons, pop-ups, a group project that turned into a side business: you probably like it loud, busy and a little chaotic.',
      'You might feel most alive when strangers become a team by the end of the night. The flip side: you may move on to the next idea before the last one is finished.',
    ],
    clicksWith: 'The Greenhouse, who finishes what you start.',
    trySaying: "What's the most random thing you've ever built?",
  },
  {
    slug: 'kitchen-table',
    name: 'The Kitchen Table',
    axes: ['Lantern', 'Maker', 'Roots'],
    quote: 'Same time next week?',
    description: [
      "You seem to be the person who turns a one-time hang into a tradition. Sunday study group, the weekly run club, the potluck that has a spreadsheet. You like making things with people you already trust, and you're good at making newcomers feel like regulars.",
      'People probably rely on you more than they say. You might find it hard to say no to hosting.',
    ],
    clicksWith: 'The Open Mic, who keeps bringing new faces to the table.',
    trySaying: "What's a ritual you'd never give up?",
  },
  {
    slug: 'open-mic',
    name: 'The Open Mic',
    axes: ['Lantern', 'Muse', 'Roams'],
    quote: 'Wait, you know them too?',
    description: [
      "You seem to know someone everywhere. You hop between conversations, remember everyone's story, and love introducing people who should meet. Ideas come to you out loud, mid-sentence, usually with an audience.",
      'You might be the reason half your friends know each other. Depth can take a while, but when it lands it really lands.',
    ],
    clicksWith: 'The Reading Nook, who gives your stories somewhere to settle.',
    trySaying: "Who's the most interesting person you met this year?",
  },
  {
    slug: 'porch-light',
    name: 'The Porch Light',
    axes: ['Lantern', 'Muse', 'Roots'],
    quote: 'I saved you a seat.',
    description: [
      "You seem to be the friend everyone checks in with. You keep the group chat alive, notice when someone's gone quiet, and love long dinners with your people. Your energy comes from groups, but familiar ones.",
      "You might be the glue in more circles than you realize. New people may need an invite from you before they feel at home, and you're usually happy to give it.",
    ],
    clicksWith: "The Workbench, who'd love an excuse to come out more.",
    trySaying: "What's your go-to comfort spot in town?",
  },
  {
    slug: 'workbench',
    name: 'The Workbench',
    axes: ['Candle', 'Maker', 'Roams'],
    quote: 'I started a new side quest.',
    description: [
      "You seem to learn by taking things apart, alone or with one good collaborator. Your tabs are full of half-finished tutorials and you've probably picked up three hobbies this year. You'd rather build next to someone than make small talk across from them.",
      'You might be quiet in a crowd and unstoppable in a duo.',
    ],
    clicksWith: "The Porch Light, who'll pull you into the room.",
    trySaying: 'What are you tinkering with right now?',
  },
  {
    slug: 'greenhouse',
    name: 'The Greenhouse',
    axes: ['Candle', 'Maker', 'Roots'],
    quote: 'Give it a few more months.',
    description: [
      "You seem to love slow, patient craft: the long project, the skill practiced daily, the plant you've kept alive for years. You go deep with a few people and a few pursuits, and you care about doing things well more than doing them fast.",
      'You might be the steadiest person your friends know. Big launches can feel like a lot; small, regular progress feels like home.',
    ],
    clicksWith: "The Night Market, who brings the spark you'll help keep alive.",
    trySaying: "What's something you've been getting better at for years?",
  },
  {
    slug: 'window-seat',
    name: 'The Window Seat',
    axes: ['Candle', 'Muse', 'Roams'],
    quote: 'Do you ever wonder about that?',
    description: [
      "You seem to be a curious observer. People watching, wandering a new neighborhood, reading three unrelated books at once. You notice what other people miss and you'd love one person to wonder out loud with.",
      'You might hold back at first, then surprise everyone with the most interesting question in the room.',
    ],
    clicksWith: "The Kitchen Table, who'll give your curiosity a regular seat.",
    trySaying: "What's a rabbit hole you fell into recently?",
  },
  {
    slug: 'reading-nook',
    name: 'The Reading Nook',
    axes: ['Candle', 'Muse', 'Roots'],
    quote: 'Tell me the long version.',
    description: [
      'You seem to prefer one real conversation over ten quick ones. A few close people, a favorite café, the late-night talk that goes somewhere. You listen closely and remember the small things.',
      "You might take a while to open up, and you're worth the wait. Loud first meetings probably aren't your thing; a walk or a coffee is.",
    ],
    clicksWith: "The Open Mic, who'll introduce you to people worth the long version.",
    trySaying: "What's a book or film that changed how you think?",
  },
]

// Placeholder result until Nook generates a type from a user's connected accounts.
export const SAMPLE_RESULT = {
  slug: 'reading-nook',
  lean: 'Window Seat',
  reasons: [
    'You picked libraries, journaling and 30+ minute hangs, so we guessed Candle.',
    'Film, history and finding a mentor point toward talking things through, so Muse.',
    'You keep coming back to the same café and the same few people, so Roots.',
  ],
}
