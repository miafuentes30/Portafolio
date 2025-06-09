import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  return (
    <nav className="navbar">
      <ul className="nav-links">
        <li><Link to="/">Inicio</Link></li>
        <li><Link to="/about">Sobre mí</Link></li>
        <li><Link to="/skills">Skills</Link></li>
        <li><Link to="/projects">Proyectos</Link></li>
        <li><Link to="/contact">Contacto</Link></li>
      </ul>
    </nav>
  );
}

export default Navbar;