import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Navbar from './components/Navbar.jsx'
import Home from './pages/Home.jsx'
import Profile from './pages/Profile.jsx'
import Search from './pages/Search.jsx'

// The landing intro stands alone at /. Signed-in pages share the navbar; anything unknown lands on /home.
const path = window.location.pathname.replace(/\/+$/, '') || '/'
// /reveal opens the profile on its Nook type tab.
const PAGES = {
  '/home': { Page: Home, nav: '/home' },
  '/profile': { Page: Profile, nav: '/profile' },
  '/reveal': { Page: () => <Profile initialTab="nook" />, nav: '/profile' },
  '/search': { Page: Search, nav: '/search' },
}
const { Page, nav } = PAGES[path] ?? PAGES['/home']

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {path === '/' ? (
      <App />
    ) : (
      <div className="has-navbar">
        <Navbar current={nav} />
        <Page />
      </div>
    )}
  </StrictMode>,
)
