import Wordmark from './components/Wordmark.jsx'
import './App.css'

export default function App() {
  return (
    <main className="intro">
      <p className="intro__lead">Introducing…</p>
      <h1 className="intro__mark">
        <Wordmark />
      </h1>
      <p className="intro__tagline">for real connections.</p>
    </main>
  )
}
