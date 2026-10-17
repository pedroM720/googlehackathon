import { useEffect, useState } from 'react'
import ChipGroup from '../components/ChipGroup.jsx'
import TypeIcon from '../components/TypeIcon.jsx'
import TypeReveal from './TypeReveal.jsx'
import { NOOK_TYPES, SAMPLE_RESULT } from '../data/nookTypes.js'
import { CONNECT_GROUPS, FOCUS_INTERESTS, MONTHS, SKILLS } from '../data/profileOptions.js'
import './Profile.css'

// The signed-in user's own profile ("my nook"): an about-me tab and the Nook type reveal.
// Everything here is sample data held in the page; nothing is saved or sent anywhere yet.
const SAMPLE_PROFILE = {
  name: 'Amy Jung',
  school: 'UC Berkeley Student',
  focus: ['UI/UX', 'Graphic Design', 'Content Creation'],
  skills: ['UI/UX', 'Coding', 'Data Analysis'],
  connect: ['Instagram', 'YouTube', 'Spotify', 'Claude'],
}

const TABS = [
  { id: 'about', label: 'about me', path: '/profile' },
  { id: 'nook', label: 'my nook type', path: '/reveal' },
]

const toggle = (list, item) =>
  list.includes(item) ? list.filter((i) => i !== item) : [...list, item]

function CameraIcon() {
  return (
    <svg className="profile__camera" viewBox="0 0 48 48" aria-hidden="true">
      <path d="M8 16a4 4 0 0 1 4-4h5l3-5h8l3 5h5a4 4 0 0 1 4 4v20a4 4 0 0 1-4 4H12a4 4 0 0 1-4-4Z" />
      <circle cx="24" cy="25" r="7.5" />
    </svg>
  )
}

function Photo() {
  const [url, setUrl] = useState(null)

  // The photo stays in this browser tab as a preview; it isn't uploaded.
  useEffect(() => () => url && URL.revokeObjectURL(url), [url])

  return (
    <label className={`profile__photo ${url ? 'has-photo' : ''}`}>
      <input
        type="file"
        accept="image/*"
        className="visually-hidden"
        onChange={(e) => {
          const file = e.target.files?.[0]
          if (file) setUrl(URL.createObjectURL(file))
        }}
      />
      {url ? <img src={url} alt="Your profile photo" /> : <CameraIcon />}
      <span className="profile__photo-label">{url ? 'change photo' : 'add a photo'}</span>
    </label>
  )
}

function Field({ label, hint, htmlFor, children }) {
  const Label = htmlFor ? 'label' : 'span'
  return (
    <div className="field">
      <Label className="field__label" htmlFor={htmlFor}>
        {label}
        {hint && <span className="field__hint"> {hint}</span>}
      </Label>
      {children}
    </div>
  )
}

function AboutMe() {
  const [focus, setFocus] = useState(SAMPLE_PROFILE.focus)
  const [skills, setSkills] = useState(SAMPLE_PROFILE.skills)
  const [connect, setConnect] = useState(SAMPLE_PROFILE.connect)

  return (
    <form className="about" onSubmit={(e) => e.preventDefault()}>
      <div className="about__fields">
        <Field label="Birthday">
          <div className="field__row">
            <select aria-label="Birth month" defaultValue="">
              <option value="" disabled>
                Month
              </option>
              {MONTHS.map((m) => (
                <option key={m}>{m}</option>
              ))}
            </select>
            <input aria-label="Birth day" inputMode="numeric" maxLength={2} placeholder="Day" />
            <input aria-label="Birth year" inputMode="numeric" maxLength={4} placeholder="Year" />
          </div>
        </Field>
        <Field label="Email address" htmlFor="profile-email">
          <input id="profile-email" type="email" autoComplete="email" placeholder="Enter your email" />
        </Field>
        <Field label="Address" htmlFor="profile-address">
          <input id="profile-address" autoComplete="street-address" placeholder="Enter your address" />
        </Field>
        <Field label="MBTI" hint="(optional)" htmlFor="profile-mbti">
          <input id="profile-mbti" maxLength={4} placeholder="Enter your MBTI" />
        </Field>
      </div>

      <div className="about__columns">
        <div className="about__card">
          <ChipGroup
            label="Focus interests"
            options={FOCUS_INTERESTS}
            selected={focus}
            onToggle={(o) => setFocus((l) => toggle(l, o))}
            hint="Choose as many as you want!"
          />
          <ChipGroup
            label="Skills"
            options={SKILLS}
            selected={skills}
            onToggle={(o) => setSkills((l) => toggle(l, o))}
            shown={5}
            hint="Choose as many as you want!"
          />
        </div>

        <div className="about__card">
          <div className="connect__head">
            <h2>Connect!</h2>
            <span className="profile__sample">coming soon</span>
          </div>
          <p className="connect__note">
            Nook will read the accounts you link to find your type and your people. Linking isn’t
            live yet, so for now these just mark the ones you’d connect.
          </p>
          {CONNECT_GROUPS.map((group) => (
            <ChipGroup
              key={group.label}
              label={group.label}
              options={group.options}
              shown={group.shown}
              selected={connect}
              onToggle={(o) => setConnect((l) => toggle(l, o))}
              size="sm"
            />
          ))}
        </div>
      </div>
    </form>
  )
}

export default function Profile({ initialTab = 'about' }) {
  const [tab, setTab] = useState(initialTab)
  const type = NOOK_TYPES.find((t) => t.slug === SAMPLE_RESULT.slug)

  const openTab = (id) => {
    setTab(id)
    const path = TABS.find((t) => t.id === id).path
    if (window.location.pathname !== path) window.history.replaceState(null, '', path)
  }

  return (
    <main className={`profile profile--${tab}`}>
      <header className="profile__head">
        <Photo />
        <div className="profile__intro">
          <h1 className="profile__title">my nook</h1>
          <p className="profile__name">{SAMPLE_PROFILE.name}</p>
          <p className="profile__meta">
            {SAMPLE_PROFILE.school}
            <button type="button" className="profile__type" onClick={() => openTab('nook')}>
              <TypeIcon slug={type.slug} className="profile__type-icon" />
              {type.name}
            </button>
            <span className="profile__sample">sample profile</span>
          </p>

          <div className="profile__tabs" role="tablist" aria-label="Profile sections">
            {TABS.map((t) => (
              <button
                key={t.id}
                type="button"
                role="tab"
                id={`tab-${t.id}`}
                aria-selected={tab === t.id}
                aria-controls={`panel-${t.id}`}
                onClick={() => openTab(t.id)}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>
      </header>

      <section id={`panel-${tab}`} role="tabpanel" aria-labelledby={`tab-${tab}`}>
        {tab === 'about' ? <AboutMe /> : <TypeReveal embedded />}
      </section>
    </main>
  )
}
