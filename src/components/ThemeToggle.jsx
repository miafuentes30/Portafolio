import { useState } from 'react'
import './ThemeToggle.css'

function ThemeToggle() {
  const [dark, setDark] = useState(false)

  const toggleTheme = () => {
    document.documentElement.classList.toggle('dark-mode')
    setDark(!dark)
  }

  return (
    <button className="theme-toggle" onClick={toggleTheme}>
      {dark ? 'c' : 'o'}
    </button>
  )
}

export default ThemeToggle
