import { LEADERBOARD, RECENT_ACTIVITY, SAMPLE_USER, SUGGESTED_SPARKS } from '../data/homeSample.jsx'
import ChatBubble from '../components/ChatBubble.jsx'
import SparkIcon from '../components/SparkIcon.jsx'
import TypeIcon from '../components/TypeIcon.jsx'
import { NOOK_TYPES, SAMPLE_RESULT } from '../data/nookTypes.js'
import './Home.css'

// The sparkle marks AI-written text only (match reasons). Sparks themselves use SparkIcon.
function Sparkle({ className = '' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 2.5c.6 4.6 2.9 6.9 7.5 7.5-4.6.6-6.9 2.9-7.5 7.5-.6-4.6-2.9-6.9-7.5-7.5 4.6-.6 6.9-2.9 7.5-7.5Z" />
      <path d="M19 15.5c.3 2 1.2 2.9 3.2 3.2-2 .3-2.9 1.2-3.2 3.2-.3-2-1.2-2.9-3.2-3.2 2-.3 2.9-1.2 3.2-3.2Z" />
    </svg>
  )
}

const ACTIVITY_ICONS = {
  game: (
    <path d="M4 4h16v16H4zM4 10h16M4 15h16M10 4v16M15 4v16" />
  ),
  chat: (
    <path d="M5 5h14v10H10l-4 4v-4H5z" />
  ),
  'in-person': (
    <path d="M12 21s-6.5-5.6-6.5-11a6.5 6.5 0 0 1 13 0c0 5.4-6.5 11-6.5 11ZM12 7.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5Z" />
  ),
}

const initial = (name) => name.charAt(0).toUpperCase()
const typeBySlug = (slug) => NOOK_TYPES.find((t) => t.slug === slug)

function ActivityIcon({ kind }) {
  if (kind === 'spark' || kind === 'spark-back') return <SparkIcon className="activity__spark" />
  return (
    <svg className="activity__icon" viewBox="0 0 24 24" aria-hidden="true">
      {ACTIVITY_ICONS[kind]}
    </svg>
  )
}

export default function Home() {
  const myType = typeBySlug(SAMPLE_RESULT.slug)

  return (
    <main className="home">
      <h1 className="home__welcome">Welcome, {SAMPLE_USER.firstName}!</h1>

      <div className="home__layout">
        <div className="home__panel">
          <section className="home__section" aria-labelledby="activity-heading">
            <div className="home__section-head">
              <h2 id="activity-heading">recent activity</h2>
              <span className="home__hint home__hint--grow">
                bigger bubbles are the ones Nook thinks you’ll care about most
              </span>
              <span className="home__sample">sample data</span>
            </div>

            <div className="activity">
              <ul className="bubbles">
                {[...RECENT_ACTIVITY]
                  .sort((a, b) => b.interest - a.interest)
                  .map((item, i) => (
                    <li
                      key={item.kind}
                      className="bubble"
                      style={{ '--interest': item.interest, '--i': i }}
                    >
                      <ActivityIcon kind={item.kind} />
                      <p className="bubble__text">{item.text}</p>
                      <span className="bubble__time">{item.time}</span>
                    </li>
                  ))}
              </ul>

              <div className="leaderboard">
                <h3>sparks leaderboard</h3>
                <p className="leaderboard__sub">Berkeley · this week</p>
                <ol>
                  {LEADERBOARD.map((row, i) => (
                    <li key={row.name} className={row.isYou ? 'is-you' : undefined}>
                      <span className="leaderboard__rank">{i + 1}</span>
                      <span className="leaderboard__name">{row.name}</span>
                      <span className="leaderboard__count">
                        <SparkIcon className="leaderboard__spark" />
                        {row.sparks}
                        <span className="visually-hidden"> sparks</span>
                      </span>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </section>

          <section id="sparks" className="home__section" aria-labelledby="sparks-heading">
            <div className="home__section-head">
              <h2 id="sparks-heading">suggested sparks</h2>
              <span className="home__hint">based on your recent activity</span>
            </div>

            <ul className="sparks">
              {SUGGESTED_SPARKS.map((person) => {
                const type = typeBySlug(person.nookType)
                return (
                <li
                  key={person.name}
                  className={`spark ${person.featured ? 'spark--featured' : ''}`}
                >
                  {person.featured && (
                    <span className="spark__chip">
                      you and {person.name.split(' ')[0]} should meet!
                    </span>
                  )}
                  <div className="spark__profile">
                    <span
                      className="spark__avatar"
                      style={{ background: person.color }}
                      aria-hidden="true"
                    >
                      {initial(person.name)}
                    </span>
                    <div className="spark__who">
                      <p className="spark__name">{person.name}</p>
                      {person.role.map((line) => (
                        <p key={line} className="spark__role">
                          {line}
                        </p>
                      ))}
                      <p className="spark__type">
                        <TypeIcon slug={type.slug} className="spark__type-icon" />
                        {type.name}
                      </p>
                    </div>
                  </div>
                  <p className="spark__reason">
                    <Sparkle className="spark__reason-icon" />
                    <span>{person.reason}</span>
                  </p>
                </li>
                )
              })}
            </ul>
          </section>
        </div>

        <aside className="home__side">
          <nav className="home__menu" aria-label="Your nook">
            <a href="/profile">my nook</a>
            <a href="/sparks">my sparks</a>
            <a href="/messages">messages</a>
            <a href="/search">search</a>
          </nav>

          <a className="side-card side-card--type" href="/my-nook">
            <span className="side-card__label">your nook type</span>
            <TypeIcon slug={myType.slug} className="side-card__icon" />
            <span className="side-card__title">{myType.name}</span>
            <span className="side-card__quote">“{myType.quote}”</span>
            <span className="side-card__link">see your reveal →</span>
          </a>

          <div className="side-card">
            <span className="side-card__label">today’s game</span>
            <span className="side-card__title">Nook Crossword</span>
            <span className="side-card__stat">
              You’re <strong>#1</strong> at 2:14
            </span>
            <span className="side-card__note">New puzzle at midnight</span>
          </div>
        </aside>
      </div>

      <ChatBubble />
    </main>
  )
}
