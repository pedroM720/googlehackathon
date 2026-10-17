import { useEffect, useState } from 'react'
import ChipGroup from '../components/ChipGroup.jsx'
import {
  CONNECT_GROUPS,
  FOCUS_INTERESTS,
  GOALS,
  HOBBIES,
  MONTHS,
  SKILLS,
} from '../data/profileOptions.js'
import './Profile.css'

// The signed-in user's profile, called their nook: fill it in, create it, then "get my nook type"
// leads to the reveal. Everything is sample data held in the page; nothing is saved or sent yet.
const SAMPLE_PROFILE = {
  name: 'Amy Jung',
  school: 'UC Berkeley Student',
  focus: ['UI/UX', 'Graphic Design', 'Content Creation'],
  skills: ['UI/UX', 'Coding', 'Data Analysis'],
  hobbies: ['Photography', 'Digital Illustration', 'Thrifting'],
  goals: ['Collaborators', 'Friends in my field'],
  connect: ['Instagram', 'YouTube', 'Spotify', 'Claude'],
}

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
  const [hobbies, setHobbies] = useState(SAMPLE_PROFILE.hobbies)
  const [goals, setGoals] = useState(SAMPLE_PROFILE.goals)

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
        <div className="field--wide">
          <Field label="Background" htmlFor="profile-background">
            <input
              id="profile-background"
              placeholder="School, major, and anything you’ve worked on"
            />
          </Field>
        </div>
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
          <ChipGroup
            label="Hobbies"
            options={HOBBIES}
            selected={hobbies}
            onToggle={(o) => setHobbies((l) => toggle(l, o))}
            shown={7}
          />
        </div>

        <div className="about__card">
          <div className="connect__head">
            <h2>Connect!</h2>
            <span className="profile__sample">coming soon</span>
          </div>
          <p className="connect__note">
            You choose what Nook reads. The accounts you link help it find your type and your
            people, and you can edit or disconnect anything at any time. Linking isn’t live yet,
            so for now these just mark the ones you’d connect.
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
          <ChipGroup
            label="Professional goals"
            options={GOALS}
            selected={goals}
            onToggle={(o) => setGoals((l) => toggle(l, o))}
            size="sm"
          />
        </div>
      </div>
    </form>
  )
}

export default function Profile() {
  const [created, setCreated] = useState(false)

  return (
    <main className="profile">
      <header className="profile__head">
        <Photo />
        <div className="profile__intro">
          <h1 className="profile__title">my nook</h1>
          <p className="profile__name">{SAMPLE_PROFILE.name}</p>
          <p className="profile__meta">
            {SAMPLE_PROFILE.school}
            <span className="profile__sample">sample profile</span>
          </p>
        </div>
      </header>

      <AboutMe />

      <div className={`profile__next ${created ? 'is-created' : ''}`} aria-live="polite">
        {created ? (
          <>
            <p>
              <strong>Your nook is ready.</strong> Next, Nook can find the kind of place you’d be.
            </p>
            <a className="profile__cta" href="/my-nook">
              get my nook type
            </a>
          </>
        ) : (
          <>
            <p>Filled in what feels like you? You can change any of it later.</p>
            <button type="button" className="profile__cta" onClick={() => setCreated(true)}>
              create profile
            </button>
          </>
        )}
      </div>
    </main>
  )
}
