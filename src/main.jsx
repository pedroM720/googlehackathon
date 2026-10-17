import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import TypeReveal from './pages/TypeReveal.jsx'

// Two standalone pages for now: the landing intro at / and the type reveal at /reveal.
const Page = window.location.pathname.replace(/\/+$/, '') === '/reveal' ? TypeReveal : App

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Page />
  </StrictMode>,
)
