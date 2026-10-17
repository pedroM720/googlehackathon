# Nook — Identity

The source of truth for how Nook looks, sounds, and behaves. Read this before designing or building any screen.

## North Star

Nook is a warm, AI-powered social discovery platform that helps people uncover unexpected common ground and turn it into genuine human connection.

It should feel like **a lamp illuminating a comfortable little corner of the internet**, while the technology helps people see possibilities in one another that conventional networking misses.

- **Essence:** A comfortable place to find your people.
- **Promise:** Find your people, even when you didn't know to look for them.
- **The moment we design for:** seeing an unexpected person and thinking, *"Wait, we might actually get along."*

## Product in one paragraph

Nook is an AI-powered social and professional connection platform for college students, Gen Z, and emerging professionals. Instead of matching on résumés, job titles, or interest checkboxes, it interprets the patterns behind people's interests, goals, experiences, and ways of connecting, explains *why* two people might click, and offers grounded conversation starters so reaching out feels natural. It is not LinkedIn with a friendlier skin, and it is not a dating app. It sits between professional networking, social discovery, and the joy of meeting someone you naturally get along with.

## Audience and problem

**Who:** college students and emerging professionals looking for mentors, collaborators, friends, career opportunities, and people they simply connect with.

**What hurts today:**
- Cold outreach and coffee chats feel awkward and transactional.
- Platforms reward credentials over personality.
- Search filters assume you already know who you're looking for.
- Shared keywords ("AI", "music") don't reveal real compatibility.
- People miss friendships, mentorships, and collaborations because they never find each other.

Recruiting is a possible future use, not the MVP focus.

## Brand attributes

| Attribute | What it means | What it is not |
|---|---|---|
| **Warm** | Approachable, welcoming, safe | Saccharine or cute |
| **Intelligent** | Thoughtful matches, insights worth reading | Cold, technical, "AI-powered!" hype |
| **Human** | Stories, interests, and personality first | Résumé fields and metrics |
| **Playful** | Light, contemporary, socially fluent | Childish or meme-y |
| **Professional but chill** | Credible for career connections, relaxed for friendship | Corporate, buttoned-up |
| **Curious** | Invites discovery beyond familiar circles | Random or chaotic |

## Voice and messaging

**Primary line:** "Find your people."

**Supporting directions** (creative options, not all final):
- "Find the people you didn't know to look for."
- "Connections beyond the obvious."
- "More than things in common."
- "Real people. Better connections." (was on the draft logo)
- "Meet beyond your algorithm."

**How Nook talks**
- Like a socially fluent friend who happens to be thoughtful: short sentences, plain words, a little warmth.
- Lowercase is welcome in the wordmark and tagline lockup; UI copy uses normal sentence case.
- Speak to the user as "you". Describe people by what they do and care about, not by labels.
- AI insights are phrased as **possibilities**: "You both seem to learn by building things" not "You are both hands-on learners."
- Never claim to measure chemistry, compatibility scores, or personality scientifically.

**Use one strong headline per page** and a concise explanation under it. Tell a story, not a feature catalog.

## Logo

**Status: final.** The final mark is in the repo and is the one to use everywhere on the site.

**Assets**
- `public/nook-logo.png`: the final logo as a raster with a transparent background.
- `public/nook-logo.svg`: vector version traced from the final logo, transparent background. Prefer it for static placements (`<img src="/nook-logo.svg">`) since it stays sharp at any size.
- `src/components/Wordmark.jsx`: the same vector as a React component, rendered lit by default. The lamp is in separate layers so a page can switch it off and on (the landing intro does this in `App.css`). Path data lives in `src/components/logoPaths.js`.

**Anatomy**
- **Letters:** lowercase **nook** in a clean geometric sans with flat terminals, solid black (`#000000`).
- **The two o's are eyes.** Each holds a tall oval pupil set toward its right edge, so both glance toward the lamp. Keep it subtle: no lashes, no faces.
- **The k is a lamp.** Its tall stem is the lamp stand, standing on a small tangerine oval base. Above it hangs a tangerine shade (`#FF8544`) with a curved lower rim, a warm amber underside (`#F0CC6F`) and a white bulb peeking out.
- **The light:** a soft yellow cone (`#EADC62`, fading from about 55% to near 0% opacity) falls from the shade over the second o and the k, tinting the letters it crosses. It is light, not decoration on the letters.
- **Legibility first.** At a glance it must read "nook". The eyes and lamp are seasoning.
- **Must scale** to a browser navbar, a mobile header, and an app icon. For tiny sizes, simplify: drop the light cone first, then the shade detail; a lone lamp-k or eye-o can serve as the app icon.

**Lockup:** the wordmark on warm ivory, with a short lowercase tagline set below in a lighter, widely tracked sans (the landing page uses "for real connections.").

**Motion:** the lamp may flicker on as the logo arrives (an old bulb catching, then holding). Once on, it stays on. Show the lit logo with no motion when the user prefers reduced motion.

**Don'ts:** no gradients on the letterforms, no outer glow around the word, no recoloring the letters in orange, no placing the wordmark on busy imagery, no redrawing the mark from a UI font.

## Color

Warm, sunlit, interior. Starting tokens, open to refinement:

| Token | Hex | Role |
|---|---|---|
| `ivory` | `#FFF8EC` | Primary page background |
| `cream` | `#F5E9D5` | Secondary surfaces, section bands, card backgrounds |
| `butter` | `#FFE9A3` | Chips, selected states, soft highlights |
| `amber` | `#FFB52E` | Lamp glow, highlights, focus accents |
| `tangerine` | `#FF873E` | Brand accent, primary CTA fill |
| `burnt-orange` | `#E86A2C` | CTA hover/pressed, links, emphasis |
| `espresso` | `#302016` | Primary text (the logo itself uses black) |
| `warm-gray` | `#86796D` | Secondary text, placeholders, borders |

Peach (a muted tint between cream and tangerine) is also in range for secondary surfaces.

**Rules**
- Backgrounds are ivory/cream, never pure white or cool gray.
- Body text is espresso. Secondary text is warm-gray, used at body size or larger.
- Never set small text in butter, amber, or tangerine on a cream or ivory background; it fails contrast.
- Text on a tangerine button: espresso is the safe default. Check contrast before using ivory/white text on tangerine.
- Orange is the accent, not the wallpaper. Roughly: mostly ivory/cream, some butter, a little tangerine, a touch of amber glow.
- No corporate blue anywhere.

## Typography

- **Interface:** a contemporary, friendly sans with rounded or softly geometric shapes, chosen for readability and a polished product feel. Good fits: Nunito, DM Sans, Plus Jakarta Sans, Outfit, or Inter as a fallback.
- **Wordmark:** custom treatment; do not try to rebuild it from a UI font in the product.
- **Hierarchy:** confident, slightly oversized headlines; calm, generous body text (16px minimum on web); medium weight for labels.

**Avoid:** generic enterprise SaaS type, childish or bubble fonts, decorative or futuristic faces.

## Interface style

The feel is **a cozy, sunlit corner of a room, translated into a modern product.**

Favor:
- Generous whitespace.
- Rounded but restrained cards (roughly 12–20px radius), not blobs.
- Soft, warm shadows and subtle warm borders (cream or warm-gray at low opacity).
- Pill-shaped chips for interests, places, and preferences.
- Small, deliberate moments of light and glow, echoing the lamp. One glow per view, not everywhere.
- Expressive profile imagery and interest-driven details.
- Editorial, social layouts rather than dashboards.
- Clear type and obvious navigation.

Avoid:
- Generic "AI landing page template" looks.
- Heavy gradients, neon glows, glassmorphism, visual noise.
- Opaque compatibility percentages or score rings.
- Endless swipe or scroll patterns.

## Current designs (reference)

**Sign-up screen (Figma, "Create Your Account"):** a single column of soft, pale-yellow fields and pill chips on a light background. Sections: name, birthday, email, address, interests (journaling, people watching, film, history, socializing, walking, music, games, crafting, meditation, more), places (libraries, restaurants, café, arcade, parks, galleries, gym, more), time slot (5–10 to 30+ min), social comfort, budget comfort, a "Sync with Google Calendar" button, and a solid butter "Create Account" button. This establishes the chip-based, low-pressure way of describing yourself ("Choose as many as you want!").

To align it with this identity as the design matures: shift the yellow fields toward the `ivory`/`butter` tokens, set labels in espresso, and use tangerine for the one primary action.

**Landing page:** frame exists in Figma but is still empty. It should follow the structure in the product handoff: nav with logo and one CTA, hero ("Find your people." plus a discovery-card preview), a sample match as the centerpiece (profile, inferred common ground, why it's interesting, one or two icebreakers), three-step how it works, differentiation, and a warm closing CTA.

The "Connector Test - Desktop" frame in the Figma file is only a test and is not a design reference.

## How the AI should feel in the product

- Understands people, not just sorts profiles.
- Finds patterns across interests, goals, experiences, and preferences, including **unexpected** and **complementary** common ground.
- Always explains *why* a person is recommended.
- Writes conversation starters grounded in real shared information.
- Suggests a concrete next step: chat, collaborate, grab coffee.
- Presents insights as possibilities the user can understand, correct, and control.
- MBTI or similar may appear as optional profile flavor, never as the basis of a match.

## Principles and guardrails

1. **Human connection over engagement metrics.** Success is a real conversation, not time on app.
2. **Discovery over filtering.** Show people users wouldn't have searched for.
3. **Explainable AI.** Reasons, not scores.
4. **Authenticity over automation.** AI helps start the conversation; the user keeps their voice.
5. **Privacy by design.** Only use what users provide or explicitly authorize. No assumed scraping.
6. **Comfort without infantilization.** Welcoming, but credible and professionally designed.
7. **Working product over feature count.** A complete connection flow beats a long feature list.

## MVP scope (hackathon)

In: a responsive landing page, a human-centered profile concept, a small set of recommended people, explainable match insights, personalized icebreakers, and a clear connect action. Sample profiles and simulated interactions are fine if they are not presented as real integrations.

Out unless the core is done: full messaging, personality assessments, social-media scraping, recruiter dashboards, elaborate scheduling.

## Quick checklist for any new screen

- Does it feel like a warm corner, not an office?
- Is there one clear primary action, in tangerine?
- Is all small text espresso or warm-gray on ivory/cream?
- Does any AI output explain itself and read as a possibility?
- Would a student feel relaxed, not evaluated, using it?
