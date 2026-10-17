import { lazy, Suspense, useEffect, useState } from 'react'
import App from './App.jsx'
import Navbar from './components/Navbar.jsx'
import Home from './pages/Home.jsx'
import { currentPath, linkPath, navigate } from './navigate.js'

// Home ships with the app since nearly every visit lands there. The other pages load as their
// own chunks, fetched in the background once the first view is up, so switching pages never waits.
const loadProfile = () => import('./pages/Profile.jsx')
const loadReveal = () => import('./pages/TypeReveal.jsx')
const loadSearch = () => import('./pages/Search.jsx')
const loadSparks = () => import('./pages/Sparks.jsx')
const loadMessages = () => import('./pages/Messages.jsx')
const Profile = lazy(loadProfile)
const TypeReveal = lazy(loadReveal)
const Search = lazy(loadSearch)
const Sparks = lazy(loadSparks)
const Messages = lazy(loadMessages)

// The landing intro stands alone at / and hands off to the profile (the demo starts there).
// Signed-in pages share the navbar; anything unknown lands on /home. The profile is your "nook";
// "get my nook type" there leads to /my-nook, which plays the reveal (/reveal is its older name).
const ROUTES = {
  '/home': { nav: '/home', page: () => <Home /> },
  '/profile': { nav: '/profile', page: () => <Profile /> },
  '/my-nook': { nav: '/profile', page: () => <TypeReveal /> },
  '/reveal': { nav: '/profile', page: () => <TypeReveal /> },
  '/search': { nav: '/search', page: () => <Search /> },
  '/sparks': { nav: '/sparks', page: () => <Sparks /> },
  '/messages': { nav: '/messages', page: () => <Messages /> },
}

const isRoute = (path) => path === '/' || path in ROUTES

export default function Site() {
  const [path, setPath] = useState(currentPath)

  // Same-site links swap the page in place instead of reloading the whole app.
  useEffect(() => {
    const onClick = (e) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return
      const link = e.target.closest('a[href]')
      if (!link || link.target || link.origin !== window.location.origin) return
      const to = linkPath(link)
      if (!to || !isRoute(to)) return
      e.preventDefault()
      navigate(to)
    }
    const onPop = () => setPath(currentPath())

    document.addEventListener('click', onClick)
    window.addEventListener('popstate', onPop)
    return () => {
      document.removeEventListener('click', onClick)
      window.removeEventListener('popstate', onPop)
    }
  }, [])

  useEffect(() => {
    const preload = () => [loadProfile, loadReveal, loadSearch, loadSparks, loadMessages].forEach((load) => load())
    if ('requestIdleCallback' in window) {
      const id = window.requestIdleCallback(preload, { timeout: 2000 })
      return () => window.cancelIdleCallback(id)
    }
    const id = setTimeout(preload, 1200)
    return () => clearTimeout(id)
  }, [])

  if (path === '/') return <App onDone={() => navigate('/profile')} />

  const route = ROUTES[path] ?? ROUTES['/home']
  return (
    <div className="has-navbar">
      <Navbar current={route.nav} />
      <Suspense fallback={null}>
        <route.page key={path} />
      </Suspense>
    </div>
  )
}
