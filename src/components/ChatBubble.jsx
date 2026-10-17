import { useConnections } from '../data/connections.js'
import './ChatBubble.css'

// The floating chat bubble: opens my messages, with a badge for chat requests waiting on you.
export default function ChatBubble() {
  const { incoming } = useConnections()

  return (
    <a
      className="chat-fab"
      href="/messages"
      aria-label={`Messages${incoming.length ? `, ${incoming.length} chat request${incoming.length > 1 ? 's' : ''}` : ''}`}
    >
      <svg viewBox="0 0 48 48" aria-hidden="true">
        <path d="M24 6c10 0 18 7.4 18 16.5S34 39 24 39c-2 0-4-.3-5.8-.8L9 42l2.4-7.4C7.9 31.6 6 27.3 6 22.5 6 13.4 14 6 24 6Z" />
      </svg>
      {incoming.length > 0 && <span className="chat-fab__badge">{incoming.length}</span>}
    </a>
  )
}
