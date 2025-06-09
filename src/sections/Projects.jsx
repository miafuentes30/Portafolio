import { useEffect, useRef } from 'react';
import './Projects.css';

function Projects() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = document.body.scrollHeight;


    const width = canvas.width;
    const height = canvas.height;


    // Nubes
    const clouds = Array.from({ length: 180 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height * 0.6,
      size: Math.random() * 80 + 50,
      speed: Math.random() * 0.2 + 0.05,
      alpha: Math.random() * 0.2 + 0.1
    }));

    // Sol
    const sun = Array.from({ length: 35 }, () => ({
      x: width * 0.85 + Math.random() * 80 - 40,
      y: height * 0.2 + Math.random() * 80 - 40,
      size: Math.random() * 25 + 20,
      color: `rgba(255, ${200 + Math.random() * 55}, 80, 0.4)`
    }));

    // Montañas
    const mountains = [];
    const mountainConfigs = [
    { baseX: width * 0.15, baseY: height * 0.9, layers: 14, spread: 200 },
    { baseX: width * 0.5, baseY: height * 0.88, layers: 18, spread: 250 },
    { baseX: width * 0.85, baseY: height * 0.9, layers: 15, spread: 200 },
    ];
    mountainConfigs.forEach(({ baseX, baseY, layers, spread }) => {
    for (let i = 0; i < layers; i++) {
        mountains.push({
        x: baseX + (Math.random() * spread - spread / 2),
        y: baseY - i * 14 + Math.random() * 8,
        size: 140 - i * 5,
        color: `rgba(${30 + i * 8}, ${100 + i * 10}, ${30 + i * 8}, ${0.5 + i * 0.025})`
        });
    }
    });

    // Cesped 
    const grass = Array.from({ length: 150 }, () => ({
    x: Math.random() * width,
    y: height * 0.92 + Math.random() * 50,
    size: Math.random() * 100 + 40,
    color: `rgba(${50 + Math.random() * 70}, ${160 + Math.random() * 60}, ${50 + Math.random() * 70}, ${0.4 + Math.random() * 0.3})`
    }));



    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      // Fondo cielo
      const grad = ctx.createLinearGradient(0, 0, 0, height);
      grad.addColorStop(0, '#4fc3f7');
      grad.addColorStop(0.5, '#81d4fa');
      grad.addColorStop(1, '#e1f5fe');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, height);

      // Nubes
      for (const c of clouds) {
        c.x += c.speed;
        if (c.x - c.size > width) c.x = -c.size;
        ctx.beginPath();
        ctx.fillStyle = `rgba(255, 255, 255, ${c.alpha})`;
        ctx.arc(c.x, c.y, c.size, 0, Math.PI * 2);
        ctx.fill();
      }

    // Sol 
      const sunFloat = Math.sin(Date.now() * 0.001) * 10;
      for (const s of sun) {
        ctx.beginPath();
        ctx.fillStyle = s.color;
        ctx.arc(s.x, s.y + sunFloat, s.size, 0, Math.PI * 2);
        ctx.fill();
      }

      // Montañas
      for (const m of mountains) {
        ctx.beginPath();
        ctx.fillStyle = m.color;
        ctx.arc(m.x, m.y, m.size, 0, Math.PI * 2);
        ctx.fill();
      }

        //Cesped 
        for (const g of grass) {
        ctx.beginPath();
        ctx.fillStyle = g.color;
        ctx.arc(g.x, g.y, g.size, 0, Math.PI * 2);
        ctx.fill();
        }



      requestAnimationFrame(draw);
    };

    draw();

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = document.body.scrollHeight;
    };
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, []);

return (
  <section className="projects-wrapper" id="projects">
    <canvas ref={canvasRef} className="projects-canvas" />

    <div className="project-card-container">
      <h2> ✨ Proyectos ✨ </h2>
      <p className="projects-intro">
        Estos son algunos de los proyectos que he realizado a lo largo de mi vida. :3
      </p>

      <div className="project-cards">
        <div className="project-card">
          <h3>CRUD Tienda de Ropa</h3>
          <p>Sistema CRUD para gestionar productos y ventas de una tienda de ropa. Incluye autenticación y base de datos.</p>
          <ul>
            <li>FastAPI como framework</li>
            <li>SQLAlchemy como ORM</li>
            <li>PostgreSQL como base de datos</li>
            <li>Pydantic para validación de datos</li>
          </ul>
          <a href="https://github.com/miafuentes30/CRUD-TiendaRopa" target="_blank">Ver en GitHub</a>
        </div>

        <div className="project-card">
          <h3>Calculadora Fantasy</h3>
          <p>Calculadora desarrollada con React y Vite.</p>
          <ul>
            <li>React</li>
            <li>Vite</li>
            <li>TypeScript</li>
            <li>Vitest + Testing Library</li>
            <li>Storybook</li>
            <li>ESLint</li>
          </ul>
          <a href="https://github.com/miafuentes30/Calculadora-Proyect1" target="_blank">Ver en GitHub</a>
        </div>

        <div className="project-card">
          <h3>Proyecto 2 - Base de Datos</h3>
          <p>Proyecto académico enfocado en diseño, concurrencia y normalización de bases de datos PostgreSQL.</p>
          <ul>
            <li>PostgreSQL</li>
            <li>Docker</li>
            <li>Go</li>
          </ul>
          <a href="https://github.com/miafuentes30/Proyecto-2-BD" target="_blank">Ver en GitHub</a>
        </div>

        <div className="project-card">
          <h3>CSS Lab 4 - Solo CSS</h3>
          <p>Diseño de un Gojo Gato utilizando únicamente CSS puro.</p>
          <ul>
            <li>HTML</li>
            <li>CSS</li>
          </ul>
          <a href="https://github.com/miafuentes30/CSS-Lab4" target="_blank">Ver en GitHub</a>
        </div>

        <div className="project-card">
          <h3>Raíces de Vida</h3>
          <p>App para atender casos de desnutrición, desarrollada en equipo con React Native y PostgreSQL.</p>
          <ul>
            <li>Frontend móvil: React Native + Expo</li>
            <li>Backend: Go (Golang) con servidor REST</li>
            <li>Base de datos: PostgreSQL</li>
            <li>Infraestructura/devops: Docker</li>
          </ul>
          <a href="https://github.com/Raices-de-Vida/Raices_de_Vida" target="_blank">Ver en GitHub</a>
        </div>
      </div>
    </div>
  </section>
);

}

export default Projects;
