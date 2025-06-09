import { useRef, useEffect } from 'react'
import './Contact.css'
import gojoImg from '../assets/images/gojo-chibi.jpg'

function Contact() {
  const canvasRef = useRef(null)

useEffect(() => {
  const canvas = canvasRef.current
  const ctx = canvas.getContext('2d')

  const resizeCanvas = () => {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
  }

  resizeCanvas()

  // luna
  const moon = Array.from({ length: 30 }, () => ({
    x: canvas.width / 2 + (Math.random() - 0.5) * 120,
    y: 160 + (Math.random() - 0.5) * 90,
    r: 60 + Math.random() * 35,
    alpha: 0.2 + Math.random() * 0.25
  }))

  // Nubes 
  const clouds = Array.from({ length: 25 }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: 30 + Math.random() * 40,
    alpha: 0.05 + Math.random() * 0.12
  }))

  // Estrellas 
  const stars = Array.from({ length: 180 }, () => {
    const count = 3 + Math.floor(Math.random() * 3)
    const x = Math.random() * canvas.width
    const y = Math.random() * canvas.height
    const baseAlpha = 0.3 + Math.random() * 0.4
    const flickerSpeed = 0.01 + Math.random() * 0.02
    const fallSpeed = 0.08 + Math.random() * 0.12
    const tone = 180 + Math.floor(Math.random() * 75) 

    return {
      cluster: Array.from({ length: count }, () => ({
        dx: (Math.random() - 0.5) * 25,
        dy: (Math.random() - 0.5) * 25,
        r: 5 + Math.random() * 9,
        tint: tone
      })),
      x,
      y,
      baseAlpha,
      flickerSpeed,
      phase: Math.random() * Math.PI * 2,
      fallSpeed
    }
  })



  let shootingStars = []

  function draw() {
    const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height)
    gradient.addColorStop(0, '#000510')
    gradient.addColorStop(1, '#031d3d')
    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // Nubes 
    clouds.forEach(c => {
      ctx.beginPath()
      ctx.arc(c.x, c.y, c.r, 0, Math.PI * 2)
      ctx.fillStyle = `rgba(255, 255, 255, ${c.alpha})`
      ctx.fill()
    })


    // Estrellas 
    stars.forEach(star => {
      star.phase += star.flickerSpeed
      const alpha = star.baseAlpha + Math.sin(star.phase) * 0.3

      star.y += star.fallSpeed
      if (star.y > canvas.height + 50) {
          star.y = -100
          star.x = Math.random() * canvas.width
        }


      star.cluster.forEach(s => {
        const x = star.x + s.dx
        const y = star.y + s.dy
        const glow = s.r + 8
        const tint = s.tint

        ctx.beginPath()
        ctx.arc(x, y, glow, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${tint}, ${tint}, 0, ${Math.max(0, alpha) * 0.15})`
        ctx.fill()

        ctx.beginPath()
        ctx.arc(x, y, s.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${tint}, ${tint}, 0, ${Math.max(0, alpha)})`
        ctx.fill()
      })
    })

    // Estrellas fugaces
    shootingStars.forEach((star, index) => {
      star.trail.unshift({ x: star.x, y: star.y })
      star.trail = star.trail.slice(0, 20)

    star.trail.forEach((p, i) => {
      const progress = i / 20
      const r = 255
      const g = 255 - Math.floor(progress * 100)  
      const b = 255 - Math.floor(progress * 255)  
      const alpha = 1 - progress
      const radius = 3 + progress * 4

      ctx.beginPath()
      ctx.arc(p.x, p.y, radius, 0, Math.PI * 2)
      ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`
      ctx.fill()
    })

      star.x += star.vx
      star.y += star.vy

      if (star.x > canvas.width || star.y > canvas.height) {
        shootingStars.splice(index, 1)
      }
    })

    // generar estrella fugaz
    if (Math.random() < 0.20 && shootingStars.length < 1) {
      shootingStars.push({
        x: Math.random() * canvas.width * 0.10,
        y: Math.random() * canvas.height * 0.30,
        vx: 5 + Math.random() * 2,
        vy: 2 + Math.random(),
        trail: []
      })
    }

        // Luna
    moon.forEach(c => {
      ctx.beginPath()
      ctx.arc(c.x, c.y, c.r + 25, 0, Math.PI * 2)
      ctx.fillStyle = `rgba(255, 255, 255, ${c.alpha * 0.12})`
      ctx.fill()
      ctx.beginPath()
      ctx.arc(c.x, c.y, c.r, 0, Math.PI * 2)
      ctx.fillStyle = `rgba(255, 255, 255, ${c.alpha})`
      ctx.fill()
    })

    requestAnimationFrame(draw)
  }

  draw()

  window.addEventListener('resize', resizeCanvas)
  return () => window.removeEventListener('resize', resizeCanvas)
}, [])



  return (
    <section className="contact-section" id="contact">
      <canvas ref={canvasRef} className="star-canvas" />
      <div className="contact-info">
        <img src={gojoImg} alt="Gojo Chibi" className="gojo-img" />
        <h2>Contáctame</h2>
        <p>📧 Email: mia.fuentesmerida@gmail.com</p>
        <p>📱 Teléfono: +502 4920 6090</p>
        <p>💬 Discord: miauuwu_</p>
        <p>🐙 GitHub: <a href="https://github.com/miafuentes30" target="_blank" rel="noopener noreferrer">miafuentes30</a></p>
        <p>📍 Ciudad de Guatemala</p>
      </div>
    </section>
  )
}

export default Contact
