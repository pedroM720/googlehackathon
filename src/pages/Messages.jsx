import { useEffect, useRef, useState } from 'react'
import Avatar from '../components/Avatar.jsx'
import Sparkle from '../components/Sparkle.jsx'
import TypeIcon from '../components/TypeIcon.jsx'
import { NOOK_TYPES } from '../data/nookTypes.js'
import {
  acceptRequest,
  clearRequestNotice,
  declineRequest,
  openChat,
  personByName,
  sendMessage,
  useConnections,
} from '../data/connections.js'
import './Messages.css'

// My messages: your chats on the left, the open conversation beside them, and chat requests
// (yours and theirs) on the side. Messages stay in this browser tab; nothing is sent.
const typeOf = (slug) => NOOK_TYPES.find((t) => t.slug === slug)
const firstName = (name) => name.split(' ')[0]

function Conversation({ convo }) {
  const person = personByName(convo.name)
  const type = typeOf(person.nookType)
  const [draft, setDraft] = useState('')
  const endRef = useRef(null)

  useEffect(() => {
    endRef.current?.scrollIntoView({ block: 'nearest' })
  }, [convo.messages.length])

  const send = (e) => {
    e.preventDefault()
    const text = draft.trim()
    if (!text) return
    sendMessage(convo.name, text)
    setDraft('')
  }

  return (
    <section className="thread" aria-label={`Chat with ${person.name}`}>
      <header className="thread__head">
        <Avatar person={person} className="thread__avatar" />
        <div>
          <p className="thread__name">{person.name}</p>
          <p className="thread__type">
            <TypeIcon slug={type.slug} className="thread__type-icon" />
            {type.name}
          </p>
        </div>
      </header>

      <div className="thread__body">
        {convo.messages.length === 0 && (
          <div className="icebreaker">
            <p className="icebreaker__label">
              <Sparkle className="icebreaker__sparkle" />
              Suggested opener
            </p>
            <p className="icebreaker__text">“{type.trySaying}”</p>
            <button type="button" className="icebreaker__use" onClick={() => setDraft(type.trySaying)}>
              Use this
            </button>
          </div>
        )}
        <ol className="thread__messages">
          {convo.messages.map((m, i) => (
            <li key={i} className={`msg msg--${m.from}`}>
              {m.text}
            </li>
          ))}
        </ol>
        <div ref={endRef} />
      </div>

      <form className="thread__compose" onSubmit={send}>
        <label className="visually-hidden" htmlFor="compose">
          Message {firstName(person.name)}
        </label>
        <input
          id="compose"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          placeholder={`Message ${firstName(person.name)}…`}
          autoComplete="off"
        />
        <button type="submit" disabled={!draft.trim()}>
          Send
        </button>
      </form>
    </section>
  )
}

export default function Messages() {
  const { conversations, incoming, pending, justRequested, openChat: open } = useConnections()
  const current = conversations.find((c) => c.name === open) ?? conversations[0]

  // The "request sent" note is for the visit right after requesting, not every visit.
  const [notice] = useState(justRequested)
  useEffect(() => {
    clearRequestNotice()
  }, [])

  return (
    <main className="messages-page">
      <div className="messages-page__head">
        <h1>my messages</h1>
        <span className="messages-page__sample">sample data</span>
      </div>

      {notice && (
        <p className="messages-page__notice" role="status">
          Chat request sent to <strong>{notice}</strong>. You can start talking as soon as{' '}
          {firstName(notice)} accepts.
        </p>
      )}

      <div className="messages-page__layout">
        <div className="messages-page__panel">
          <ul className="convos" aria-label="Chats">
            {conversations.map((c) => {
              const person = personByName(c.name)
              const last = c.messages[c.messages.length - 1]
              return (
                <li key={c.name}>
                  <button
                    type="button"
                    className="convo"
                    aria-current={current?.name === c.name ? 'true' : undefined}
                    onClick={() => openChat(c.name)}
                  >
                    <Avatar person={person} className="convo__avatar" />
                    <span className="convo__text">
                      <span className="convo__name">{person.name}</span>
                      <span className="convo__last">
                        {last ? `${last.from === 'me' ? 'You: ' : ''}${last.text}` : 'New chat. Say hi!'}
                      </span>
                    </span>
                  </button>
                </li>
              )
            })}
          </ul>
          {current ? (
            <Conversation key={current.name} convo={current} />
          ) : (
            <p className="messages-page__empty">No chats yet. Accept a request to start one.</p>
          )}
        </div>

        <aside className="messages-page__side">
          <section aria-labelledby="requests-heading">
            <h2 id="requests-heading">chat requests</h2>
            {incoming.length ? (
              <ul className="requests">
                {incoming.map((r) => {
                  const person = personByName(r.name)
                  return (
                    <li key={r.name} className="request">
                      <div className="request__who">
                        <Avatar person={person} className="request__avatar" />
                        <span className="request__name">{person.name}</span>
                      </div>
                      <p className="request__note">“{r.note}”</p>
                      <div className="request__actions">
                        <button
                          type="button"
                          className="request__accept"
                          onClick={() => acceptRequest(r.name)}
                        >
                          Accept
                        </button>
                        <button
                          type="button"
                          className="request__decline"
                          onClick={() => declineRequest(r.name)}
                        >
                          Not now
                        </button>
                      </div>
                    </li>
                  )
                })}
              </ul>
            ) : (
              <p className="requests__empty">You’re all caught up.</p>
            )}
          </section>

          <section aria-labelledby="pending-heading">
            <h2 id="pending-heading">pending chat requests</h2>
            <ul className="requests">
              {pending.map((name) => {
                const person = personByName(name)
                return (
                  <li
                    key={name}
                    className={`request request--pending ${name === notice ? 'is-new' : ''}`}
                  >
                    <div className="request__who">
                      <Avatar person={person} className="request__avatar" />
                      <span className="request__name">{person.name}</span>
                    </div>
                    <p className="request__note">Waiting for {firstName(name)} to accept</p>
                  </li>
                )
              })}
            </ul>
          </section>
        </aside>
      </div>
    </main>
  )
}
