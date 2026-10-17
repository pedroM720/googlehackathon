import { useDeferredValue, useMemo, useState } from 'react'
import ChipGroup from '../components/ChipGroup.jsx'
import SparkIcon from '../components/SparkIcon.jsx'
import TypeIcon from '../components/TypeIcon.jsx'
import { NOOK_TYPES } from '../data/nookTypes.js'
import { FOCUS_INTERESTS, HOBBIES, MUSIC_GENRES, SKILLS } from '../data/profileOptions.js'
import { SEARCH_PEOPLE } from '../data/searchSample.js'
import './Search.css'

// Search over sample people: typed words and filter chips narrow the list. Within a filter
// group any pick matches; across groups every group has to match.
const TYPE_NAMES = Object.fromEntries(NOOK_TYPES.map((t) => [t.slug, t.name.replace(/^The /, '')]))
const TYPE_SLUGS = Object.fromEntries(Object.entries(TYPE_NAMES).map(([slug, name]) => [name, slug]))

const GROUPS = [
  { key: 'focus', label: 'Focus interest', options: FOCUS_INTERESTS, shown: 7 },
  { key: 'nookType', label: 'Nook type', options: Object.values(TYPE_NAMES), shown: 8 },
  { key: 'hobbies', label: 'Hobbies', options: HOBBIES, shown: 7 },
  { key: 'music', label: 'Music genres', options: MUSIC_GENRES, shown: 7 },
]
const MORE_GROUPS = [{ key: 'skills', label: 'Skills', options: SKILLS, shown: 7 }]
const EMPTY_FILTERS = { focus: [], nookType: [], hobbies: [], music: [], skills: [] }

const valuesFor = (person, key) =>
  key === 'nookType' ? [TYPE_NAMES[person.nookType]] : person[key]

const initials = (name) =>
  name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2)

function search(people, filters, query) {
  const words = query.toLowerCase().split(/\s+/).filter(Boolean)

  return people.flatMap((person) => {
    const passes = Object.entries(filters).every(
      ([key, picked]) => !picked.length || picked.some((p) => valuesFor(person, key).includes(p)),
    )
    if (!passes) return []

    const tags = [...person.focus, ...person.hobbies, ...person.music, ...person.skills]
    const haystack = [person.name, person.school, person.location, TYPE_NAMES[person.nookType], ...tags]
      .join(' ')
      .toLowerCase()
    if (!words.every((w) => haystack.includes(w))) return []

    // Interests that answer the search come first and are highlighted.
    const picked = new Set(Object.values(filters).flat())
    const hits = (tag) => picked.has(tag) || words.some((w) => tag.toLowerCase().includes(w))
    const interests = [...new Set([...person.focus, ...person.hobbies])]
    const relevant = [...interests.filter(hits), ...interests.filter((t) => !hits(t))].map((tag) => ({
      tag,
      hit: hits(tag),
    }))

    return [{ person, relevant, score: relevant.filter((r) => r.hit).length }]
  }).sort((a, b) => b.score - a.score)
}

function SearchIcon() {
  return (
    <svg className="search__icon" viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="10.5" cy="10.5" r="6.5" />
      <path d="M15.5 15.5 20 20" />
    </svg>
  )
}

function Result({ person, relevant, sparked, onSpark }) {
  const typeName = TYPE_NAMES[person.nookType]

  return (
    <li className="result">
      <span className="result__avatar" style={{ background: person.color }} aria-hidden="true">
        {initials(person.name)}
      </span>
      <div className="result__who">
        <p className="result__name">{person.name}</p>
        <p className="result__line">{person.school}</p>
        <p className="result__line result__line--muted">{person.location}</p>
        <p className="result__interests">
          Relevant interests:{' '}
          {relevant.map(({ tag, hit }, i) => (
            <span key={tag}>
              {hit ? <strong>{tag}</strong> : tag}
              {i < relevant.length - 1 && ', '}
            </span>
          ))}
        </p>
      </div>
      <p className="result__type">
        <TypeIcon slug={person.nookType} className="result__type-icon" />
        <span>The {typeName}</span>
      </p>
      <button
        type="button"
        className="spark-btn"
        aria-pressed={sparked}
        aria-label={`${sparked ? 'Sparked' : 'Spark'} ${person.name}`}
        onClick={onSpark}
      >
        <SparkIcon className="spark-btn__icon" />
        {sparked ? 'Sparked' : 'Spark'}
      </button>
    </li>
  )
}

export default function Search() {
  const [query, setQuery] = useState('')
  const [filters, setFilters] = useState(EMPTY_FILTERS)
  const [moreFilters, setMoreFilters] = useState(false)
  // On narrow screens the filters fold away so the people come first.
  const [filtersOpen, setFiltersOpen] = useState(false)
  const [sparked, setSparked] = useState([])
  const deferredQuery = useDeferredValue(query)

  const results = useMemo(
    () => search(SEARCH_PEOPLE, filters, deferredQuery),
    [filters, deferredQuery],
  )
  const activeCount = Object.values(filters).flat().length

  const toggleFilter = (key, option) =>
    setFilters((f) => ({
      ...f,
      [key]: f[key].includes(option) ? f[key].filter((o) => o !== option) : [...f[key], option],
    }))

  const clearAll = () => {
    setFilters(EMPTY_FILTERS)
    setQuery('')
  }

  return (
    <main className="search">
      <form className="search__bar" role="search" onSubmit={(e) => e.preventDefault()}>
        <SearchIcon />
        <label className="visually-hidden" htmlFor="search-input">
          Search people
        </label>
        <input
          id="search-input"
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Help me find someone…"
          autoComplete="off"
        />
      </form>

      <div className="search__layout">
        <aside
          className={`search__filters ${filtersOpen ? 'is-open' : ''}`}
          aria-labelledby="filters-heading"
        >
          <div className="search__filters-head">
            <h2 id="filters-heading">filters</h2>
            {activeCount > 0 && (
              <button type="button" className="search__clear" onClick={() => setFilters(EMPTY_FILTERS)}>
                Clear {activeCount}
              </button>
            )}
            <button
              type="button"
              className="search__toggle"
              aria-expanded={filtersOpen}
              onClick={() => setFiltersOpen((o) => !o)}
            >
              {filtersOpen ? 'Hide' : 'Show'}
            </button>
          </div>
          {[...GROUPS, ...(moreFilters ? MORE_GROUPS : [])].map((group) => (
            <ChipGroup
              key={group.key}
              label={group.label}
              options={group.options}
              shown={group.shown}
              selected={filters[group.key]}
              onToggle={(o) => toggleFilter(group.key, o)}
              size="sm"
              renderOption={
                group.key === 'nookType'
                  ? (o) => (
                      <>
                        <TypeIcon slug={TYPE_SLUGS[o]} className="search__chip-icon" />
                        {o}
                      </>
                    )
                  : undefined
              }
            />
          ))}
          <button
            type="button"
            className="chip chip--more search__more"
            aria-expanded={moreFilters}
            onClick={() => setMoreFilters((m) => !m)}
          >
            {moreFilters ? 'Fewer filters' : 'More filters'}
          </button>
        </aside>

        <section className="search__results" aria-labelledby="results-heading">
          <div className="search__results-head">
            <h2 id="results-heading">
              <SparkIcon className="search__heading-spark" />
              potential sparks…
            </h2>
            <span className="search__count" aria-live="polite">
              {results.length} {results.length === 1 ? 'person' : 'people'}
            </span>
            <span className="search__sample">sample profiles</span>
          </div>

          {results.length ? (
            <ul className="results">
              {results.map(({ person, relevant }) => (
                <Result
                  key={person.name}
                  person={person}
                  relevant={relevant}
                  sparked={sparked.includes(person.name)}
                  onSpark={() =>
                    setSparked((s) =>
                      s.includes(person.name) ? s.filter((n) => n !== person.name) : [...s, person.name],
                    )
                  }
                />
              ))}
            </ul>
          ) : (
            <div className="search__empty">
              <p>No one matches all of that yet. Try fewer filters or different words.</p>
              <button type="button" className="search__clear" onClick={clearAll}>
                Clear search
              </button>
            </div>
          )}
        </section>
      </div>
    </main>
  )
}
