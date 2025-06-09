import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import ThemeToggle from './components/ThemeToggle'
import SakuraTree from './sections/Home'
import About from './sections/About'
import Projects from './sections/Projects'
import Skills from './sections/Skills'
import Contact from './sections/Contact'

function App() {
  return (
    <>
      <Navbar />
      <ThemeToggle />
    <Routes>
      <Route path="/" element={<SakuraTree />} />
      <Route path="/about" element={<About />} />
      <Route path="/skills" element={<Skills />} />
      <Route path="/projects" element={<Projects />} />
      <Route path="/contact" element={<Contact />} />
    </Routes>
    </>
  )
}

export default App
