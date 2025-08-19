import './About.css'
import { useEffect, useRef } from 'react'
import LuffyImg from '../assets/images/luffy-chibi.jpg'

function About() {
  const canvasRef = useRef(null)

    useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const width = canvas.width
    const height = canvas.height


    // Nubes 
    const clouds = []
    for (let i = 0; i < 200; i++) {
        clouds.push({
        x: Math.random() * width,
        y: Math.random() * height * 0.6,
        size: Math.random() * 80 + 50,
        speed: Math.random() * 0.2 + 0.05,
        alpha: Math.random() * 0.2 + 0.05
        })
    }

   // Sol 
    const sun = []
    const sunBaseX = width * 0.12
    const sunBaseY = height * 0.2
    for (let i = 0; i < 40; i++) {
        sun.push({
        x: sunBaseX + Math.random() * 40 - 20,
        y: sunBaseY + Math.random() * 40 - 20,
        size: Math.random() * 25 + 25,
        color: `rgba(255, ${190 + Math.random() * 50}, 80, 0.4)`
        })
    }

    // Particulas flotantes
    const dust = []
    for (let i = 0; i < 100; i++) {
        dust.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 3 + 1,
        speed: Math.random() * 0.2 + 0.05,
        color: `rgba(255, 255, 150, ${Math.random() * 0.6 + 0.3})`
        })
    }

    const draw = () => {
        ctx.clearRect(0, 0, width, height)

        //  Cielo 
        const grad = ctx.createLinearGradient(0, 0, 0, height)
        grad.addColorStop(0, '#4fc3f7') 
        grad.addColorStop(0.5, '#81d4fa')
        grad.addColorStop(1, '#e1f5fe')
        ctx.fillStyle = grad
        ctx.fillRect(0, 0, width, height)


        //  Nubes
        for (const c of clouds) {
        c.x += c.speed
        if (c.x - c.size > width) c.x = -c.size
        ctx.beginPath()
        ctx.fillStyle = `rgba(255, 255, 255, ${c.alpha})`
        ctx.arc(c.x, c.y, c.size, 0, Math.PI * 2)
        ctx.fill()
        }

        // Sol
        const sunFloat = Math.sin(Date.now() * 0.001) * 10
        for (const s of sun) {
        ctx.beginPath()
        ctx.fillStyle = s.color
        ctx.arc(s.x, s.y + sunFloat, s.size, 0, Math.PI * 2)
        ctx.fill()
        }

        // Polvo flotante
        for (const d of dust) {
        d.y += d.speed
        if (d.y > height) {
            d.y = -d.size
            d.x = Math.random() * width
        }
        ctx.beginPath()
        ctx.fillStyle = d.color
        ctx.arc(d.x, d.y, d.size, 0, Math.PI * 2)
        ctx.fill()
        }

        requestAnimationFrame(draw)
    }

    draw()

    const resize = () => {
        canvas.width = window.innerWidth
        canvas.height = window.innerHeight
    }
    window.addEventListener('resize', resize)

    return () => window.removeEventListener('resize', resize)
    }, [])


  return (
    <div className="about-wrapper">
      <canvas ref={canvasRef} className="about-canvas" />
      <div className="about-card">
        <img src={LuffyImg} alt="Luffy chibi" className="about-avatar" />
        <h2>✨ Sobre mí ✨</h2>
        <p>
          ¡Hola! Soy Mia Alejandra Fuentes Mérida, nacida el 25 de septiembre de 2004 en Guatemala.
          Estudié en el Colegio Belga (2012–2022), y actualmente soy estudiante de Ingeniería en Ciencia de la Computación y Tecnologías de la Información en la Universidad del Valle de Guatemala.
        </p>
        <p>
          Me apasiona diseñar y desarrollar experiencias digitales que cautiven al usuario. Disfruto especialmente del desarrollo frontend y la estructuración de bases de datos eficientes. Siempre estoy buscando nuevas formas de aprender, crear y aportar soluciones que impacten.
        </p>
        <p>
          Cuando no estoy codificando, suelo inspirarme viendo anime, explorando la naturaleza y soñando con nuevas ideas.
        </p>
        <div className="hobby-cards">
          <div className="hobby-card">🌸 Inspiración visual: naturaleza + anime</div>
          <div className="hobby-card">📺 Anime favorito: <strong>Haikyuu</strong></div>
          <div className="hobby-card">🏀 Me encanta el basket y la natación</div>
          <div className="hobby-card">❤️ Alma aventurera que ama conocer paises</div>
          <div className="hobby-card">🖥️ Frontend + bases de datos = ❤️</div>
          <div className="hobby-card">🧠 Curiosa, creativa y en constante evolución</div>
        </div>
      </div>
    </div>
  )
}

export default About
