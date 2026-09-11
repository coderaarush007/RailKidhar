import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// Applied once here (not inside the Settings page) so the stored theme
// survives a hard reload on any route, not just while Settings is mounted.
try {
  const theme = localStorage.getItem('rk-theme')
  if (theme === 'dark') document.documentElement.setAttribute('data-theme', 'dark')
} catch {
  // storage unavailable — falls back to light/system default
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
