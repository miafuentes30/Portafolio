import './Navbar.css'
import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <nav className="navbar">
      <h1 className="logo">MiaUwu</h1>
      <ul className="nav-links">
        <li><Link to="/"> Inicio</Link></li>
        <li><Link to="/about"> Sobre mí</Link></li>
        <li><Link to="/skills"> Skills</Link></li>
        <li><Link to="/resume"> CV</Link></li>
        <li><Link to="/contact"> Contacto</Link></li>
      </ul>
    </nav>
  )
}

export default Navbar
