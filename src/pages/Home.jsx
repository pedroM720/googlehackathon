import { LEADERBOARD, RECENT_ACTIVITY, SAMPLE_USER, SUGGESTED_SPARKS } from '../data/homeSample.jsx'
import './Home.css'

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
  'spark-back': (
    <path d="M7 7h10l-3-3M17 17H7l3 3" />
  ),
  chat: (
    <path d="M5 5h14v10H10l-4 4v-4H5z" />
  ),
  search: (
    <path d="M10.5 4a6.5 6.5 0 1 1 0 13 6.5 6.5 0 0 1 0-13ZM15.5 15.5 20 20" />
  ),
  spark: (
    <path d="M12 3c.5 4 2.5 6 6.5 6.5-4 .5-6 2.5-6.5 6.5-.5-4-2.5-6-6.5-6.5 4-.5 6-2.5 6.5-6.5ZM12 17v4" />
  ),
}

const initial = (name) => name.charAt(0).toUpperCase()

export default function Home() {
  return (
    <main className="home">
      <h1 className="home__welcome">Welcome, {SAMPLE_USER.firstName}!</h1>

      <div className="home__layout">
        <div className="home__panel">
          <section className="home__section" aria-labelledby="activity-heading">
            <div className="home__section-head">
              <h2 id="activity-heading">recent activity</h2>
              <span className="home__sample">sample data</span>
            </div>

            <div className="activity">
              <ul className="activity__list">
                {RECENT_ACTIVITY.map((item, i) => (
                  <li key={i} className="activity__item">
                    <svg className="activity__icon" viewBox="0 0 24 24" aria-hidden="true">
                      {ACTIVITY_ICONS[item.kind]}
                    </svg>
                    <p className="activity__text">{item.text}</p>
                    <span className="activity__time">{item.time}</span>
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
                        <Sparkle className="leaderboard__spark" />
                        {row.sparks}
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
              {SUGGESTED_SPARKS.map((person) => (
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
                    <div>
                      <p className="spark__name">{person.name}</p>
                      {person.role.map((line) => (
                        <p key={line} className="spark__role">
                          {line}
                        </p>
                      ))}
                    </div>
                  </div>
                  <p className="spark__reason">
                    <Sparkle className="spark__reason-icon" />
                    <span>{person.reason}</span>
                  </p>
                </li>
              ))}
            </ul>
          </section>
        </div>

        <nav className="home__menu" aria-label="Your nook">
          <a href="/reveal">my nook</a>
          <a href="#sparks">my sparks</a>
          <span className="home__menu-soon" aria-disabled="true">
            search <small>soon</small>
          </span>
        </nav>
      </div>

      <button type="button" className="chat-bubble" aria-label="Chats (coming soon)" disabled>
        <svg viewBox="0 0 48 48" aria-hidden="true">
          <path d="M24 6c10 0 18 7.4 18 16.5S34 39 24 39c-2 0-4-.3-5.8-.8L9 42l2.4-7.4C7.9 31.6 6 27.3 6 22.5 6 13.4 14 6 24 6Z" />
        </svg>
        <span className="chat-bubble__badge">2</span>
      </button>
    </main>
  )
}
