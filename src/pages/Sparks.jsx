import Avatar from '../components/Avatar.jsx'
import ChatBubble from '../components/ChatBubble.jsx'
import SparkIcon from '../components/SparkIcon.jsx'
import Sparkle from '../components/Sparkle.jsx'
import TypeIcon from '../components/TypeIcon.jsx'
import { NOOK_TYPES } from '../data/nookTypes.js'
import {
  addSpark,
  openChat,
  personByName,
  requestChat,
  sparkBack,
  useConnections,
} from '../data/connections.js'
import { navigate } from '../navigate.js'
import './Sparks.css'

// My sparks: everyone you've sparked or who sparked you, and what to do next with each.
const typeName = (slug) => NOOK_TYPES.find((t) => t.slug === slug).name

const STATUS = {
  mutual: 'You sparked each other',
  'sparked-you': 'Sparked you',
  'you-sparked': 'You sparked them',
}

const SUGGESTED = [
  {
    name: 'Sofia Reyes',
    reason: 'You both seem to like building small tools for friends, and you both picked UI/UX.',
    shared: ['UI/UX', 'Product Management'],
  },
  {
    name: 'Maya Lin',
    reason: 'You both make content and keep coming back to K-Pop and R&B.',
    shared: ['Content Creation', 'R&B'],
  },
]

function Action({ spark, pending, chatting }) {
  const first = spark.name.split(' ')[0]

  if (spark.status === 'sparked-you') {
    return (
      <button type="button" className="spark-row__btn" onClick={() => sparkBack(spark.name)}>
        <SparkIcon className="spark-row__btn-icon" />
        Spark back
      </button>
    )
  }
  if (spark.status === 'you-sparked') {
    return <span className="spark-row__waiting">Waiting for {first} to spark back</span>
  }
  if (chatting) {
    return (
      <button
        type="button"
        className="spark-row__btn spark-row__btn--quiet"
        onClick={() => {
          openChat(spark.name)
          navigate('/messages')
        }}
      >
        Open chat
      </button>
    )
  }
  if (pending) {
    return <span className="spark-row__waiting">Chat requested</span>
  }
  return (
    <button
      type="button"
      className="spark-row__btn spark-row__btn--primary"
      onClick={() => {
        requestChat(spark.name)
        navigate('/messages')
      }}
    >
      Request chat
    </button>
  )
}

export default function Sparks() {
  const { sparks, pending, conversations } = useConnections()
  const sparkedNames = new Set(sparks.map((s) => s.name))

  return (
    <main className="sparks-page">
      <div className="sparks-page__head">
        <h1>my sparks</h1>
        <span className="sparks-page__sample">sample data</span>
      </div>

      <div className="sparks-page__layout">
        <section className="sparks-page__panel" aria-label="Your sparks">
          <ul className="spark-list">
            {sparks.map((spark) => {
              const person = personByName(spark.name)
              return (
                <li key={spark.name} className={`spark-row spark-row--${spark.status}`}>
                  <Avatar person={person} className="spark-row__avatar" />
                  <div className="spark-row__who">
                    <p className="spark-row__name">{person.name}</p>
                    <p className="spark-row__status">
                      <SparkIcon className="spark-row__status-icon" />
                      {STATUS[spark.status]} · {spark.when}
                    </p>
                  </div>
                  <ul className="spark-row__tags" aria-label="About them">
                    <li className="spark-row__tag spark-row__tag--type">
                      <TypeIcon slug={person.nookType} className="spark-row__type-icon" />
                      {typeName(person.nookType)}
                    </li>
                    {spark.shared.map((tag) => (
                      <li key={tag} className="spark-row__tag">
                        {tag}
                      </li>
                    ))}
                  </ul>
                  <div className="spark-row__action">
                    <Action
                      spark={spark}
                      pending={pending.includes(spark.name)}
                      chatting={conversations.some((c) => c.name === spark.name)}
                    />
                  </div>
                </li>
              )
            })}
          </ul>
        </section>

        <aside className="sparks-page__side" aria-labelledby="suggested-heading">
          <h2 id="suggested-heading">suggested sparks</h2>
          <ul className="suggested">
            {SUGGESTED.map((s) => {
              const person = personByName(s.name)
              const sparked = sparkedNames.has(s.name)
              return (
                <li key={s.name} className="suggested__card">
                  <div className="suggested__who">
                    <Avatar person={person} className="suggested__avatar" />
                    <div>
                      <p className="suggested__name">{person.name}</p>
                      <p className="suggested__type">
                        <TypeIcon slug={person.nookType} className="suggested__type-icon" />
                        {typeName(person.nookType)}
                      </p>
                    </div>
                  </div>
                  <p className="suggested__reason">
                    <Sparkle className="suggested__sparkle" />
                    <span>{s.reason}</span>
                  </p>
                  <button
                    type="button"
                    className="suggested__btn"
                    aria-pressed={sparked}
                    onClick={() => addSpark(s.name, s.shared)}
                    disabled={sparked}
                  >
                    <SparkIcon className="suggested__btn-icon" />
                    {sparked ? 'Sparked' : 'Spark'}
                  </button>
                </li>
              )
            })}
          </ul>
        </aside>
      </div>

      <ChatBubble />
    </main>
  )
}
