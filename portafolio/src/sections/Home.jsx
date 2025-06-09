import { useEffect, useRef } from 'react'
import './Home.css'
import Button from '../components/Button'
import MiaImg from '../assets/images/Mia.jpg'

const SakuraTree = () => {
  const canvasRef = useRef(null)
  const particles = useRef([])

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const trunkColors = [
      'rgba(139,69,19,0.8)', 
      'rgba(160,82,45,0.8)', 
      'rgba(92,64,51,0.8)', 
      'rgba(101,67,33,0.8)',
      'rgba(139,90,43,0.8)',
      'rgba(78,53,36,0.8)'
    ]
    const grassColors = [
      'rgba(174,213,129,0.7)', 
      'rgba(197,225,165,0.7)', 
      'rgba(156,204,101,0.7)',
      'rgba(144,238,144,0.7)',
      'rgba(152,251,152,0.7)'
    ]
    const blossomColors = [
    'rgba(255,105,180,0.7)', 
    'rgba(255,20,147,0.7)',      
    'rgba(255,182,193,0.7)', 
    'rgba(255,99,132,0.7)',  
    'rgba(255,160,203,0.7)', 
    'rgba(255,118,188,0.7)'  
    ]

    const width = canvas.width
    const height = canvas.height
    const centerX = width / 2
    const groundY = height * 0.85

    particles.current = []

    // Tronco 
    for (let i = 0; i < 60; i++) {
      if (Math.random() > 0.3) {
        for (let j = -1; j <= 1; j++) {
          if (Math.random() > 0.4) { 
            particles.current.push({
              x: centerX + j * 15 + Math.random() * 12 - 6,
              y: groundY - i * 9,
              size: Math.random() * 10 + 12,
              baseY: groundY - i * 9,
              color: trunkColors[Math.floor(Math.random() * trunkColors.length)],
              type: 'trunk',
              speed: Math.random() * 0.2 + 0.05
            })
          }
        }
      }
    }

    // Copa 
    for (let i = 0; i < 400; i++) { 
    const radius = 60 + Math.random() * 100
    const angle = Math.random() * Math.PI * 2
    const x = centerX + Math.cos(angle) * radius * 1.2 
    const y = groundY - 400 + Math.sin(angle) * radius * 0.6
    particles.current.push({
        x,
        y,
        size: Math.random() * 18 + 10, 
        baseY: y,
        color: blossomColors[Math.floor(Math.random() * blossomColors.length)],
        type: 'blossom',
        speed: Math.random() * 0.3 + 0.1
    })
    }


    // Circulo medio 
    for (let i = 0; i < 350; i++) {
    const radius = 120 + Math.random() * 90
    const angle = Math.random() * Math.PI * 2
    const x = centerX + Math.cos(angle) * radius * 1.4 
    const y = groundY - 430 + Math.sin(angle) * radius * 0.7
    particles.current.push({
        x,
        y,
        size: Math.random() * 14 + 9,
        baseY: y,
        color: blossomColors[Math.floor(Math.random() * blossomColors.length)],
        type: 'blossom',
        speed: Math.random() * 0.3 + 0.1
    })
    }


    // Circulo exterior 
    for (let i = 0; i < 250; i++) {
    const radius = 180 + Math.random() * 120
    const angle = Math.random() * Math.PI * 2
    const x = centerX + Math.cos(angle) * radius * 1.6
    const y = groundY - 450 + Math.sin(angle) * radius * 0.8
    particles.current.push({
        x,
        y,
        size: Math.random() * 12 + 7,
        baseY: y,
        color: blossomColors[Math.floor(Math.random() * blossomColors.length)],
        type: 'blossom',
        speed: Math.random() * 0.3 + 0.1
    })
    }


    // Césped 
    for (let i = 0; i < 800; i++) {
      const x = Math.random() * width
      const y = groundY + Math.random() * 80
      particles.current.push({
        x,
        y,
        size: Math.random() * 10 + 8,
        baseY: y,
        color: grassColors[Math.floor(Math.random() * grassColors.length)],
        type: 'grass',
        speed: Math.random() * 0.2 + 0.05
      })
    }

    for (let i = 0; i < 600; i++) {
      const x = Math.random() * width
      const y = groundY + Math.random() * 60 + 40
      particles.current.push({
        x,
        y,
        size: Math.random() * 8 + 6,
        baseY: y,
        color: grassColors[Math.floor(Math.random() * grassColors.length)],
        type: 'grass',
        speed: Math.random() * 0.15 + 0.03
      })
    }

    // Petalos cayendo
    for (let i = 0; i < 95; i++) {
      particles.current.push({
        x: Math.random() * width,
        y: Math.random() * (height * 0.6), 
        size: Math.random() * 6 + 4,
        baseY: Math.random() * (height * 0.6),
        color: blossomColors[Math.floor(Math.random() * blossomColors.length)],
        type: 'falling',
        speed: Math.random() * 0.5 + 0.2,
        fallSpeed: Math.random() * 0.3 + 0.1
      })
    }

    const draw = () => {
      ctx.clearRect(0, 0, width, height)

      const grad = ctx.createLinearGradient(0, 0, 0, height)
      grad.addColorStop(0, '#e3f2fd')
      grad.addColorStop(0.5, '#bbdefb')
      grad.addColorStop(1, '#90caf9')
      ctx.fillStyle = grad
      ctx.fillRect(0, 0, width, height)

      for (const p of particles.current) {
        if (p.type === 'falling') {
          p.y += p.fallSpeed
          p.x += Math.sin(Date.now() * 0.001 * p.speed + p.x) * 0.5

          if (p.y > height) {
            p.y = -10
            p.x = Math.random() * width
          }
          
          ctx.beginPath()
          ctx.fillStyle = p.color
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
          ctx.fill()
        } else {
          const offset = Math.sin(Date.now() * 0.001 * p.speed + p.x) * 2
          ctx.beginPath()
          ctx.fillStyle = p.color
          ctx.arc(p.x, p.baseY + offset, p.size, 0, Math.PI * 2)
          ctx.fill()
        }
      }

      requestAnimationFrame(draw)
    }

    draw()

    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <div className="sakura-wrapper">
      <canvas ref={canvasRef} className="sakura-canvas" />
      <div className="center-card">
        <img src={MiaImg} alt="Luffy chibi" className="about-avatar" />
        <h1>Mia Fuentes</h1>
        <p className="subtitle">
          Estudiante de Ingeniería en Ciencias de la Computación y Tecnologías de la Información, estoy cursando mi tercer año,
          en busca de una oportunidad laboral orientada en el diseño Frontend y Base de Datos.
        </p>
        <div className="buttons">
          <Button text="Ver proyectos" href="/projects" />
          <Button text="Aún no tengo CV" variant="outline" />
        </div>
      </div>
    </div>
  )
}

export default SakuraTree