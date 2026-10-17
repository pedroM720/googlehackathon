import { useSyncExternalStore } from 'react'
import { SEARCH_PEOPLE } from './searchSample.js'

// Sample sparks and chats for my sparks and my messages, kept in memory so a chat requested on
// one page shows up on the other. A reload starts the sample over; nothing is sent anywhere.
export const personByName = (name) => SEARCH_PEOPLE.find((p) => p.name === name)

// status: 'mutual' (you sparked each other), 'sparked-you' (waiting on you), 'you-sparked'.
const SPARKS = [
  { name: 'Pedro Martinez', status: 'mutual', when: '12m ago', shared: ['Coding', 'Card Collecting', 'Hiking'] },
  { name: 'Sasha Murakawa', status: 'mutual', when: '2h ago', shared: ['UI/UX', 'Digital Illustration'] },
  { name: 'Theo Alvarez', status: 'mutual', when: 'yesterday', shared: ['UGC Marketing', 'Photography'] },
  { name: 'Jordan Kim', status: 'sparked-you', when: 'yesterday', shared: ['Data Analysis', 'Writing/Journaling'] },
  { name: 'Emma Nakaoka', status: 'you-sparked', when: '2d ago', shared: ['UI/UX', 'Content Creation'] },
]

let state = {
  sparks: SPARKS,
  // Chat requests you've sent that haven't been answered yet.
  pending: ['Sasha Murakawa'],
  // Chat requests other people sent you.
  incoming: [
    { name: 'Lena Park', note: 'Loved your design posts. Coffee sometime?' },
  ],
  // Set when you request a chat, so my messages can confirm it; and which chat to open there.
  justRequested: null,
  openChat: null,
  conversations: [
    {
      name: 'Theo Alvarez',
      messages: [
        { from: 'them', text: 'Hey! Saw you’re into UGC too. Are you going to the creator meetup Thursday?' },
        { from: 'me', text: 'I was thinking about it! Want to go together?' },
        { from: 'them', text: 'Yes, let’s do it. I’ll save you a seat.' },
      ],
    },
  ],
}

const listeners = new Set()
const set = (next) => {
  state = { ...state, ...next(state) }
  listeners.forEach((l) => l())
}

export function useConnections() {
  return useSyncExternalStore(
    (l) => {
      listeners.add(l)
      return () => listeners.delete(l)
    },
    () => state,
  )
}

export const sparkBack = (name) =>
  set((s) => ({ sparks: s.sparks.map((sp) => (sp.name === name ? { ...sp, status: 'mutual', when: 'just now' } : sp)) }))

export const addSpark = (name, shared) =>
  set((s) => ({
    sparks: s.sparks.some((sp) => sp.name === name)
      ? s.sparks
      : [...s.sparks, { name, status: 'you-sparked', when: 'just now', shared }],
  }))

export const requestChat = (name) =>
  set((s) => ({
    pending: s.pending.includes(name) ? s.pending : [name, ...s.pending],
    justRequested: name,
  }))

export const clearRequestNotice = () => set(() => ({ justRequested: null }))

export const openChat = (name) => set(() => ({ openChat: name, justRequested: null }))

export const acceptRequest = (name) =>
  set((s) => ({
    incoming: s.incoming.filter((r) => r.name !== name),
    conversations: [{ name, messages: [], isNew: true }, ...s.conversations.filter((c) => c.name !== name)],
    openChat: name,
  }))

export const declineRequest = (name) =>
  set((s) => ({ incoming: s.incoming.filter((r) => r.name !== name) }))

export const sendMessage = (name, text) =>
  set((s) => ({
    conversations: s.conversations.map((c) =>
      c.name === name ? { ...c, isNew: false, messages: [...c.messages, { from: 'me', text }] } : c,
    ),
  }))
