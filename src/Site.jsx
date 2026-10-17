import { lazy, Suspense, useEffect, useState } from 'react'
import App from './App.jsx'
import Navbar from './components/Navbar.jsx'
import Home from './pages/Home.jsx'

// Home ships with the app since nearly every visit lands there. The other pages load as their
// own chunks, fetched in the background once the first view is up, so switching pages never waits.
const loadProfile = () => import('./pages/Profile.jsx')
const loadReveal = () => import('./pages/TypeReveal.jsx')
const loadSearch = () => import('./pages/Search.jsx')
const Profile = lazy(loadProfile)
const TypeReveal = lazy(loadReveal)
const Search = lazy(loadSearch)

// The landing intro stands alone at /. Signed-in pages share the navbar; anything unknown lands
// on /home. The profile (from the avatar) is where you fill in your info; "get my nook type"
// there leads to /my-nook, which plays the reveal. /reveal is an older name for it.
const ROUTES = {
  '/home': { nav: '/home', page: () => <Home /> },
  '/profile': { nav: '/profile', page: () => <Profile /> },
  '/my-nook': { nav: '/my-nook', page: () => <TypeReveal /> },
  '/reveal': { nav: '/my-nook', page: () => <TypeReveal /> },
  '/search': { nav: '/search', page: () => <Search /> },
}

const clean = (pathname) => pathname.replace(/\/+$/, '') || '/'
const isRoute = (path) => path === '/' || path in ROUTES

export default function Site() {
  const [path, setPath] = useState(() => clean(window.location.pathname))

  const navigate = (to) => {
    window.history.pushState(null, '', to)
    setPath(clean(window.location.pathname))
    window.scrollTo(0, 0)
  }

  // Same-site links swap the page in place instead of reloading the whole app.
  useEffect(() => {
    const onClick = (e) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return
      const link = e.target.closest('a[href]')
      if (!link || link.target || link.origin !== window.location.origin) return
      const to = clean(link.pathname)
      if (!isRoute(to) || (link.hash && to === clean(window.location.pathname))) return
      e.preventDefault()
      navigate(link.pathname + link.hash)
    }
    const onPop = () => setPath(clean(window.location.pathname))

    document.addEventListener('click', onClick)
    window.addEventListener('popstate', onPop)
    return () => {
      document.removeEventListener('click', onClick)
      window.removeEventListener('popstate', onPop)
    }
  }, [])

  useEffect(() => {
    const preload = () => [loadProfile, loadReveal, loadSearch].forEach((load) => load())
    if ('requestIdleCallback' in window) {
      const id = window.requestIdleCallback(preload, { timeout: 2000 })
      return () => window.cancelIdleCallback(id)
    }
    const id = setTimeout(preload, 1200)
    return () => clearTimeout(id)
  }, [])

  if (path === '/') return <App onDone={() => navigate('/home')} />

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
