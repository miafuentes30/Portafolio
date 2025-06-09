import { useRef, useEffect } from "react"
import "./Skills.css"
import htmlIcon from '../assets/icons/html5.svg'
import cssIcon from '../assets/icons/css3.svg'
import jsIcon from '../assets/icons/javascript.svg'
import reactIcon from '../assets/icons/react.svg'
import pythonIcon from '../assets/icons/python.svg'
import goIcon from '../assets/icons/go.svg'
import flaskIcon from '../assets/icons/flask.svg'
import postgresIcon from '../assets/icons/postgresql.svg'
import dockerIcon from '../assets/icons/docker.svg'
import tsIcon from '../assets/icons/typescript.svg'
import gitIcon from '../assets/icons/git.svg'
import vscodeIcon from '../assets/icons/vscode.svg'
import figmaIcon from '../assets/icons/figma.svg'

const skills = [
  { name: "Python", value: 80, icon: pythonIcon, category: "Backend" },
  { name: "PostgreSQL", value: 85, icon: postgresIcon, category: "Backend" },
  { name: "Flask", value: 72, icon: flaskIcon, category: "Backend" },
  { name: "Go", value: 45, icon: goIcon, category: "Backend" },
  { name: "Docker", value: 55, icon: dockerIcon, category: "Backend" },
  { name: "React", value: 65, icon: reactIcon, category: "Frontend" },
  { name: "JavaScript", value: 70, icon: jsIcon, category: "Frontend" },
  { name: "HTML5", value: 69, icon: htmlIcon, category: "Frontend" },
  { name: "CSS", value: 80, icon: cssIcon, category: "Frontend" },
  { name: "TypeScript", value: 42, icon: tsIcon, category: "Frontend" },
  { name: "Git", value: 72, icon: gitIcon, category: "Herramientas" },
  { name: "VS Code", value: 82, icon: vscodeIcon, category: "Herramientas" },
  { name: "Figma", value: 80, icon: figmaIcon, category: "Herramientas" }
]

function Skills() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    
    resizeCanvas()

    let cloudParticles = []
    let lightningDrops = []

    // Crear particulas de nubes 
    const createCloudParticles = () => {
      cloudParticles = []
      const particleCount = Math.floor((canvas.width * canvas.height) / 8000) 
      
      for (let i = 0; i < particleCount; i++) {
        cloudParticles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: Math.random() * 40 + 20, 
          speedX: (Math.random() - 0.5) * 0.3,
          speedY: (Math.random() - 0.5) * 0.3,
          alpha: Math.random() * 0.6 + 0.2,
          pulseSpeed: Math.random() * 0.02 + 0.01,
          pulsePhase: Math.random() * Math.PI * 2
        })
      }
    }

    // Crear rayos 
    const createLightningRain = () => {
      const startX = Math.random() * canvas.width
      const startY = -50
      const drops = []

      let currentX = startX
      let currentY = startY
      const segments = 12 + Math.random() * 10
      
      for (let i = 0; i < segments; i++) {
        const zigzagOffset = (Math.random() - 0.5) * 60
        const nextX = currentX + zigzagOffset
        const nextY = currentY + 40 + Math.random() * 30

        const circlesInSegment = 8 + Math.random() * 6
        for (let j = 0; j < circlesInSegment; j++) {
          const t = j / circlesInSegment
          const x = currentX + (nextX - currentX) * t
          const y = currentY + (nextY - currentY) * t
          
          drops.push({
            x: x,
            y: y,
            radius: Math.random() * 4 + 2, 
            intensity: 1 - (i / segments) * 0.3, 
            life: 1,
            fadeSpeed: 0.008 + Math.random() * 0.005,
            fallSpeed: 2 + Math.random() * 1.5,
            glowSize: Math.random() * 8 + 4
          })
        }
        
        currentX = nextX
        currentY = nextY
        
        if (Math.random() < 0.3 && i > 2) {
          const branchX = currentX + (Math.random() - 0.5) * 80
          const branchY = currentY + 20 + Math.random() * 30
          
          const branchCircles = 4 + Math.random() * 4
          for (let k = 0; k < branchCircles; k++) {
            const t = k / branchCircles
            const x = currentX + (branchX - currentX) * t
            const y = currentY + (branchY - currentY) * t
            
            drops.push({
              x: x,
              y: y,
              radius: Math.random() * 3 + 1,
              intensity: 0.7,
              life: 0.8,
              fadeSpeed: 0.012,
              fallSpeed: 1.5 + Math.random(),
              glowSize: Math.random() * 6 + 3
            })
          }
        }
      }
      
      lightningDrops.push({
        drops: drops,
        life: 1,
        creationTime: Date.now()
      })
    }

    const draw = () => {
      const grad = ctx.createLinearGradient(0, 0, 0, canvas.height)
      grad.addColorStop(0, "#000510")
      grad.addColorStop(0.3, "#001122")
      grad.addColorStop(0.7, "#002233")
      grad.addColorStop(1, "#003344")
      ctx.fillStyle = grad
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      cloudParticles.forEach((particle) => {
        particle.pulsePhase += particle.pulseSpeed
        const pulseAlpha = particle.alpha + Math.sin(particle.pulsePhase) * 0.2
        
        // Glow effect 
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.radius + 10, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(180, 220, 255, ${pulseAlpha * 0.1})`
        ctx.fill()
        
        // Nucleo de la nube
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(200, 220, 255, ${pulseAlpha})`
        ctx.fill()

        // Movimiento 
        particle.x += particle.speedX
        particle.y += particle.speedY

        // Rebote en los bordes
        if (particle.x < -particle.radius) particle.x = canvas.width + particle.radius
        if (particle.x > canvas.width + particle.radius) particle.x = -particle.radius
        if (particle.y < -particle.radius) particle.y = canvas.height + particle.radius
        if (particle.y > canvas.height + particle.radius) particle.y = -particle.radius
      })

      // Dibujar rayos 
      lightningDrops.forEach((lightning, lightningIndex) => {
        lightning.drops.forEach((drop, dropIndex) => {
          // Glow effect 
          ctx.beginPath()
          ctx.arc(drop.x, drop.y, drop.radius + drop.glowSize, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(255, 248, 111, ${drop.life * drop.intensity * 0.3})`
          ctx.fill()

          // Circulo principal
          ctx.beginPath()
          ctx.arc(drop.x, drop.y, drop.radius, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(255, 255, 0, ${drop.life * drop.intensity})`
          ctx.fill()

          // Nucleo blanco 
          ctx.beginPath()
          ctx.arc(drop.x, drop.y, drop.radius * 0.4, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(255, 255, 255, ${drop.life * drop.intensity * 0.8})`
          ctx.fill()

          // Movimiento hacia abajo
          drop.y += drop.fallSpeed
          drop.life -= drop.fadeSpeed

          if (drop.y > canvas.height + 50 || drop.life <= 0) {
            lightning.drops.splice(dropIndex, 1)
          }
        })

        // Remover rayos 
        if (lightning.drops.length === 0) {
          lightningDrops.splice(lightningIndex, 1)
        }
      })

      if (Math.random() < 0.08) { 
        createLightningRain()
      }

      requestAnimationFrame(draw)
    }

    createCloudParticles()
    draw()

    window.addEventListener("resize", () => {
      resizeCanvas()
      createCloudParticles() 
    })

    return () => {
      window.removeEventListener("resize", resizeCanvas)
    }
  }, [])

  return (
    <div style={{
      position: 'relative',
      minHeight: '100vh',
      width: '100%',
      overflow: 'visible',
      color: 'white',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem 0'
    }}>
      <canvas 
        ref={canvasRef} 
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: -1,
          pointerEvents: 'none'
        }}
      />
      
      <div style={{
        zIndex: 10,
        padding: '2rem',
        maxWidth: '1200px',
        textAlign: 'center',
        background: 'rgba(0, 0, 0, 0.4)',
        backdropFilter: 'blur(15px)',
        borderRadius: '20px',
        boxShadow: '0 8px 32px rgba(255, 248, 111, 0.3)',
        border: '1px solid rgba(255, 248, 111, 0.2)'
      }}>
        <h2 style={{
          fontSize: '2.5rem',
          marginBottom: '1rem',
          color: '#fff86f',
          textShadow: '0 0 8px rgba(255, 248, 111, 0.7)',
          fontWeight: 'bold'
        }}>
        🌩️💻✨ Habilidades Técnicas ✨💻🌩️
        </h2>
        
        <p style={{
          marginBottom: '3rem',
          fontSize: '1.2rem',
          color: '#e0e0e0',
          lineHeight: '1.6',
          maxWidth: '800px',
          margin: '0 auto 3rem auto'
        }}>
          Las habilidades técnicas que ofresco son amplias, pero no tanto comparado con mi entusiasmo por la tecnología. 
          Domino herramientas modernas como Python, React, PostgreSQL y más y así lo combino con mis infinitas
          ganas de aprender, una energía contagiosa y una actitud siempre positiva. 
          Estoy lista para mostrar soluciones frescas y motivar a cualquier 
          equipo de desarrollo con mi pasión desbordante por crear, crecer y transformar ideas en realidades digitales. 
        </p>

        {["Backend", "Frontend", "Herramientas"].map((category) => (
          <div key={category} style={{ marginBottom: '3rem' }}>
            <h3 style={{
              color: '#fff86f',
              fontSize: '1.8rem',
              marginBottom: '1.5rem',
              textShadow: '0 0 8px rgba(255, 248, 111, 0.7)'
            }}>
              {category}
            </h3>
            
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '1.5rem',
              justifyItems: 'center'
            }}>
              {skills
                .filter((skill) => skill.category === category)
                .map((skill) => (
                  <div key={skill.name} style={{
                    background: 'rgba(10, 10, 10, 0.8)',
                    border: '1px solid #00bcd4',
                    borderRadius: '12px',
                    padding: '1.5rem',
                    width: '100%',
                    maxWidth: '300px',
                    boxShadow: '0 0 15px rgba(0, 255, 255, 0.2)',
                    transition: 'all 0.3s ease',
                    cursor: 'pointer'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.transform = 'scale(1.05)'
                    e.target.style.boxShadow = '0 0 25px rgba(0, 255, 255, 0.4)'
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = 'scale(1)'
                    e.target.style.boxShadow = '0 0 15px rgba(0, 255, 255, 0.2)'
                  }}>
                    <div style={{
                      marginBottom: '0.5rem',
                      display: 'flex',
                      justifyContent: 'center'
                    }}>
                      <img 
                        src={skill.icon} 
                        alt={skill.name} 
                        style={{
                          width: '40px',
                          height: '40px',
                          objectFit: 'contain'
                        }}
                      />
                    </div>
                    <div style={{
                      fontSize: '1.1rem',
                      fontWeight: 'bold',
                      marginBottom: '1rem',
                      color: '#fff'
                    }}>
                      {skill.name}
                    </div>
                    <div style={{
                      background: '#263238',
                      borderRadius: '10px',
                      height: '12px',
                      overflow: 'hidden',
                      position: 'relative'
                    }}>
                      <div style={{
                        background: 'linear-gradient(to right, #00e5ff, #00bcd4)',
                        height: '100%',
                        width: `${skill.value}%`,
                        transition: 'width 2s ease-out',
                        borderRadius: '10px',
                        boxShadow: '0 0 10px rgba(0, 229, 255, 0.5)'
                      }}></div>
                    </div>
                    <div style={{
                      marginTop: '0.5rem',
                      fontSize: '0.9rem',
                      color: '#00e5ff',
                      fontWeight: 'bold'
                    }}>
                      {skill.value}%
                    </div>
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Skills