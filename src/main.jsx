import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Navbar from './components/Navbar.jsx'
import Home from './pages/Home.jsx'
import TypeReveal from './pages/TypeReveal.jsx'

// The landing intro stands alone at /. Signed-in pages share the navbar; anything unknown lands on /home.
const path = window.location.pathname.replace(/\/+$/, '') || '/'
const PAGES = { '/home': Home, '/reveal': TypeReveal }
const Page = PAGES[path] ?? Home

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {path === '/' ? (
      <App />
    ) : (
      <div className="has-navbar">
        <Navbar current={PAGES[path] ? path : '/home'} />
        <Page />
      </div>
    )}
  </StrictMode>,
)
